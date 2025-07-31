import { Test, TestingModule } from '@nestjs/testing';
import { CartMenuController } from './cart-menu.controller';
import { CartMenuService } from './cart-menu.service';

describe('CartMenuController', () => {
  let controller: CartMenuController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CartMenuController],
      providers: [CartMenuService],
    }).compile();

    controller = module.get<CartMenuController>(CartMenuController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
