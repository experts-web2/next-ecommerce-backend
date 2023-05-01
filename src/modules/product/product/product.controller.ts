import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from '../../../dto/product/product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getAllProducts(): Promise<CreateProductDto> {
    return this.productService.getAllProducts();
  }

  @Get(':id')
  async getProductById(@Param('id') id: string): Promise<CreateProductDto> {
    return this.productService.getProductById(id);
  }

  @Post()
  async addProduct(@Body() product: any): Promise<CreateProductDto> {
    return this.productService.addProduct(product);
  }

  @Put(':id')
  async updateProduct(
    @Param('id') id: string,
    @Body() product: any,
  ): Promise<any> {
    return this.productService.updateProduct(id, product);
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: string): Promise<CreateProductDto> {
    return this.productService.deleteProduct(id);
  }
}
