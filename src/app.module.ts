import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BoardModule } from './board/board.module';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

// 명령어
// $ npx @nestjs/cli g resource [패키지 이름]

@Module({
  imports: [
    BoardModule,
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
      entities: [User],
      synchronize: true,
    }),
    UserModule,
    ConfigModule,
    TypeOrmModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
