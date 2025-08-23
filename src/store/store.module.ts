import { Module } from '@nestjs/common';
import { StoreService } from './store.service';
import { StoreController } from './store.controller';
import { Store } from 'src/owner-db/entities/Store';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Store], 'ownerDBConnection')],
  controllers: [StoreController],
  providers: [StoreService],
})
export class StoreModule {}
