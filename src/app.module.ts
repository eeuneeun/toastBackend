import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BoardModule } from './board/board.module';
import { UserModule } from './user/user.module';
import { ToastModule } from './toast/toast.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { Board } from './board/entities/board.entity';
import { Toast } from './toast/entities/toast.entity';
import { CartModule } from './cart/cart.module';
import { PromotionModule } from './promotion/promotion.module';
import { OrderModule } from './order/order.module';

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
      entities: [User, Board, Toast],
      synchronize: true,
    }),
    UserModule,
    BoardModule,
    ToastModule,
    CartModule,
    PromotionModule,
    OrderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
