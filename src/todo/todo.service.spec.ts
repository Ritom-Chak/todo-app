import { Test, TestingModule } from '@nestjs/testing';
import { TodoService } from './todo.service';

describe('TodoService', () => {
  let service: TodoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TodoService],
    }).compile();

    service = module.get<TodoService>(TodoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a todo', () => {
    const title = 'Test todo';
    const todo = service.create(title);
    expect(todo).toBeDefined();
    expect(todo.title).toBe(title);
    expect(todo.done).toBe(false);
  });

  it('should find all todos', () => {
    service.create('Test todo 1');
    service.create('Test todo 2');
    const todos = service.findAll();
    expect(todos.length).toBe(2);
  });

  it('should find one todo by id', () => {
    const todo = service.create('Test todo');
    const foundTodo = service.findOne(todo.id);
    expect(foundTodo).toBeDefined();
    expect(foundTodo.id).toBe(todo.id);
  });

  it('should return undefined if todo is not found by id', () => {
    const foundTodo = service.findOne(999);
    expect(foundTodo).toBeUndefined();
  });

  it('should update a todo', () => {
    const todo = service.create('Test todo');
    const updatedTodo = service.update(todo.id, 'Updated title', true);
    expect(updatedTodo).toBeDefined();
    expect(updatedTodo.title).toBe('Updated title');
    expect(updatedTodo.done).toBe(true);
  });

  it('should return undefined when trying to update a non-existing todo', () => {
    const updatedTodo = service.update(999, 'Non-existent', true);
    expect(updatedTodo).toBeUndefined();
  });

  it('should remove a todo', () => {
    const todo = service.create('Test todo');
    const removed = service.remove(todo.id);
    expect(removed).toBe(true);
    expect(service.findOne(todo.id)).toBeUndefined();
  });

  it('should return false when trying to remove a non-existing todo', () => {
    const removed = service.remove(999);
    expect(removed).toBe(false);
  });
});
