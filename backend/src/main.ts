import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuración de CORS
  app.enableCors({
    origin: '*', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type,Authorization', 
    credentials: true, 
  });

  app.useGlobalPipes(new ValidationPipe());

  const swaggerConfig = new DocumentBuilder()
  .setTitle('FastBurguers')
  .setDescription('API para FastBurguers construido con NestJS')
  .setVersion('1.0.0')
  .addBearerAuth()
  .build();
  const documentSwagger = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, documentSwagger);
  
  await app.listen(3001);
  console.log(`Server listening on port 3001`);
  
}
bootstrap();
