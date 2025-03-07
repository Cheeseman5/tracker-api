import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Task } from './entities/task.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task) private readonly taskRepository: Repository<Task>,
  ) {}

  create(createTaskDto: CreateTaskDto): Promise<Task> {
    const task: Task = new Task();
    task.title = createTaskDto.title;
    task.description = createTaskDto.description;

    // default values for task creation
    // enum values: 'pending', 'in-progress', 'completed'
    task.status = 'pending';
    const now: Date = new Date();
    task.createdAt = now;
    task.updatedAt = now;
    return this.taskRepository.save(task);
  }

  findAllTasks(): Promise<Task[]> {
    return this.taskRepository.find();
  }

  findOne(id: string): Promise<Task | null> {
    return this.taskRepository.findOneBy({ id });
  }

  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task | null> {
    const existingTask: Task | null = await this.taskRepository.findOneBy({ id });
    
    if(!existingTask) {
      return null;
    }
    if(updateTaskDto.title) {
      existingTask.title = updateTaskDto.title ?? '';
    }

    if(updateTaskDto.description) {
      existingTask.description = updateTaskDto.description ?? '';
    }

    if(updateTaskDto.status) {
      existingTask.status = updateTaskDto.status ?? 'pending';
    }
    existingTask.updatedAt = new Date();

    return this.taskRepository.save(existingTask);
  }

  remove(id: string): Promise<DeleteResult> {
    return this.taskRepository.delete(id);
  }
}