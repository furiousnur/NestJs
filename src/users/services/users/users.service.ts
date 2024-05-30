import {BadRequestException, Injectable, NotFoundException, Res} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "../../../typeorm/entities/User";
import {Repository} from "typeorm";
import {CreateUsersParams} from "../../../utils/types";
import * as bcrypt from 'bcrypt'; 

@Injectable()
export class UsersService { 
    constructor(@InjectRepository(User) private userRepository: Repository<User>) {}
    
    public async getUsers(){
        const users = this.userRepository.find({relations: ['profile','posts']});
        if (!users) {
            throw new NotFoundException('No users found');
        }
        return users;
    } 
    
    public async createUser(userDetails: CreateUsersParams){
        try {
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(userDetails.password, salt);
            const newUser = this.userRepository.create({
                ...userDetails,
                password: hashedPassword, 
                createdAt: new Date(),
            });
            return this.userRepository.save(newUser); 
        } catch (e) {
            throw new BadRequestException(e.message);
        }
    }
    
    public async findUser(id: number): Promise<User> {
        const user = await this.userRepository.findOne({
            where: { id },
            relations: ['profile']
        });
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return Promise.resolve(user);
    }
    
    public async updateUser(id: number, userDetails: CreateUsersParams) {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) {
            throw new NotFoundException('User not found. Check the ID and try again');
        }
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(userDetails.password, salt);
        return await this.userRepository.save({
            ...user,
            ...userDetails,
            password: hashedPassword,
            updatedAt: new Date(),
        }); 
    }

    public async deleteUser(id: number){
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) {
            throw new NotFoundException('User not found. Check the ID and try again');
        }
        await this.userRepository.remove(user);
        return this.getUsers();
    }
}
