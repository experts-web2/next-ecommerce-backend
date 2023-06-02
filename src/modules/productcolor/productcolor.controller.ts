import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Color, ProductColor } from './productcolor.schema';

@Controller('productcolor')
export class ProductcolorController {
    constructor(@InjectModel(Color.name) private productColorModel: Model<Color>) {}

    @Get()
    async findAll(): Promise<any[]> {
      return this.productColorModel.find().exec();
    }
  
    @Get(':id')
    async findById(@Param('id') id: string): Promise<any> {
      return this.productColorModel.findById(id).exec();
    }
  
    @Post()
    async create(@Body() createProductColorDto: any): Promise<any> {
      const createdProductColor = new this.productColorModel(createProductColorDto);
      return createdProductColor.save();
    }
  
    @Put(':id')
    async update(
      @Param('id') id: string,
      @Body() updateProductColorDto: any
    ): Promise<ProductColor> {
      return this.productColorModel.findByIdAndUpdate(id, updateProductColorDto, { new: true }).exec();
    }
  
    @Delete(':id')
    async delete(@Param('id') id: string): Promise<any> {
      return this.productColorModel.findByIdAndRemove(id).exec();
    }
}
