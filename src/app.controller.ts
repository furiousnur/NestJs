import {Controller, Get, Render, Res} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  root() {
    return { message: "hello world!"};
  } 

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
