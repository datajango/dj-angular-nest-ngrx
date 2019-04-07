import { Controller, Get, Post, Param, Body, Delete, Put } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodosService } from './todos.service';
import { Todo } from './interfaces/todo.interface';
import { ErrorMsg } from '../common/ErrorMsg';
import { SuccessMsg } from '../common/SuccessMsg';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) { }

  @Post()
  async create(@Body() createTodoDto: CreateTodoDto): Promise<Todo | ErrorMsg> {
    return this.todosService.create(createTodoDto);
  }

  @Get()
  async findAll(): Promise<Todo[] | ErrorMsg> {
    return this.todosService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Todo | ErrorMsg> {
    return this.todosService.findById(id);
  }

  @Delete()
  async deleteAll(): Promise<SuccessMsg | ErrorMsg> {
    return this.todosService.deleteAll();
  }

  @Delete(':id')
  async findByIdAndDelete(@Param('id') id: string): Promise<SuccessMsg | ErrorMsg> {
    return this.todosService.findByIdAndDelete(id);
  }

  @Put(':id')
  async findByIdAndUpdate(@Param('id') id: string, @Body() data: UpdateTodoDto): Promise<Todo | ErrorMsg> {
    return this.todosService.findByIdAndUpdate(id, data);
  }
}

