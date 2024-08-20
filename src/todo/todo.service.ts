import { Injectable } from "@nestjs/common";

export interface Todo {
    id: number;
    title: string;
    done: boolean;
  }
  
  @Injectable()
  export class TodoService {
    private todos: Todo[] = [];
    private idCounter = 1;
  
    create(title: string): Todo {
      const newTodo: Todo = { id: this.idCounter++, title, done: false };
      this.todos.push(newTodo);
      return newTodo;
    }
  
    findAll(): Todo[] {
      return this.todos;
    }
  
    findOne(id: number): Todo | undefined {
      return this.todos.find(todo => todo.id === id);
    }
  
    update(id: number, title: string, done: boolean): Todo | undefined {
      const todo = this.findOne(id);
      if (todo) {
        todo.title = title;
        todo.done = done;
        return todo;
      }
      return undefined;
    }
  
    remove(id: number): boolean {
      const index = this.todos.findIndex(todo => todo.id === id);
      if (index !== -1) {
        this.todos.splice(index, 1);
        return true;
      }
      return false;
    }
  }
  