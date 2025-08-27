import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BoardModule } from './board/board.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { CartModule } from './cart/cart.module';
import { PromotionModule } from './promotion/promotion.module';
import { OrderModule } from './order/order.module';
import { OrderMenuModule } from './order-menu/order-menu.module';
import { CartMenuModule } from './cart-menu/cart-menu.module';
import { AuthModule } from './auth/auth.module';
import { UserDbModule } from './user-db/user-db.module';
import { OwnerDbModule } from './owner-db/owner-db.module';
import { StoreModule } from './store/store.module';

// 명령어
// $ npx @nestjs/cli g resource [패키지 이름]

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.development.env'],
    }),
    UserDbModule, // User App 에서 사용되는 데이터 베이스
    OwnerDbModule, // Owner App 에서 사용되는 데이터 베이스
    UserModule,
    BoardModule,
    CartModule,
    PromotionModule,
    OrderModule,

    OrderMenuModule,
    CartMenuModule,
    AuthModule,
    UserDbModule,
    OwnerDbModule,
    StoreModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
