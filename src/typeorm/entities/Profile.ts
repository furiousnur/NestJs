import {Column, Entity, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./User";

@Entity('profiles')
export class Profile {
    @PrimaryGeneratedColumn({type: "bigint"})
    id: number;

    @Column()
    firstName: string;
    
    @Column()
    lastName: string;

    @Column()
    age: number;
    
    @Column()
    dob: string;
    
    @Column()
    createdAt: Date;
    
    @Column({nullable: true})
    updatedAt: Date;

    @OneToOne(() => User, user => user.profile)
    user: User;
}