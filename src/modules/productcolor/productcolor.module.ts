import { Module } from '@nestjs/common';
import { ProductcolorController } from './productcolor.controller';
import { ProductcolorService } from './productcolor.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Color, ProductColorSchema } from './productcolor.schema';

@Module({
  controllers: [ProductcolorController],
  providers: [ProductcolorService],
  imports: [
    MongooseModule.forFeature([{ name: Color.name, schema: ProductColorSchema }]),
  ],
})
export class ProductcolorModule {}
