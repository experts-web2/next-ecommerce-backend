import { Module } from '@nestjs/common';
import { MediaController } from './media.controller';
import { MediaService } from './media.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Media, MediaSchema } from './media.schema';

@Module({
  controllers: [MediaController],
  providers: [MediaService],
  imports: [
    MongooseModule.forFeature([{ name: Media.name, schema: MediaSchema }]),
  ],
})
export class MediaModule {}
