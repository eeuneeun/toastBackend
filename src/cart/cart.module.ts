import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Menu } from 'src/owner-db/entities/Menu';
import { Cart } from './entities/cart.entity';
import { CartMenu } from 'src/cart-menu/entities/cart-menu.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CartMenu, Cart, Menu], 'userDBConnection'),
    TypeOrmModule.forFeature([Menu], 'ownerDBConnection'),
  ],

  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
