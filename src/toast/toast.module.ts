import { Module } from '@nestjs/common';
import { ToastService } from './toast.service';
import { ToastController } from './toast.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Toast } from './entities/toast.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Toast])],
  controllers: [ToastController],
  providers: [ToastService],
})
export class ToastModule {}
