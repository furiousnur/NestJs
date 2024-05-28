import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users/users.controller';
import { UsersService } from './services/users/users.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "../typeorm/entities/User";
import { UserProfileController } from './controllers/user-profile/user-profile.controller';
import { ProfileService } from './services/profile/profile.service';
import {Profile} from "../typeorm/entities/Profile";

@Module({
  imports:[TypeOrmModule.forFeature([User, Profile])],
  controllers: [UsersController, UserProfileController],
  providers: [UsersService, ProfileService]
})
export class UsersModule {}
