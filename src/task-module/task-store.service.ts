import {Injectable, NotFoundException} from "@nestjs/common";
import {Task} from "./interface/task";

@Injectable()
export class TaskStoreService {
    public tasks: Task[] = [];
    
    public async addTask(task: Task): Promise<Task> {
        this.tasks.push(task);
        return Promise.resolve(task);
    }

    public async getTasks(): Promise<Task[]> {
        const tasks = this.tasks;
        if (!tasks) {
            throw new NotFoundException('No tasks found');
        }
        return Promise.resolve(tasks);
    }

    public async findTask(id: number): Promise<Task> {
        const task = this.tasks.find(task => task.id === id);
        if (!task) {
            throw new NotFoundException('Task not found');
        }
        return Promise.resolve(task);
    }

    public async deleteTask(id: number): Promise<Task[]> {
        const index = this.tasks.findIndex(task => task.id === id);
        if (index === -1) {
            throw new NotFoundException('Task not found. Check the id and try again');
        }
        this.tasks.splice(index, 1);
        return Promise.resolve(this.tasks);
    }
    
    public async filterTaskById(filter): Promise<Task[]> {
        if (!filter) {
            return Promise.resolve(this.tasks);
        }
        return Promise.resolve(this.tasks.filter((i:Task) => i.duration > 0));
    }
}