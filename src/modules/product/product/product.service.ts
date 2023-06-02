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

  async getAllProductsPrice(): Promise<any> {
    return this.productModel
      .aggregate([
        {
          $match: {
            $or: [
              { price: { $mod: [1000, 0] } },
              { price: { $mod: [2000, 0] } },
              { price: { $mod: [5000, 0] } },
            ],
          },
        },
      ])
      .exec();
  }

  async filterProductsByType(matchCondition: any): Promise<any> {
    const pipeline = [
      { $match: matchCondition },
      {
        $lookup: {
          from: 'media',
          localField: '_id',
          foreignField: 'product_id',
          as: 'media',
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
    ];
    const products = await this.productModel.aggregate(pipeline).exec();

    const sizesSet = new Set<string>();
    products.forEach((product: any) => {
      product.variants.forEach((variant: any) => {
        sizesSet.add(variant.size);
      });
    });
    const sizes = [...sizesSet];
    const brands = [...new Set(products.map((product: any) => product.brand))];
    const types = [...new Set(products.map((product: any) => product.type))];

    return {
      products,
      filters: {
        sizes,
        brands,
        types,
      },
    };
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

  async getAllBrands(): Promise<any> {
    return this.productModel.distinct('brand').exec();
  }

  async getAllColors(): Promise<any> {
    return this.productColorModel.distinct('color').exec();
  }

  async getAllSizes(): Promise<any> {
    return this.variantModel.distinct('size').exec();
  }
}
