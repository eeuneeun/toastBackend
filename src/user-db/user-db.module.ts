import { Module } from '@nestjs/common';
import { UserDbService } from './user-db.service';
import { UserDbController } from './user-db.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Board } from 'src/board/entities/board.entity';
import { Order } from 'src/order/entities/order.entity';
import { Menu } from 'src/menu/entities/menu.entity';
import { CartMenu } from 'src/cart-menu/entities/cart-menu.entity';
import { Cart } from 'src/cart/entities/cart.entity';
import { OrderMenu } from 'src/order-menu/entities/order-menu.entity';
import { UserDb } from './entities/user-db.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      name: 'userDBConnection',
      type: 'mariadb',
      host: 'toastapp.cpowqiy80fmc.ap-northeast-2.rds.amazonaws.com',
      port: 3306,
      username: 'euneun',
      password: 'qwer1234',
      database: 'user',
      entities: [User, Board, Order, OrderMenu, Cart, CartMenu, Menu],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([UserDb], 'userDBConnection'),
  ],
  controllers: [UserDbController],
  providers: [UserDbService],
})
export class UserDbModule {}
