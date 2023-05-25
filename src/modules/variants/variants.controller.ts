import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { VariantsService } from './variants.service';

@Controller('variants')
export class VariantsController {
  constructor(private readonly variantService: VariantsService) {}

  @Post()
  async create(@Body() createVariantDto: any) {
    return this.variantService.create(createVariantDto);
  }

  @Get()
  async findAll() {
    return this.variantService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.variantService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateVariantDto: any) {
    return this.variantService.update(id, updateVariantDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.variantService.remove(id);
  }
}
