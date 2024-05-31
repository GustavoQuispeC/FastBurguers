import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const swaggerConfig = new DocumentBuilder()
  .setTitle('FastBurguers')
  .setDescription('API para FastBurguers construido con NestJS')
  .setVersion('1.0.0')
  .addBearerAuth()
  .build();
  const documentSwagger = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, documentSwagger);
  await app.listen(3000);
  console.log(`Server listening on port 3000`);
  
}
bootstrap();
