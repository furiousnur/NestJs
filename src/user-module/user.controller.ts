import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './interface/user';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    // HTTP GET request to /users
    @Get()
    getUsers(): User[] {
        return this.userService.getUsers();
    }

    // HTTP GET request to /users/:id
    @Get(':id')
    getUser(@Param('id') id: string): User {
        const userId = parseInt(id, 10);
        return this.userService.getUser(userId);
    }

    // HTTP POST request to /users
    @Post()
    postUser(@Body() user: User): User {
        return this.userService.addUser(user);
    }

    // HTTP DELETE request to /users/:id
    @Delete(':id')
    deleteUser(@Param('id') id: string): User[] {
        const userId = parseInt(id, 10);
        return this.userService.deleteUser(userId);
    }
}
