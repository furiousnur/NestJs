import {IsNotEmpty, IsNumber, IsString, IsBoolean, IsDefined} from 'class-validator';

export class TaskDto {
    @IsNotEmpty()
    @IsNumber()
    id: number;

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    name: string; 
}
