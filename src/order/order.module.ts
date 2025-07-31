import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { OrderMenu } from 'src/order-menu/entities/order-menu.entity';
import { Menu } from 'src/menu/entities/menu.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderMenu, Menu])],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
