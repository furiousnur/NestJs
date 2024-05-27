import {
    BadRequestException,
    Body, Controller, Delete,
    Get,
    HttpStatus,
    Param, ParseBoolPipe,
    ParseIntPipe,
    Post, Query, Res
} from '@nestjs/common'; 
import {TaskService} from "./task.service";
import {TaskDto} from "./dto/task.dto";
import {QueryParamDto, Task} from "./interface/task";
import {Response} from "express";

@Controller('tasks') // Base path for all routes in the controller
export class TaskController {
    constructor(private readonly taskService: TaskService) {}

    // HTTP GET request to /tasks
    @Get()
    async getTasks(): Promise<Task[]> {
        try {
            return this.taskService.getTasks();
        }catch (e) {
            throw new BadRequestException(e.message);
        }
    }

    @Get('/filter/data')
    async filterTaskById(@Query('filter') filter: ParseBoolPipe, @Res() res:Response){
        const data = await this.taskService.filterTaskById(filter);
        return res.status(HttpStatus.OK).json(data);
    }

    // HTTP GET request to /tasks/:id
    @Get(':id')
    async findTask(@Param('id', new ParseIntPipe({errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE})) id: number): Promise<Task>{
        try {
            return await this.taskService.findTask(id);
        }catch (e) {
            throw new BadRequestException(e.message);
        }
    }

    // HTTP POST request to /tasks
    @Post()
    async addTask(@Body() task: TaskDto): Promise<Task> {
        try {
            return await this.taskService.addTask(task);
        } catch (e) {
            throw new BadRequestException(e.message);
        }
    }

    // HTTP DELETE request to /tasks/:id
    @Delete(':id')
    async deleteTask(@Param('id', new ParseIntPipe({errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE})) id: number): Promise<Task[]> {
        try {
            return this.taskService.deleteTask(id);
        }catch (e) {
            throw new BadRequestException(e.message)
        }
    }
}
