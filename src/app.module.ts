import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {UserModule} from "./user-module/user.module";
import {TaskModule} from "./task-module/task.module"; 

@Module({
  imports: [UserModule, TaskModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
