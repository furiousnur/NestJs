import {BadRequestException, Injectable, NotFoundException, Res} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "../../../typeorm/entities/User";
import {Repository} from "typeorm";
import {CreateUsersParams} from "../../../utils/types";
import * as bcrypt from 'bcrypt'; 

@Injectable()
export class UsersService { 
    constructor(@InjectRepository(User) private userRepository: Repository<User>) {}
    
    public async getUsers(): Promise<User[]>{
        const users = this.userRepository.find();
        if (!users) {
            throw new NotFoundException('No users found');
        }
        return Promise.resolve(users);
    }
    
    public async createUser(userDetails: CreateUsersParams):Promise<User>{
        try {
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(userDetails.password, salt);
            const newUser = this.userRepository.create({
                ...userDetails,
                password: hashedPassword, 
                createdAt: new Date(),
            });
            const user = this.userRepository.save(newUser);
            return Promise.resolve(user);
        } catch (e) {
            throw new BadRequestException(e.message);
        }
    }

    public async findUser(id: number): Promise<User> { 
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return Promise.resolve(user);
    }

    public async deleteUser(id: number): Promise<User[]> {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) {
            throw new NotFoundException('User not found. Check the ID and try again');
        }
        await this.userRepository.remove(user);
        return this.getUsers();
    }

}
