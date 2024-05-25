import { Injectable } from '@nestjs/common';
import {User} from "./interface/user";

@Injectable()
export class UserService {
    public users: User[] = [];
    
    getUsers(): User[] {
        return this.users;
    }
    
    getUser(id: number): User {
        return this.users.find(i => i.id === id);
    }
    
    addUser(user: User): User {
        this.users.push(user);
        return user;
    }
    
    deleteUser(id: number): User[] { 
        const remainingUsers = this.users.filter(i => i.id !== id);
        this.users = remainingUsers;
        return remainingUsers; 
    }
}