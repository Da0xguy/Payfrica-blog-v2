import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { winstonConfig } from './common/logger/winston.config';
import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: WinstonModule.createLogger(winstonConfig),
  });
  
  // Serve static files from uploads directory
  app.useStaticAssets('uploads', {
    prefix: '/uploads',
  });
  
  // Enable global validation pipe
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));
  
  // Enable global exception filter
  app.useGlobalFilters(new HttpExceptionFilter());
  
  // Setup Swagger documentation
  const config = new DocumentBuilder()
    .setTitle('Payfrica Blog API')
    .setDescription('API documentation for Payfrica Blog platform')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config, {
    deepScanRoutes: true,
    include: [AppModule],
  });
  SwaggerModule.setup('api', app, document);
  
  // Note: CSRF protection is not needed for JWT-based REST APIs
  // JWT tokens are sent via Authorization header, not cookies
  // If using cookie-based auth in the future, implement CSRF protection
  
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });

  const port = process.env.PORT || 3001;
  await app.listen(port);
  console.log(`Backend server is running on http://localhost:${port}`);
  console.log(`Swagger documentation available at http://localhost:${port}/api`);
}
bootstrap();
