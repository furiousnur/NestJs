import { IsNotEmpty, IsNumber, IsString, IsEmail } from 'class-validator';

export class UserDto {
    @IsNotEmpty()
    @IsNumber()
    id: number;
    
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;
}
