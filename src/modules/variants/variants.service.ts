import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Variant } from './variants.schema';

@Injectable()
export class VariantsService {
  constructor(
    @InjectModel(Variant.name) private variantModel: Model<Variant>,
  ) {}
  async create(createVariantDto: any): Promise<Variant> {
    const createdVariant = new this.variantModel(createVariantDto);
    return createdVariant.save();
  }

  async findAll(): Promise<any> {
    return this.variantModel.find().exec();
  }

  async findOne(id: string): Promise<any> {
    return this.variantModel.findById(id).exec();
  }

  async update(id: string, updateVariantDto: any): Promise<any> {
    return this.variantModel
      .findByIdAndUpdate(id, updateVariantDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<any> {
    return this.variantModel.findByIdAndDelete(id).exec();
  }
}
