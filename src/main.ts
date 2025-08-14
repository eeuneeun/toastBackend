import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // CORS 허용
  app.enableCors({
    origin: 'http://ec2-3-38-147-4.ap-northeast-2.compute.amazonaws.com:3000', // Next.js (프론트) 주소
    credentials: true, // 쿠키/인증정보 허용할 경우
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  });

  // /uploads 경로로 접근 가능하도록 설정
  app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));

  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
