import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';

export type OrderDocument = Order & Document;

@Schema({ timestamps: true })
export class Order {
  @Prop({ type: SchemaTypes.ObjectId, required: true })
  user_id: string;

  @Prop([
    {
      product_id: { type: SchemaTypes.ObjectId, required: true },
      quantity: { type: Number, required: true },
      total_price: { type: Number, required: true },
    },
  ])
  products: {
    product_id: string;
    quantity: number;
    total_price: number;
  }[];

  @Prop({ default: Date.now })
  created_at: Date;

  @Prop({ default: Date.now })
  updated_at: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
