import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Color } from './productcolor.schema';

@Injectable()
export class ProductcolorService {
  constructor(
    @InjectModel(Color.name)
    private productColorModel: Model<Color>,
  ) {}

  async findAll(): Promise<any[]> {
    return this.productColorModel.find().exec();
  }

  async findById(id: string): Promise<any> {
    return this.productColorModel.findById(id).exec();
  }

  async create(createProductColorDto: any): Promise<any> {
    const createdProductColor = new this.productColorModel(
      createProductColorDto,
    );
    return createdProductColor.save();
  }

  async update(
    id: string,
    updateProductColorDto: any,
  ): Promise<any> {
    return this.productColorModel
      .findByIdAndUpdate(id, updateProductColorDto, { new: true })
      .exec();
  }

  async delete(id: string): Promise<any> {
    return this.productColorModel.findByIdAndRemove(id).exec();
  }
}
