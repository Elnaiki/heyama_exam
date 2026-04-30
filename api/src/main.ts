import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS configuration (important pour Vercel + Railway)
  app.enableCors({
    origin: '*',                    // À restreindre plus tard en production
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: '*',
    credentials: true,
  });

  // Railway utilise la variable PORT (souvent 8080)
  const port = process.env.PORT || 3000;

  await app.listen(port, '0.0.0.0');

  console.log(`🚀 API is running on port ${port}`);
  console.log(`📍 URL: https://heyamaexam-production.up.railway.app`);
}

bootstrap();