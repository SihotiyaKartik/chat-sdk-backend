import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { createServer } from 'http';
import { ExpressAdapter } from '@nestjs/platform-express';
import { WsAdapter } from '@nestjs/platform-ws';
import express from 'express';
import { IoAdapter } from '@nestjs/platform-socket.io';

async function bootstrap() {
  // const expressApp = express(); // Initialize Express app
  // const httpServer = createServer(expressApp); // Create HTTP server

  const app = await NestFactory.create(AppModule);

  // app.init(); // Initialize NestJS application

  app.useWebSocketAdapter(new IoAdapter(app)); // Add this line for WebSocket support

  await app.listen(3000);
}
bootstrap();

// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import {
//   FastifyAdapter,
//   NestFastifyApplication,
// } from '@nestjs/platform-fastify';
// import { createServer } from 'http';

// async function bootstrap() {
//   const httpServer = createServer(); // Create HTTP server

//   const app = await NestFactory.create<NestFastifyApplication>(
//     AppModule,
//     new FastifyAdapter(httpServer),
//   );

//   app.enableCors(); // Enable CORS if needed

//   await app.listen(3000);
// }
// bootstrap();
