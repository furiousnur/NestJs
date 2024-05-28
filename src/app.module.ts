import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {UserModule} from "./user-module/user.module";
import {TaskModule} from "./task-module/task.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./typeorm/entities/User"; 
import { UsersModule } from './users/users.module';

@Module({
  imports: [UserModule, TaskModule, TypeOrmModule.forRoot({
    type:'mysql',
    port:3306,
    host:'localhost',
    username:'root',
    password:'',
    database:'basic_nest',
    entities:[User],
    synchronize:true
  }), UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
