import { Types } from 'mongoose';

export class ProductColorDto {
  product_id: Types.ObjectId;
  color_code: string;
  color_name: string;
  available: boolean;
}
  