import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './user-module/filter';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { configureHandlebars } from './handlebars.config';
import * as expressHandlebars from 'express-handlebars'; 

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  configureHandlebars();
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.engine(
      'hbs',
      expressHandlebars.create({
        extname: '.hbs',
        layoutsDir: join(__dirname, '..', 'views', 'layouts'), // Specify the layouts directory
        partialsDir: join(__dirname, '..', 'views', 'partials'), // Specify the partials directory
        defaultLayout: 'main',
      }).engine,
  );
  app.setViewEngine('hbs'); 
  app.useStaticAssets(join(__dirname, '..', 'public'));
  
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
    validationError: { target: false, value: false },
  }));
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(3000);
}
bootstrap();
