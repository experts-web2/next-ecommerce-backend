import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {

  @Prop({ type: SchemaTypes.ObjectId, auto: true })
  _id: string;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  // @Prop({ default: 'user' })
  // role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
