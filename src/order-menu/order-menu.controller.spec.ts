import { Test, TestingModule } from '@nestjs/testing';
import { OrderMenuController } from './order-menu.controller';
import { OrderMenuService } from './order-menu.service';

describe('OrderMenuController', () => {
  let controller: OrderMenuController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderMenuController],
      providers: [OrderMenuService],
    }).compile();

    controller = module.get<OrderMenuController>(OrderMenuController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
