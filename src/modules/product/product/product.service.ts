import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductDocument } from './product.schema';
import {CreateProductDto} from '../../../dto/product/product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel('Product')
    private readonly productModel: Model<ProductDocument>,
  ) {}
  async getAllProducts(): Promise<any> {
    return this.productModel.find().exec();
  }

  async getProductById(id: string): Promise<CreateProductDto> {
    return this.productModel.findById(id).exec();
  }

  async addProduct(product: any): Promise<any> {
    const newProduct = new this.productModel(product);
    return newProduct.save();
  }

  async updateProduct(id: string, product: any): Promise<any> {
    const updatedProduct = await this.productModel.findById(id).exec();
    if (product.name) {
      updatedProduct.name = product.name;
    }
    if (product.description) {
      updatedProduct.description = product.description;
    }
    if (product.price) {
      updatedProduct.price = product.price;
    }
    if (product.category) {
      updatedProduct.category = product.category;
    }
    if (product.image) {
      updatedProduct.image = product.image;
    }
    updatedProduct.updated_at = new Date();
    return updatedProduct.save();
  }


  async deleteProduct(id: string): Promise<any> {
    const deletedProduct = await this.productModel.findByIdAndRemove(id).exec();
    return deletedProduct;
  }
}
