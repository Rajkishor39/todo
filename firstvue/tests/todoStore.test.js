import { describe, it, expect, beforeEach, vi } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useTodoStore } from '../src/stores/todoStore.js';
import { fetchTasks, addTask, updateTask, deleteTask } from '../src/api.js';

vi.mock('../src/api.js', ()=>({
   fetchTasks:vi.fn(),
   addTask:vi.fn(),
   deleteTask:vi.fn(),
   updateTask:vi.fn()
}));
describe('Todo Store', () => {
  let store;
  beforeEach(() => {
    setActivePinia(createPinia());
    store = useTodoStore();
  });

  it('inilitize the empty list', () => {
    expect(store.todos).toEqual([]);
    expect(store.totalTodos).toBe(0);
  });

  it('load the todo api', async () => {
    fetchTasks.mockResolvedValue([{ id: 1, content: 'Test Task', done: false }]);

    await store.loadTodos();
    expect(store.todos).toHaveLength(1);
    expect(store.todos[0].content).toBe('Test Task');
  });

  it('add the new todo', async () => {
    const newTask = { id: 2, content: 'New Task', done: false };
    addTask.mockResolvedValue({ id: 2 });
    await store.addTodo('New Task');
    expect(store.todos).toHaveLength(1);
    expect(store.todos[0]).toMatchObject(newTask);
  });

  it('update todo', async () => {
    store.todos = [{ id: 3, content: 'Old Content', done: false }];
    updateTask.mockResolvedValue();
    await store.updateTodo(3, 'Updated Content');
    expect(store.todos[0].content).toBe('Updated Content');
  });

  it('remove todo', async () => {
    store.todos = [{ id: 4, content: 'Delete Me', done: false }];
    deleteTask.mockResolvedValue();
    await store.removeTodo(4);
    expect(store.todos).toHaveLength(0);
  });
});
