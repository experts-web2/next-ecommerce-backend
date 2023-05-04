import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


@Schema({ timestamps: true })
export class Variant extends Document {
  @Prop({ type: String, required: true })
  product_id: string;

  @Prop({ type: String, required: true })
  product_color_id: string;

  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: [String], required: true })
  option: string[];

  @Prop({ type: String, required: true })
  sku: string;

  @Prop({ type: Boolean, required: true })
  require_shipping: boolean;

  @Prop({ type: Boolean, required: true })
  taxable: boolean;

  @Prop({ type: Boolean, required: true })
  available: boolean;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  public_title: string;

  @Prop({ type: Number, required: true })
  price: number;

  @Prop({ type: Number, required: true })
  weight: number;

  @Prop({ type: String, required: true })
  barcode: string;

  @Prop({ type: Number, required: true })
  quantity: number;
}

export const VariantSchema = SchemaFactory.createForClass(Variant);
