import { Controller, Get, Post, Delete, Body, Param, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from '../../../dto/product/product.dto';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  async getAllProducts(): Promise<CreateProductDto> {
    return this.productService.getAllProducts();
  }

  @Get('price')
  async getAllProductsPrice(): Promise<CreateProductDto> {
    return this.productService.getAllProductsPrice();
  }

  @Get('/filters')
  async getAllProductsByFilter(
    @Query('field') field: string,
    @Query('value') value: string,
  ): Promise<CreateProductDto> {
    let matchCondition: any = {};
    console.log("getAllProductsByType===>",field,value)
    
    switch (field) {
      case 'category':
        matchCondition = {
          type: value,
        };
        break;
      case 'brand':
        matchCondition = {
          brand: value,
        };
        break;
      case 'price':
        const priceValue = parseInt(value, 10);
        matchCondition = {
          price: { $lte: priceValue },
        };
        break;
      default:
        throw new Error('Invalid field');
    }
  
    return this.productService.filterProductsByType(matchCondition);
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
    return this.productService.getAllBrands();
  }
}
