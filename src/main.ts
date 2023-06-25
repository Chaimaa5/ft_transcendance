import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { setupSwagger } from './swagger';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const corsOptions = {
    origin: 'http://10.12.2.12:5173',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  };
  setupSwagger(app);
  app.useWebSocketAdapter(new IoAdapter(app));
  app.use(cors(corsOptions));
  app.use(cookieParser());
  await app.listen(3001);
}
bootstrap();
