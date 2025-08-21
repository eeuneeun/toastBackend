import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Menu } from './entities/Menu';
import { MenuGroup } from './entities/MenuGroup';
import { Option } from './entities/Option';
import { Store } from './entities/Store';
import { User } from './entities/User';
import { MerchantDbController } from './merchant-db.controller';
import { MerchantDbService } from './merchant-db.service';
import { MerchantDb } from './entities/merchant-db.entity';
import { Group } from './entities/Group';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      name: 'merchantDBConnection',
      type: 'mariadb',
      host: 'toastapp.cpowqiy80fmc.ap-northeast-2.rds.amazonaws.com',
      port: 3306,
      username: 'euneun',
      password: 'qwer1234',
      database: 'merchant',
      entities: [Group, Menu, MenuGroup, Option, Store, User],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([MerchantDb], 'ownerDBConnection'),
  ],
  controllers: [MerchantDbController],
  providers: [MerchantDbService],
})
export class MerchantDbModule {}

// typeorm-model-generator -h toastapp.cpowqiy80fmc.ap-northeast-2.rds.amazonaws.com -d owner -u euneun -x qwer1234 -e mariadb -o ./src/entities
