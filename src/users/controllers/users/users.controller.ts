import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    HttpStatus,
    Param,
    ParseIntPipe,
    Post,
    Res
} from '@nestjs/common'; 
import {User} from "../../../typeorm/entities/User"; 
import {CreateUserDto} from "../../dtos/createUser.dto"; 
import {UsersService} from "../../services/users/users.service";
import {Response} from "express";

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}
    
    @Get()
    async getUsers(@Res() res: Response): Promise<Response> {
        try {
            const data = await this.usersService.getUsers();
            return res.status(HttpStatus.OK).json({
                message: 'All Users are here.',
                data,
            });
        } catch (e) {
            throw new BadRequestException(e.message);
        }
    }
    
    @Post()
    async createUser(@Body() createUserDto:CreateUserDto,@Res() res: Response){
        try {
            const data = await this.usersService.createUser(createUserDto);
            return res.status(HttpStatus.OK).json({
                message: 'User created successfully',
                data,
            });
        } catch (e) {
            throw new BadRequestException(e.message);
        }
    }
    
    @Get(':id')
    async findUser(@Param('id', ParseIntPipe) id: number): Promise<User> {
        try {
            return await this.usersService.findUser(id);
        } catch (e) {
            throw new BadRequestException(e.message);
        }
    }
    
    @Delete(':id')
    async deleteUser(@Param('id', ParseIntPipe) id: number,@Res() res: Response){
        try {
            const data = await this.usersService.deleteUser(id);
            return res.status(HttpStatus.OK).json({
                message: 'User deleted successfully',
                data,
            });
        } catch (e) {
            throw new BadRequestException(e.message);
        }
    } 
}
