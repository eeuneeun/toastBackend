import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { OrderMenu } from 'src/order-menu/entities/order-menu.entity';
import { OwnerMenu } from 'src/user-db/entities/OwnerMenu';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, OrderMenu], 'userDBConnection'),
    TypeOrmModule.forFeature([OwnerMenu], 'userDBConnection'),
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
