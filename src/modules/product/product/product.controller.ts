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
  constructor(private productService: ProductService) {}

  @Get()
  async getAllProducts(): Promise<CreateProductDto> {
    return this.productService.getAllProducts();
  }

  // make a route to find the data accourding to the type of product either it is mens or woemns or kids

  @Get('type/:type')
  async getAllProductsByType(
    @Param('type') type: string,
  ): Promise<CreateProductDto> {
    return this.productService.filterProductsByType(type);
  }

  @Get('category/:category')
  async getAllProductsByCategory(
    @Param('category') category: string,
  ): Promise<CreateProductDto> {
    return this.productService.filterProductsByPrice(category);
  }

  @Get('price/:price')
  async filterProductsPrice(
    @Param('price') price: any,
  ): Promise<CreateProductDto> {
    return this.productService.filterProductsByPrice(price);
  }

  @Post()
  async addProduct(@Body() product: any): Promise<CreateProductDto> {
    return this.productService.addProduct(product);
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: string): Promise<CreateProductDto> {
    return this.productService.deleteProduct(id);
  }

  @Get(':id')
  async productDetails(@Param('id') id: string): Promise<CreateProductDto> {
    console.log('id', id);
    return this.productService.productDetails(id);
  }
}

// @Put(':id')
// async updateProduct(
//   @Param('id') id: string,
//   @Body() product: any,
// ): Promise<any> {
//   return this.productService.updateProduct(id, product);
// }

// @Get(':id')
// async getProductById(@Param('id') id: string): Promise<CreateProductDto> {
//   return this.productService.getProductById(id);
// }
