import { forwardRef, Module } from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuController } from './menu.controller';
import { Menu } from './entities/menu.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartModule } from 'src/cart/cart.module';
import { Cart } from 'src/cart/entities/cart.entity';
import { CartMenu } from 'src/cart-menu/entities/cart-menu.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cart, CartMenu, Menu], 'userDBConnection'),
    forwardRef(() => CartModule),
  ],
  controllers: [MenuController],
  providers: [MenuService],
})
export class MenuModule {}
