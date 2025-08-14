import { Module } from '@nestjs/common';
import { OwnerDbService } from './owner-db.service';
import { OwnerDbController } from './owner-db.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OwnerDb } from './entities/owner-db.entity';
import { Store } from './entities/Store';
import { Menu } from './entities/Menu';
import { User } from './entities/User';
import { Group } from './entities/Group';
import { MenuGroups } from './entities/MenuGroups';
import { MenuOption } from './entities/MenuOption';
import { MenuOptionGroups } from './entities/MenuOptionGroups';
import { OptionGroups } from './entities/OptionGroups';
import { OrderMenu } from './entities/OrderMenu';
import { Orders } from './entities/Orders';
import { SelectedMenuOption } from './entities/SelectedMenuOption';
import { SelectedOption } from './entities/SelectedOption';
import { Option } from './entities/Option';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      name: 'ownerDBConnection',
      type: 'mariadb',
      host: process.env.DB_HOST,
      port: 3306,
      username: 'euneun',
      password: 'qwer1234',
      database: 'owner',
      entities: [
        Group,
        Menu,
        MenuGroups,
        MenuOption,
        MenuOptionGroups,
        Option,
        OptionGroups,
        OrderMenu,
        Orders,
        SelectedMenuOption,
        SelectedOption,
        Store,
        User,
      ],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([OwnerDb], 'ownerDBConnection'),
  ],
  controllers: [OwnerDbController],
  providers: [OwnerDbService],
})
export class OwnerDbModule {}
