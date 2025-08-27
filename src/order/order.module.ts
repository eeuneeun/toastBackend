import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { OrderMenu } from 'src/order-menu/entities/order-menu.entity';
import { Menu } from 'src/owner-db/entities/Menu';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, OrderMenu], 'userDBConnection'),
    TypeOrmModule.forFeature([Menu], 'ownerDBConnection'),
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
