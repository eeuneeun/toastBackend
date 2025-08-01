import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BoardModule } from './board/board.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { Board } from './board/entities/board.entity';
import { CartModule } from './cart/cart.module';
import { PromotionModule } from './promotion/promotion.module';
import { OrderModule } from './order/order.module';
import { MenuModule } from './menu/menu.module';
import { OrderMenuModule } from './order-menu/order-menu.module';
import { Order } from './order/entities/order.entity';
import { Menu } from './menu/entities/menu.entity';
import { OrderMenu } from './order-menu/entities/order-menu.entity';
import { CartMenuModule } from './cart-menu/cart-menu.module';
import { Cart } from './cart/entities/cart.entity';
import { CartMenu } from './cart-menu/entities/cart-menu.entity';
import { AuthModule } from './auth/auth.module';

// 명령어
// $ npx @nestjs/cli g resource [패키지 이름]

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.development.env'],
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: 3306,
      username: 'root',
      password: '1234',
      database: 'board',
      entities: [User, Board, Order, OrderMenu, Cart, CartMenu, Menu],
      synchronize: true,
    }),
    UserModule,
    BoardModule,
    CartModule,
    PromotionModule,
    OrderModule,
    MenuModule,
    OrderMenuModule,
    CartMenuModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
