import { Test, TestingModule } from '@nestjs/testing';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';

describe('TodoController', () => {
  let controller: TodoController;
  let service: TodoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodoController],
      providers: [TodoService],
    }).compile();

    controller = module.get<TodoController>(TodoController);
    service = module.get<TodoService>(TodoService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a todo', () => {
    const result = { id: 1, title: 'Test todo', done: false };
    jest.spyOn(service, 'create').mockImplementation(() => result);

    expect(controller.create({ title: 'Test todo' })).toBe(result);
  });

  it('should find all todos', () => {
    const result = [
      { id: 1, title: 'Test todo 1', done: false },
      { id: 2, title: 'Test todo 2', done: false },
    ];
    jest.spyOn(service, 'findAll').mockImplementation(() => result);

    expect(controller.findAll()).toBe(result);
  });

  it('should find one todo by id', () => {
    const result = { id: 1, title: 'Test todo', done: false };
    jest.spyOn(service, 'findOne').mockImplementation(() => result);

    expect(controller.findOne('1')).toBe(result);
  });

  it('should return undefined if todo is not found by id', () => {
    jest.spyOn(service, 'findOne').mockImplementation(() => undefined);

    expect(controller.findOne('999')).toBeUndefined();
  });

  it('should update a todo', () => {
    const result = { id: 1, title: 'Updated todo', done: true };
    jest.spyOn(service, 'update').mockImplementation(() => result);

    expect(controller.update('1', { title: 'Updated todo', done: true })).toBe(result);
  });

  it('should return undefined when trying to update a non-existing todo', () => {
    jest.spyOn(service, 'update').mockImplementation(() => undefined);

    expect(controller.update('999', { title: 'Non-existent', done: true })).toBeUndefined();
  });

  it('should remove a todo', () => {
    jest.spyOn(service, 'remove').mockImplementation(() => true);

    expect(controller.remove('1')).toBe(true);
  });

  it('should return false when trying to remove a non-existing todo', () => {
    jest.spyOn(service, 'remove').mockImplementation(() => false);

    expect(controller.remove('999')).toBe(false);
  });
});
