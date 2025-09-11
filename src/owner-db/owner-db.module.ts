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

import { OrderMenu } from 'src/order-menu/entities/order-menu.entity';
import { CartMenu } from 'src/cart-menu/entities/cart-menu.entity';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      name: 'ownerDBConnection',
      type: 'mariadb',
      host: '34.64.34.242',
      port: 3306,
      username: 'root',
      password: 'Xhtmxm1357!',
      database: 'merchant',
      entities: [Group, Menu, MenuGroup, Option, Store, User],
      synchronize: true,
    }),
  ],
  controllers: [OwnerDbController],
  providers: [OwnerDbService],
})
export class OwnerDbModule {}

// typeorm-model-generator -h toastapp.cpowqiy80fmc.ap-northeast-2.rds.amazonaws.com -d owner -u euneun -x qwer1234 -e mariadb -o ./src/entities
