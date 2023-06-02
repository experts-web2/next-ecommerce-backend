import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';

export type ProductColor = Color & Document;

@Schema({ timestamps: true })
export class Color {
  @Prop({ type: SchemaTypes.ObjectId, required: true })
  product_id: string;

  @Prop({ type: String, required: true })
  color_code: string;

  @Prop({ type: String, required: true })
  color_name: string;

  @Prop({ type: Boolean, required: true })
  available: boolean;
}

export const ProductColorSchema = SchemaFactory.createForClass(Color);
