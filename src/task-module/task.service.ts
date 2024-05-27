import { Injectable } from "@nestjs/common";
import { Task } from "./interface/task";
import { TaskStoreService } from "./task-store.service";

@Injectable()
export class TaskService {
    constructor(private taskStoreService: TaskStoreService) {}

    public async addTask(task: Task): Promise<Task> { 
        task.completed = false;
        task.description = 'This is a task';
        task.owner = 'Nur Alam';
        task.duration = 2;
        return this.taskStoreService.addTask(task);
    }

    public async getTasks(): Promise<Task[]> {
        return this.taskStoreService.getTasks();
    }

    public async findTask(id: number): Promise<Task> {
        return this.taskStoreService.findTask(id);
    }
    
    public async deleteTask(id: number): Promise<Task[]> {
        return this.taskStoreService.deleteTask(id);
    }
    
    public async filterTaskById(filter): Promise<Task[]> {
        return this.taskStoreService.filterTaskById(filter);
    }
}
