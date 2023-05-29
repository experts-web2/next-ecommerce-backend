import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from '../../../dto/product/product.dto';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  async getAllProducts(): Promise<CreateProductDto> {
    return this.productService.getAllProducts();
  }

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

  @Get('item/:id')
  async productDetails(@Param('id') id: string): Promise<CreateProductDto> {
    return this.productService.productDetails(id);
  }

  @Get('brands')
  async getAllBrands(): Promise<any> {
    console.log('brand');
    return this.productService.getAllBrands();
  }
}
