import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Color, ProductColor } from './productcolor.schema';
import { ProductColorDto } from "../../dto/product/productcolor.dto";

@Controller('productcolor')
export class ProductcolorController {
    constructor(@InjectModel(Color.name) private productColorModel: Model<Color>) {}

    @Get()
    async findAll(): Promise<ProductColor[]> {
      return this.productColorModel.find().exec();
    }
  
    @Get(':id')
    async findById(@Param('id') id: string): Promise<ProductColor> {
      return this.productColorModel.findById(id).exec();
    }
  
    @Post()
    async create(@Body() createProductColorDto: ProductColorDto): Promise<ProductColor> {
      const createdProductColor = new this.productColorModel(createProductColorDto);
      return createdProductColor.save();
    }
  
    @Put(':id')
    async update(
      @Param('id') id: string,
      @Body() updateProductColorDto: ProductColorDto
    ): Promise<ProductColor> {
      return this.productColorModel.findByIdAndUpdate(id, updateProductColorDto, { new: true }).exec();
    }
  
    @Delete(':id')
    async delete(@Param('id') id: string): Promise<any> {
      return this.productColorModel.findByIdAndRemove(id).exec();
    }
}
