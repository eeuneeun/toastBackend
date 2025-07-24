import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BoardModule } from './board/board.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  /* `User` is an entity class representing a user in the application. It is used in the TypeORM
configuration to define the structure of the `User` table in the MySQL database. The
`entities` property in the TypeORM configuration specifies an array of entity classes that
will be used to create database tables and perform database operations related to those
entities. In this case, the `User` entity class is included in the array to define the
schema for the `User` table in the `board` database. */
  User,
} from './user/entities/user.entity';
import { Board } from './board/entities/board.entity';

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
      entities: [User, Board],
      synchronize: true,
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
