import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Media, MediaDocument } from './media.schema';
import { MediaDto } from '../../dto/product/media.dto';

@Injectable()
export class MediaService {
    constructor(
        @InjectModel(Media.name) private mediaModel: Model<MediaDocument>,
      ) {}

      async create(createMediaDto: MediaDto): Promise<Media> {
        const createdMedia = new this.mediaModel(createMediaDto);
        return createdMedia.save();
      }
    
      async findAll(): Promise<Media[]> {
        return this.mediaModel.find().exec();
      }
}
