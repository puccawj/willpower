import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS
  app.enableCors();
  
  // Setup Swagger
  const config = new DocumentBuilder()
    .setTitle('Items API')
    .setDescription('The Items API description')
    .setVersion('1.0')
    .addTag('items')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  
  await app.listen(3000);
  console.log('NestJS Application is running on: http://localhost:3000');
  console.log('Swagger API documentation is available at: http://localhost:3000/api');
}
bootstrap();
