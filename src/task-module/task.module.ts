import {Module} from '@nestjs/common';
import {TaskController} from "./task.controller";
import {TaskService} from "./task.service";
import {TaskStoreService} from "./task-store.service"; 

@Module({
    controllers: [TaskController],
    providers: [TaskService, TaskStoreService], 
    exports: [TaskService],
})
export class TaskModule{}
