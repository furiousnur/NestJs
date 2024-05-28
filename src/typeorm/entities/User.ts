import {Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Profile} from "./Profile";

@Entity({name: 'users'})
export class User{
    @PrimaryGeneratedColumn({type: "bigint"})
    id: number;
    
    @Column({unique: true})
    username: string;
    
    @Column()
    password: string;
    
    @Column()
    createdAt: Date;
    
    @Column({nullable: true})
    updatedAt: Date;
    
    @Column({nullable: true})
    authStrategy: string;

    @Column({ nullable: true })
    profileId: number;

    @OneToOne(() => Profile)
    @JoinColumn({ name: 'profileId' })
    profile: Profile;
}