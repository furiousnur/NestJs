import {Body, Controller, Delete, Get, Header, HttpStatus, Param, ParseIntPipe, Post, Redirect, Req, Res} from '@nestjs/common';
import {UserService} from './user.service';
import {User} from './interface/user';
import {UserDto} from "./dto/user.dto";
import {Request, Response} from 'express';

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
    // @Redirect('') // Redirect to the root URL
    // @Header('Cache-Control', 'none') // Set the Cache-Control header to none
    getUser(
        @Param('id', new ParseIntPipe({errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE})) id: number,
        @Req() request: Request, // Inject the Request object,
        @Res() response: Response // Inject the Response object
    ){
        const data = this.userService.getUser(id);
        response.status(HttpStatus.OK).json(data);
    }

    // HTTP POST request to /users
    // @Post() 
    // postUser(@Body() user: UserDto): User {
    //     return this.userService.addUser(user);
    // }
    
    // HTTP POST request to /users
    @Post() 
    async postUser(@Body() user: UserDto): Promise<User> {
        return this.userService.addUser(user);
    }

    // HTTP DELETE request to /users/:id
    @Delete(':id')
    deleteUser(@Param('id', new ParseIntPipe({errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE})) id: number): User[] { 
        return this.userService.deleteUser(id);
    }
}
