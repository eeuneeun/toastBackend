import { Module } from '@nestjs/common';
import { StoreService } from './store.service';
import { StoreController } from './store.controller';
import { Store } from 'src/merchant-db/entities/Store';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Store], 'merchantDBConnection')],
  controllers: [StoreController],
  providers: [StoreService],
})
export class StoreModule {}
