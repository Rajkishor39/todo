import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import TodoApp from '@/components/Todo.vue';
import { useTodoStore } from '@/stores/todoStore';

vi.mock('@/stores/todoStore', () => {
  return {
    useTodoStore: vi.fn(() => ({
      todos: [],
      loadTodos: vi.fn(),
      addTodo: vi.fn(async (content) => {
        return { id: '123', content, done: false };
      }),
      updateTodo: vi.fn(async () => {}),
      removeTodo: vi.fn(async () => {}),
    }))
  };
});

describe('TodoApp.vue', () => {
  let wrapper;
  let todoStore;

  beforeEach(() => {
    todoStore = useTodoStore();
    wrapper = mount(TodoApp);
  });

  it('renders the component', () => {
    expect(wrapper.find('h2').text()).toBe('CREATE A TASK');
  });

  it('does not add a task if input is empty', async () => {
    await wrapper.find('form').trigger('submit.prevent');
    expect(wrapper.find('.error-popup').exists()).toBe(true);
    expect(wrapper.find('.error-popup').text()).toBe('Task name cannot be empty.');
  });

  it('does not add a task if input contains numbers', async () => {
    const input = wrapper.find('input.inputcontent');
    await input.setValue('Task 123');
    await wrapper.find('form').trigger('submit.prevent');
    expect(wrapper.find('.error-popup').exists()).toBe(true);
    expect(wrapper.find('.error-popup').text()).toBe('Task name must contain only letters and spaces.');
  });

});