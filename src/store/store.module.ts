import { Module } from '@nestjs/common';
import { StoreService } from './store.service';
import { StoreController } from './store.controller';
import { OwnerStore } from 'src/user-db/entities/OwnerStore';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([OwnerStore], 'userDBConnection')],
  controllers: [StoreController],
  providers: [StoreService],
})
export class StoreModule {}
