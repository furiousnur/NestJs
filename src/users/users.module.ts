import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users/users.controller';
import { UsersService } from './services/users/users.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "../typeorm/entities/User";
import { UserProfileController } from './controllers/user-profile/user-profile.controller';
import { ProfileService } from './services/profile/profile.service';
import {Profile} from "../typeorm/entities/Profile";
import {Post} from "../typeorm/entities/Post";
import { PostService } from './services/post/post.service';
import { PostController } from './controllers/post/post.controller';

@Module({
  imports:[TypeOrmModule.forFeature([User, Profile, Post])],
  controllers: [UsersController, UserProfileController, PostController],
  providers: [UsersService, ProfileService, PostService]
})
export class UsersModule {}
