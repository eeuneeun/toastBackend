import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // CORS 허용
  app.enableCors({
    origin: 'http://localhost:3000', // Next.js (프론트) 주소
    credentials: true, // 쿠키/인증정보 허용할 경우
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  });
  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
