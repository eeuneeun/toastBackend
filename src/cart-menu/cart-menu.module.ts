import { forwardRef, Module } from '@nestjs/common';
import { CartMenuService } from './cart-menu.service';
import { CartMenuController } from './cart-menu.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartMenu } from './entities/cart-menu.entity';
import { Cart } from '../cart/entities/cart.entity';
import { Menu } from 'src/owner-db/entities/Menu';
import { CartModule } from 'src/cart/cart.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CartMenu, Cart], 'userDBConnection'),
    TypeOrmModule.forFeature([Menu], 'ownerDBConnection'),
    forwardRef(() => CartModule),
  ],
  controllers: [CartMenuController],
  providers: [CartMenuService],
})
export class CartMenuModule {}
