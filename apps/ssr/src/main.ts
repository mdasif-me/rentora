import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.enableVersioning({
    type: VersioningType.URI,
  });

  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Rentora API')
    .setDescription('API documentation for Rentora')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, document);

  const port = parseInt(process.env.PORT ?? '3001', 10);
  const server = await app.listen(port);

  const addressInfo = server.address() as {
    address: string;
    family: string;
    port: number;
  };
  const localUrl = `http://localhost:${port}`;
  const networkUrl = `http://${addressInfo.address}:${addressInfo.port}`;
  logger.log('🚀 Application ready');
  logger.log(`- Local:   ${localUrl}`);
  logger.log(`- Network: ${networkUrl}`);
}

bootstrap();
