

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import App from '@/App.vue';
import { fetchTasks, addTask, updateTask, deleteTask } from '@/api.js';


vi.mock('@/api.js', () => ({
  fetchTasks: vi.fn(() => Promise.resolve([])),
  addTask: vi.fn((task) => Promise.resolve({ id: '123', ...task })),
  updateTask: vi.fn(() => Promise.resolve()),
  deleteTask: vi.fn(() => Promise.resolve())
}));

describe('Todo App', () => {
  let wrapper;

  beforeEach(async () => {
    wrapper = mount(App);
    await wrapper.vm.$nextTick(); 
  });

  
  it('renders the component', () => {
    expect(wrapper.find('h2').text()).toBe('CREATE A TASK');
  });

  
  it('fetches tasks on mount', async () => {
    expect(fetchTasks).toHaveBeenCalled();
  });

  it('adds a task when input is valid', async () => {
    const input = wrapper.find('input.inputcontent');
    await input.setValue('New Task');
    
    await wrapper.find('form').trigger('submit.prevent');
    
    expect(addTask).toHaveBeenCalled();
    expect(wrapper.vm.todos).toHaveLength(1);
    expect(wrapper.vm.todos[0].content).toBe('New Task');
  });

  it('does not add a task if input is empty', async () => {
    await wrapper.find('form').trigger('submit.prevent');

    expect(wrapper.vm.todos).toHaveLength(0);
    expect(wrapper.vm.contentError).toBe('Task name cannot be empty.');
  });

  it('does not add a task if input contains numbers', async () => {
    const input = wrapper.find('input.inputcontent');
    await input.setValue('Task 123');

    await wrapper.find('form').trigger('submit.prevent');

    expect(wrapper.vm.todos).toHaveLength(0);
    expect(wrapper.vm.contentError).toBe('Task name must contain only letters and spaces.');
  });

  it('edits a task', async () => {
    wrapper.vm.todos = [{ id: '1', content: 'Old Task', done: false }];
    await wrapper.vm.$nextTick();

    await wrapper.find('.edit').trigger('click');

    const editInput = wrapper.find('.todo-content input');
    await editInput.setValue('Updated Task');
    await wrapper.find('.save').trigger('click');

    expect(updateTask).toHaveBeenCalled();
    expect(wrapper.vm.todos[0].content).toBe('Updated Task');
  });

  it('deletes a task', async () => {
    wrapper.vm.todos = [{ id: '1', content: 'Task to Delete', done: false }];
    await wrapper.vm.$nextTick();

    await wrapper.find('.delete').trigger('click');

    expect(deleteTask).toHaveBeenCalled();
    expect(wrapper.vm.todos).toHaveLength(0);
  });

  it('shows validation error when adding an empty task', async () => {
    await wrapper.find('form').trigger('submit.prevent');

    const errorPopup = wrapper.find('.error-popup');
    expect(errorPopup.exists()).toBe(true);
    expect(errorPopup.text()).toBe('Task name cannot be empty.');
  });
});
