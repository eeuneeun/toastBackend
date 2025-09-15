import { forwardRef, Module } from '@nestjs/common';
import { CartMenuService } from './cart-menu.service';
import { CartMenuController } from './cart-menu.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartMenu } from './entities/cart-menu.entity';
import { Cart } from '../cart/entities/cart.entity';
import { OwnerMenu } from 'src/user-db/entities/OwnerMenu';
import { CartModule } from 'src/cart/cart.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CartMenu, Cart, OwnerMenu], 'userDBConnection'),
    forwardRef(() => CartModule),
  ],
  controllers: [CartMenuController],
  providers: [CartMenuService],
})
export class CartMenuModule {}
