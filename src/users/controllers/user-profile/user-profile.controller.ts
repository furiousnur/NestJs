import {BadRequestException, Body, Controller, HttpStatus, Param, ParseIntPipe, Post, Res} from '@nestjs/common'; 
import {Response} from "express";
import {UserProfileDto} from "../../dtos/userProfile.dto";
import {ProfileService} from "../../services/profile/profile.service";

@Controller('user-profile')
export class UserProfileController { 
    constructor(private profilesService: ProfileService) {}

    @Post(':id')
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
}
