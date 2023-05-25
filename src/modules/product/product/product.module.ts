import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './product.schema';
import { Color, ProductColorSchema } from '../../productcolor/productcolor.schema';
import { Variant, VariantSchema } from '../../variants/variants.schema';
import { Media, MediaSchema } from 'src/modules/media/media.schema';
@Module({
  controllers: [ProductController],
  providers: [ProductService],
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    MongooseModule.forFeature([{ name: Color.name, schema: ProductColorSchema }]),
    MongooseModule.forFeature([{ name: Variant.name, schema: VariantSchema }]),
    MongooseModule.forFeature([{ name: Media.name, schema: MediaSchema }]),

  ],
})
export class ProductModule {}
