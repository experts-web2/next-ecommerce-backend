import { Controller, Get, Post, Body } from '@nestjs/common';
import { MediaService } from './media.service';
import { MediaDto } from '../../dto/product/media.dto';

@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}
  @Post()
  async create(@Body() createMediaDto: MediaDto) {
    return await this.mediaService.create(createMediaDto);
  }

  @Get()
  async findAll() {
    return await this.mediaService.findAll();
  }
}
