import { IsNotEmpty, IsNumber, IsString, IsEmail } from 'class-validator';
import {IsUnique} from "./unique-id.validator";

export class UserDto {
    @IsNotEmpty()
    @IsNumber()
    // @IsUnique({ message: 'ID $value already exists. Choose another ID.' })
    id: number;
    
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;
}
