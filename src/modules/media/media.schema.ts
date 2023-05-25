import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';

export type MediaDocument = Media & Document;

@Schema({ timestamps: true })
export class Media {
  @Prop({ type: SchemaTypes.ObjectId, required: true })
  product_id: string;

  @Prop({ type: SchemaTypes.ObjectId, required: true })
  variant_id: string;

  @Prop({ type: Boolean, default: false })
  feature: boolean;

  @Prop({ type: Number })
  position: number;

  @Prop({ type: String })
  alt: string;

  @Prop({ type: Array })
  images: string[];
}

export const MediaSchema = SchemaFactory.createForClass(Media);
