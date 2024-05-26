import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service'; 

@Module({
    controllers: [UserController],
    providers: [UserService], // Ensure IsUniqueIdConstraint is provided here
    exports: [UserService],
})
export class UserModule {}
