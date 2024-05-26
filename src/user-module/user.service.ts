import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './interface/user';

@Injectable()
export class UserService {
    private users: User[] = [];

    async getUsers(): Promise<User[]> {
        const users = this.users;
        if (!users) {
            throw new NotFoundException('No users found');
        }
        return Promise.resolve(users);
    }

    async getUser(id: number): Promise<User> {
        const user = this.users.find(user => user.id === id);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return Promise.resolve(user);
    }
    
    async addUser(user: User): Promise<User> {
        this.users.push(user);
        return Promise.resolve(user);
    }

    async deleteUser(id: number): Promise<User[]> {
        const index = this.users.findIndex(user => user.id === id);
        if (index === -1) {
            throw new NotFoundException('User not found');
        }
        this.users.splice(index, 1);
        return Promise.resolve(this.users);
    }
}