import { Module } from '@nestjs/common';
import { VariantsController } from './variants.controller';
import { VariantsService } from './variants.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Variant, VariantSchema } from './variants.schema';

@Module({
  controllers: [VariantsController],
  providers: [VariantsService],
  imports: [
    MongooseModule.forFeature([{ name: Variant.name, schema: VariantSchema }]),
  ],
})
export class VariantsModule {}
