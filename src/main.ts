import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { join } from 'path';
import * as express from 'express';
import * as basicAuth from 'express-basic-auth';
import * as cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv';
import * as fs from 'fs';


// Swagger
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { UrlList } from './utils/urlList';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use('/public', express.static(join(__dirname, '..', 'public')));
  app.use(cookieParser());

  // Validation
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      disableErrorMessages: false,
    }),
  );

  // Swagger config
  const config = new DocumentBuilder()
    .setTitle('Gubmall Streaming Backend')
    .setDescription('API documentation for your Gubmall Streaming Backend')
    .setVersion('1.0')
    // .addCookieAuth('accessToken')
    .build();

  app.use(['/swagger-docs-secret',], basicAuth({
    users: { 'gumball_admin': process.env.SWAGGER_PASS ?? "password" },
    challenge: true,
  }));

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger-docs-secret', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      withCredentials: true
    }
  });

  // Cors
  app.enableCors({
    origin: UrlList,
    exposedHeaders: ['Authorization'],
    optionsSuccessStatus: 200,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  });

  // await app.listen(443);
  await app.listen(process.env.PORT ?? 3000, () => {
    console.log(`Server Running on http://localhost:${process.env.PORT}`);
    console.log(`Swagger http://localhost:${process.env.PORT}/swagger-docs-secret`);
  });

}
bootstrap();

