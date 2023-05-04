import { Test, TestingModule } from '@nestjs/testing';
import { ProductcolorController } from './productcolor.controller';

describe('ProductcolorController', () => {
  let controller: ProductcolorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductcolorController],
    }).compile();

    controller = module.get<ProductcolorController>(ProductcolorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
