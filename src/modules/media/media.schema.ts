import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MediaDocument = Media & Document;

@Schema({ timestamps: true })
export class Media {
  @Prop({ type: String, required: true })
  product_id: string;

  @Prop({ type: String })
  variant_id: string;

  @Prop({ type: Boolean, default: false })
  feature: boolean;

  @Prop({ type: Number })
  position: number;

  @Prop({ type: String })
  alt: string;
}

export const MediaSchema = SchemaFactory.createForClass(Media);
