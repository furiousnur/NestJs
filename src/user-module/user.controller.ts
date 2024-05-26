import {BadRequestException, Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Post} from '@nestjs/common';
import {UserService} from './user.service';
import {User} from './interface/user';
import {UserDto} from "./dto/user.dto"; 

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    // HTTP GET request to /users
    @Get()
    async getUsers(): Promise<User[]> {
        try {
            return this.userService.getUsers();
        }catch (e) {
            throw new BadRequestException(e.message)
        } 
    }

    // HTTP GET request to /users/:id
    @Get(':id') 
    async getUser(@Param('id', new ParseIntPipe({errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE})) id: number): Promise<User>{
        try {
            return await this.userService.getUser(id);
        }catch (e) {
            throw new BadRequestException(e.message)
        }
    } 
    
    // HTTP POST request to /users
    @Post() 
    async postUser(@Body() user: UserDto): Promise<User> {
        try {
            return await this.userService.addUser(user);
        }catch (e) {
            throw new BadRequestException(e.message)
        }
    }

    // HTTP DELETE request to /users/:id
    @Delete(':id')
    async deleteUser(@Param('id', new ParseIntPipe({errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE})) id: number): Promise<User[]> { 
        try {
            return this.userService.deleteUser(id);
        }catch (e) {
            throw new BadRequestException(e.message)
        }
    }
}
