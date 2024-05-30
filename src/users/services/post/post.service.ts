import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm"; 
import {Repository} from "typeorm"; 
import {Post} from "../../../typeorm/entities/Post";
import {PostParams} from "../../../utils/types";
import {User} from "../../../typeorm/entities/User";

@Injectable()
export class PostService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(Post) private postRepository: Repository<Post>
    ) {}

    public async createUserPost(id: number, postDetails: PostParams){
        try {
            const user = await this.userRepository.findOne({ where: { id } });
            if (!user) {
                throw new NotFoundException('User not found. Check the ID and try again');
            }
            const newPost = this.postRepository.create({
                ...postDetails,
                user,
                createdAt: new Date(),
            });
            return await this.postRepository.save(newPost); 
        } catch (e) {
            throw new BadRequestException(e.message);
        }
    }
}
