import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {UserProfileParams} from "../../../utils/types";  
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Profile} from "../../../typeorm/entities/Profile";
import {User} from "../../../typeorm/entities/User";

@Injectable()
export class ProfileService {
    constructor(
        @InjectRepository(Profile) private profileRepository: Repository<Profile>, 
        @InjectRepository(User)private userRepository: Repository<User>
    ) {}
    
    public async createUserProfile(id: number, profileDetails: UserProfileParams){
        try {
            const user = await this.userRepository.findOne({ where: { id } });
            if (!user) {
                throw new NotFoundException('User profile not found. Check the ID and try again');
            }
            const newProfile = this.profileRepository.create({
                ...profileDetails, 
                createdAt: new Date(),
            });
            const profile = await this.profileRepository.save(newProfile);

            user.profileId = profile.id;
            user.updatedAt = new Date();
            await this.userRepository.save(user); 
            
            return profile;
        } catch (e) {
            throw new BadRequestException(e.message);
        }
    }

    public async findProfile(id: number): Promise<Profile> {
        const profile = await this.profileRepository.findOne({
            where: { id },
            relations: ['user']
        });
        if (!profile) {
            throw new NotFoundException('Profile not found');
        }
        return Promise.resolve(profile);
    }
}
