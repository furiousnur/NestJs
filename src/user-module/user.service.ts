import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './interface/user';

@Injectable()
export class UserService {
    private users: User[] = [];

    getUsers(): User[] {
        return this.users;
    }

    getUser(id: number): User {
        const user = this.users.find(user => user.id === id);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user;
    }

    addUser(user: User): User {
        this.users.push(user);
        return user;
    }

    deleteUser(id: number): User[] {
        const index = this.users.findIndex(user => user.id === id);
        if (index === -1) {
            throw new NotFoundException('User not found');
        }
        this.users.splice(index, 1);
        return this.users;
    }
}