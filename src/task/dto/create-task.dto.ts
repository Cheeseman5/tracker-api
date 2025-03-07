import {
    IsEnum,
    IsString,
    IsNotEmpty,
    MinLength,
} from 'class-validator';

export class CreateTaskDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(3, { message: 'Title must have at least 3 characters.'})
    title: string;

    @IsString()
    @MinLength(3, { message: 'description must have at least 3 characters.'})
    description: string;

    
}
