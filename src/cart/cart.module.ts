import { forwardRef, Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Menu } from 'src/menu/entities/menu.entity';
import { Cart } from './entities/cart.entity';
import { CartMenu } from 'src/cart-menu/entities/cart-menu.entity';
import { MenuModule } from 'src/menu/menu.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CartMenu, Cart, Menu], 'userDBConnection'),
    forwardRef(() => MenuModule),
  ],

  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
