import {Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./User";  

@Entity('posts')
export class Post {
    @PrimaryGeneratedColumn({type: "bigint"})
    id: number;

    @Column({unique: true})
    title: string;
    
    @Column()
    description: string;

    @Column({ nullable: true })
    userId: number;

    @Column()
    createdAt: Date;

    @Column({nullable: true})
    updatedAt: Date;

    @ManyToOne(() => User, user => user.posts)
    user: User;
}