import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from '@fastify/helmet';
import cors from '@fastify/cors';
import { ValidationPipe } from '@nestjs/common';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

/**
 * Inicia la aplicacion, el puerto puede ser modificado de acuerdo a las necesidades.
 */
async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  await app.register(helmet);
  await app.register(cors, {
    origin: true, // Permitir todas las solicitudes de origen (puedes configurarlo según tus necesidades)
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos HTTP permitidos
    allowedHeaders: ['Content-Type', 'Authorization'],
  });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  await app.listen(3003);
}
bootstrap();
