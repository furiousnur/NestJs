import {BadRequestException, Body, Controller, Get, HttpStatus, Param, ParseIntPipe, Post, Res} from '@nestjs/common'; 
import {Response} from "express";
import {UserProfileDto} from "../../dtos/userProfile.dto";
import {ProfileService} from "../../services/profile/profile.service";

@Controller('profile')
export class UserProfileController { 
    constructor(private profilesService: ProfileService) {}

    @Post('/user/:id')
    async createUserProfile(@Param('id', ParseIntPipe) id: number, @Body() userProfileDto:UserProfileDto,@Res() res: Response){
        try {
            const data = await this.profilesService.createUserProfile(id, userProfileDto);
            return res.status(HttpStatus.OK).json({
                message: 'User Profile created successfully',
                data,
            });
        } catch (e) {
            throw new BadRequestException(e.message);
        }
    }
    
    @Get(':id')
    async findProfile(@Param('id', ParseIntPipe) id: number){
        try {
            return await this.profilesService.findProfile(id);
        } catch (e) {
            throw new BadRequestException(e.message);
        }
    }
}
