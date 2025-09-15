import { Module } from '@nestjs/common';
import { UserDbService } from './user-db.service';
import { UserDbController } from './user-db.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Board } from 'src/board/entities/board.entity';
import { Order } from 'src/order/entities/order.entity';
import { CartMenu } from 'src/cart-menu/entities/cart-menu.entity';
import { Cart } from 'src/cart/entities/cart.entity';
import { OrderMenu } from 'src/order-menu/entities/order-menu.entity';
import { UserDb } from './entities/user-db.entity';
import { OwnerGroup } from './entities/OwnerGroup';
import { OwnerGroupOption } from './entities/OwnerGroupOption';
import { OwnerMenu } from './entities/OwnerMenu';
import { OwnerMenuGroup } from './entities/OwnerMenuGroup';
import { OwnerOption } from './entities/OwnerOption';
import { OwnerStore } from './entities/OwnerStore';
import { OwnerUser } from './entities/OwnerUser';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      name: 'userDBConnection',
      type: 'mariadb',
      host: '34.64.34.242',
      port: 3306,
      username: 'root',
      password: 'Xhtmxm1357!',
      database: 'toast',
      entities: [
        User,
        Board,
        Order,
        OrderMenu,
        Cart,
        CartMenu,
        OwnerGroup,
        OwnerGroupOption,
        OwnerMenu,
        OwnerMenuGroup,
        OwnerOption,
        OwnerStore,
        OwnerUser,
      ],
      synchronize: true,
      logging: true,
    }),
    TypeOrmModule.forFeature([UserDb], 'userDBConnection'),
  ],
  controllers: [UserDbController],
  providers: [UserDbService],
})
export class UserDbModule {}
