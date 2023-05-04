import { Test, TestingModule } from '@nestjs/testing';
import { ProductcolorService } from './productcolor.service';

describe('ProductcolorService', () => {
  let service: ProductcolorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductcolorService],
    }).compile();

    service = module.get<ProductcolorService>(ProductcolorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
