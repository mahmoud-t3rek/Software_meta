import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import { SwaggerConnect } from './common/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.use(helmet());

  SwaggerConnect(app);

  const PORT = process.env.PORT || 3000;

  await app.listen(PORT);

  console.log(`🚀 Server running on port ${PORT}`);
}

bootstrap();