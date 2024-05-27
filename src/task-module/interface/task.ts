import {IsBoolean, IsDefined} from "class-validator";

export interface Task {
    id: number;
    name: string;
    completed?: boolean;
    description?: string;
    owner?: string;
    duration?: number;
}

export class QueryParamDto {
    @IsDefined()
    @IsBoolean()
    filter: boolean; 
}