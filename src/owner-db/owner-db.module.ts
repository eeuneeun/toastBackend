import { Module } from '@nestjs/common';
import { OwnerDbService } from './owner-db.service';
import { OwnerDbController } from './owner-db.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Store } from './entities/Store';
import { Menu } from './entities/Menu';
import { User } from './entities/User';
import { MenuGroups } from './entities/MenuGroups';
import { MenuOption } from './entities/MenuOption';
import { MenuOptionGroups } from './entities/MenuOptionGroups';
import { OptionGroups } from './entities/OptionGroups';
import { SelectedMenuOption } from './entities/SelectedMenuOption';
import { SelectedOption } from './entities/SelectedOption';
import { Option } from './entities/Option';
import { OwnerDb } from './entities/owner-db.entity';
import { Groups } from './entities/Groups';
import { OptionByGroup } from './entities/OptionByGroup';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      name: 'ownerDBConnection',
      type: 'mariadb',
      host: 'toastapp.cpowqiy80fmc.ap-northeast-2.rds.amazonaws.com',
      port: 3306,
      username: 'euneun',
      password: 'qwer1234',
      database: 'owner',
      entities: [
        Groups,
        Menu,
        MenuGroups,
        MenuOption,
        MenuOptionGroups,
        Option,
        OptionByGroup,
        OptionGroups,
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

// typeorm-model-generator -h toastapp.cpowqiy80fmc.ap-northeast-2.rds.amazonaws.com -d owner -u euneun -x qwer1234 -e mariadb -o ./src/entities
