import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OwnerMenu } from 'src/user-db/entities/OwnerMenu';
import { Cart } from './entities/cart.entity';
import { CartMenu } from 'src/cart-menu/entities/cart-menu.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CartMenu, Cart, OwnerMenu], 'userDBConnection'),
  ],

  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
