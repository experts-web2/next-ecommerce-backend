import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema({ timestamps: true })
export class Product {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  handle: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  vendor: string;

  @Prop({ required: true })
  type: string;

  @Prop({ type: [String], required: true })
  tags: string[];

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  price_min: number;

  @Prop({ required: true })
  available: boolean;

  @Prop({ required: true })
  price_varies: boolean;

  @Prop({ required: true })
  brand: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
