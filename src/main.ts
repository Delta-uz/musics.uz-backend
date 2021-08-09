import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  const options = new DocumentBuilder()
    .setTitle('Musics API')
    .setDescription('Musics platform API')
    .setVersion('1.0')
    .addCookieAuth('Authorization')
    .build()
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);

  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  const port = process.env.PORT || 8000;
  await app.listen(port);
  console.log(`Application is running on: ${await app.getUrl()}`)
}
bootstrap();
