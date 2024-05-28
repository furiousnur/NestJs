import { 
    IsNotEmpty, IsNumber,
    IsString, 
} from 'class-validator'; 

export class UserProfileDto {
    @IsNotEmpty()
    @IsString()
    firstName: string;

    @IsNotEmpty()
    @IsString()
    lastName: string;

    @IsNotEmpty()
    @IsNumber()
    age: number;

    @IsNotEmpty()
    @IsString()
    dob: string;  
}