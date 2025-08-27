import { Module } from '@nestjs/common';
import { UserDbService } from './user-db.service';
import { UserDbController } from './user-db.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Board } from 'src/board/entities/board.entity';
import { Order } from 'src/order/entities/order.entity';
import { CartMenu } from 'src/cart-menu/entities/cart-menu.entity';
import { Cart } from 'src/cart/entities/cart.entity';
import { OrderMenu } from 'src/order-menu/entities/order-menu.entity';
import { UserDb } from './entities/user-db.entity';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      name: 'userDBConnection',
      type: 'mariadb',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '1234',
      database: 'user',
      entities: [User, Board, Order, OrderMenu, Cart, CartMenu],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([UserDb], 'userDBConnection'),
  ],
  controllers: [UserDbController],
  providers: [UserDbService],
})
export class UserDbModule {}
