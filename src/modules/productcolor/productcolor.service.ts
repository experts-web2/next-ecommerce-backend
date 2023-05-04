import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Color } from './productcolor.schema';
import { ProductColorDto } from '../../dto/product/productcolor.dto';

@Injectable()
export class ProductcolorService {
  constructor(
    @InjectModel(Color.name)
    private productColorModel: Model<Color>,
  ) {}

  async findAll(): Promise<ProductColorDto[]> {
    return this.productColorModel.find().exec();
  }

  async findById(id: string): Promise<ProductColorDto> {
    return this.productColorModel.findById(id).exec();
  }

  async create(createProductColorDto: ProductColorDto): Promise<ProductColorDto> {
    const createdProductColor = new this.productColorModel(
      createProductColorDto,
    );
    return createdProductColor.save();
  }

  async update(
    id: string,
    updateProductColorDto: ProductColorDto,
  ): Promise<ProductColorDto> {
    return this.productColorModel
      .findByIdAndUpdate(id, updateProductColorDto, { new: true })
      .exec();
  }

  async delete(id: string): Promise<any> {
    return this.productColorModel.findByIdAndRemove(id).exec();
  }
}
