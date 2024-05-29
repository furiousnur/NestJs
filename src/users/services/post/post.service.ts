import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm"; 
import {Repository} from "typeorm"; 
import {Post} from "../../../typeorm/entities/Post";
import {PostParams} from "../../../utils/types";
import {User} from "../../../typeorm/entities/User";

@Injectable()
export class PostService {
    constructor(
        @InjectRepository(Post)private postRepository: Repository<Post>,
        @InjectRepository(User)private userRepository: Repository<User>,
    ) {}

    public async createUserPost(id: number, postDetails: PostParams):Promise<Post>{
        try {
            const user = await this.userRepository.findOne({ where: { id } });
            if (!user) {
                throw new NotFoundException('User not found. Check the ID and try again');
            }
            const newPost = this.postRepository.create({
                ...postDetails,
                userId: id,
                createdAt: new Date(),
            });
            const profile = await this.postRepository.save(newPost);
            return Promise.resolve(profile);
        } catch (e) {
            throw new BadRequestException(e.message);
        }
    }
}
