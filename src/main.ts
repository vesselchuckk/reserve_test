import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const config = new DocumentBuilder()
    .setTitle('Reserve API')
    .setDescription('API documentation for the test booking API')
    .setVersion('1.0')
    .build()

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document)

  app.enableCors()
  await app.listen(process.env.PORT ?? 3000)
}
bootstrap()
