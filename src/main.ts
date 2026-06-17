import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS
  app.enableCors();
  
  // Setup Swagger
  const config = new DocumentBuilder()
    .setTitle('Willpower API')
    .setDescription('The Willpower API description (Users, Orders, and Items)')
    .setVersion('1.0')
    .addTag('items')
    .addTag('users')
    .addTag('orders')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  
  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`NestJS Application is running on: http://localhost:${port}`);
  console.log(`Swagger API documentation is available at: http://localhost:${port}/api`);
}
bootstrap();
