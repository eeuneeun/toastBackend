import { Test, TestingModule } from '@nestjs/testing';
import { CartMenuService } from './cart-menu.service';

describe('CartMenuService', () => {
  let service: CartMenuService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CartMenuService],
    }).compile();

    service = module.get<CartMenuService>(CartMenuService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
