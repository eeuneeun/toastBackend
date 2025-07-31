import { Module } from '@nestjs/common';
import { CartMenuService } from './cart-menu.service';
import { CartMenuController } from './cart-menu.controller';

@Module({
  controllers: [CartMenuController],
  providers: [CartMenuService],
})
export class CartMenuModule {}
