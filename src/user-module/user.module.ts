import {MiddlewareConsumer, Module, NestModule, RequestMethod} from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import {LoggerMiddleware} from "./middleware"; 

@Module({
    controllers: [UserController],
    providers: [UserService], // Ensure IsUniqueIdConstraint is provided here
    exports: [UserService],
})
export class UserModule implements NestModule{
    configure(consumer:MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware)
        .exclude(
        {path: 'users', method: RequestMethod.GET}
        )
        .forRoutes(UserController);
        /*.forRoutes({
            path: 'users',
            method:  RequestMethod.POST
        });*/
    }
}
