import { Types } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductDocument } from './product.schema';
import { Color } from '../../productcolor/productcolor.schema';
import { Variant } from '../../variants/variants.schema';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel('Product')
    private readonly productModel: Model<ProductDocument>,
    @InjectModel(Color.name)
    private productColorModel: Model<Color>,
    @InjectModel(Variant.name)
    private variantModel: Model<Variant>,
  ) {}

  // get all products
  async getAllProducts(): Promise<any> {
    return this.productModel
      .aggregate([
        {
          $lookup: {
            from: 'media',
            localField: '_id',
            foreignField: 'product_id',
            as: 'media',
          },
        },
      ])
      .exec();
  }

  async filterProductsByType(type: string): Promise<any> {
    let matchCondition = {};
    if (type == 'all-under-rs-1000') {
      matchCondition = {
        price: { $lte: 1000 },
      };
    }
    if (type == 'all-under-rs-2000') {
      matchCondition = {
        price: { $lte: 2000, $gte: 1000 },
      };
    }
    if (type == 'Kids' || type == 'Mens' || type == 'Womens') {
      matchCondition = {
        type: type,
      };
    }
    return await this.productModel
      .aggregate([
        { $match: matchCondition },
        {
          $lookup: {
            from: 'media',
            localField: '_id',
            foreignField: 'product_id',
            as: 'media',
          },
        },
      ])
      .exec();
  }

  async addProduct(product: any): Promise<any> {
    const newProduct = new this.productModel(product);
    return newProduct.save();
  }

  async getAllProductsByCategory(category: string): Promise<any> {
    return this.productModel.find({ category: category }).exec();
  }

  async deleteProduct(id: string): Promise<any> {
    const deletedProduct = await this.productModel.findByIdAndRemove(id).exec();
    return deletedProduct;
  }

  async filterProductsByPrice(price_range: any): Promise<any> {
    const { maxPrice, minPrice } = price_range;
    return this.productModel
      .aggregate([
        { $match: { price: { $gte: minPrice, $lte: maxPrice } } },
        {
          $lookup: {
            from: 'media',
            localField: '_id',
            foreignField: 'product_id',
            as: 'media',
          },
        },
      ])

      .exec();
  }

  async productDetails(id: string): Promise<any> {
    try {
      const productId = new Types.ObjectId(id);
      const product = await this.productModel
        .aggregate([
          { $match: { _id: productId } },
          {
            $lookup: {
              from: 'colors',
              localField: '_id',
              foreignField: 'product_id',
              as: 'colors',
            },
          },
          {
            $lookup: {
              from: 'variants',
              localField: '_id',
              foreignField: 'product_id',
              as: 'variants',
            },
          },
          {
            $lookup: {
              from: 'media',
              localField: '_id',
              foreignField: 'product_id',
              as: 'media',
            },
          },
        ])
        .exec();
      console.log(product);
      return product;
    } catch (error) {
      console.error('Error fetching product details:', error);
      throw new Error('Internal server error');
    }
  }
}

// async updateProduct(id: string, product: any): Promise<any> {
//   const updatedProduct = await this.productModel.findById(id).exec();
//   if (product.name) {
//     updatedProduct.name = product.name;
//   }
//   if (product.description) {
//     updatedProduct.description = product.description;
//   }
//   if (product.price) {
//     updatedProduct.price = product.price;
//   }
//   if (product.category) {
//     updatedProduct.category = product.category;
//   }
//   // if (product.image) {
//   //   updatedProduct.image = product.image;
//   // }
//   updatedProduct.updated_at = new Date();
//   return updatedProduct.save();
// }
// async getProductById(id: ): Promise<CreateProductDto> {
//   return this.productModel.findById(id).exec();
// }
