import { Module } from '@nestjs/common';
import { OwnerDbService } from './owner-db.service';
import { OwnerDbController } from './owner-db.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Menu } from './entities/Menu';
import { MenuGroup } from './entities/MenuGroup';
import { Store } from './entities/Store';
import { User } from './entities/User';
import { Group } from './entities/Group';
import { Option } from './entities/Option';
import { OwnerDb } from './entities/owner-db.entity';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      name: 'ownerDBConnection',
      type: 'mariadb',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '1234',
      database: 'merchant',
      entities: [Group, Menu, MenuGroup, Option, Store, User],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([OwnerDb], 'ownerDBConnection'),
  ],
  controllers: [OwnerDbController],
  providers: [OwnerDbService],
})
export class OwnerDbModule {}

// typeorm-model-generator -h toastapp.cpowqiy80fmc.ap-northeast-2.rds.amazonaws.com -d owner -u euneun -x qwer1234 -e mariadb -o ./src/entities
