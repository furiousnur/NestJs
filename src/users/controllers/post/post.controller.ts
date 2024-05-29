import {BadRequestException, Body, Controller, HttpStatus, Param, ParseIntPipe, Post, Res} from '@nestjs/common';
import {PostService} from "../../services/post/post.service"; 
import {Response} from "express";
import {PostDto} from "../../dtos/post.dto";

@Controller('user')
export class PostController {
    constructor(private postService: PostService) {}

    @Post('/:id/post')
    async createUserProfile(@Param('id', ParseIntPipe) id: number, @Body() postDto:PostDto,@Res() res: Response){
        try {
            const data = await this.postService.createUserPost(id, postDto);
            return res.status(HttpStatus.OK).json({
                message: 'Post created successfully',
                data,
            });
        } catch (e) {
            throw new BadRequestException(e.message);
        }
    }
}
