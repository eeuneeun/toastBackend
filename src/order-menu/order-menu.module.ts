import { Module } from '@nestjs/common';
import { OrderMenuService } from './order-menu.service';
import { OrderMenuController } from './order-menu.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderMenu } from './entities/order-menu.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrderMenu])],
  controllers: [OrderMenuController],
  providers: [OrderMenuService],
})
export class OrderMenuModule {}
