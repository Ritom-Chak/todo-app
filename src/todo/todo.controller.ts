import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { TodoService, Todo } from './todo.service';  // Import Todo from the service

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  create(@Body() createTodoDto: { title: string }): Todo {
    return this.todoService.create(createTodoDto.title);
  }

  @Get()
  findAll(): Todo[] {
    return this.todoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Todo | undefined {
    return this.todoService.findOne(Number(id));
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTodoDto: { title: string; done: boolean },
  ): Todo | undefined {
    return this.todoService.update(Number(id), updateTodoDto.title, updateTodoDto.done);
  }

  @Delete(':id')
  remove(@Param('id') id: string): boolean {
    return this.todoService.remove(Number(id));
  }
}
