import {Body, Controller, Delete, Get, Param, Post} from '@nestjs/common';
import { UserService } from './user.service';
import {User} from "./interface/user";

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {
        
    }
    //HTTP GET request to /users
    @Get()
    getUsers(): User[] {
        return this.userService.getUsers();
    }
    //HTTP GET request to /users/1
    @Get()
    getUser(): User {
        return this.userService.getUser(1);
    }
    //HTTP POST request to /users
    @Post()
    postUser(@Body user:User): User {
        return this.userService.addUser(user);
    }
    //HTTP DELETE request to /users/1
    @Delete(':id')
    deleteUser(@Param('id') id: number): User[] {
        return this.userService.deleteUser(id);
    }
}
