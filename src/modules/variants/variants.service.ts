import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Variant } from './variants.schema';
import { CreateVariantDto } from '../../dto/product/variants.dto';


@Injectable()
export class VariantsService {
    constructor(@InjectModel(Variant.name) private variantModel: Model<Variant>) {}
    async create(createVariantDto: CreateVariantDto): Promise<Variant> {
        const createdVariant = new this.variantModel(createVariantDto);
        return createdVariant.save();
      }
    
      async findAll(): Promise<Variant[]> {
        return this.variantModel.find().exec();
      }
    
      async findOne(id: string): Promise<Variant> {
        return this.variantModel.findById(id).exec();
      }
    
      async update(id: string, updateVariantDto: any): Promise<Variant> {
        return this.variantModel.findByIdAndUpdate(id, updateVariantDto, { new: true }).exec();
      }
    
      async remove(id: string): Promise<Variant> {
        return this.variantModel.findByIdAndDelete(id).exec();
      }
}
