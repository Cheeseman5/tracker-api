import {
    IsEnum,
    IsString
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
    @IsString()
    @IsEnum(['pending', 'in-progress', 'completed'])
    status?: string;
}
