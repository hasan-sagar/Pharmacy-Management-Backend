import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //enable cors
  app.enableCors();
  //api version
  app.setGlobalPrefix('api/v1');
  //swagger docs
  const config = new DocumentBuilder()
    .setTitle('Pharmacy Management System Api')
    .setDescription('Pharmacy Management System api documentation')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  //server port
  await app.listen(5000);
}
bootstrap();
