import { defineStore } from 'pinia';
import { fetchTasks, addTask, updateTask, deleteTask } from '../api.js';
import { ref, computed } from 'vue';

export const useTodoStore = defineStore('todoStore', () => {
   
    const todos = ref([]);
    const totalTodos = computed(() => todos.value.length);
    
    const loadTodos = async () => {
        todos.value = await fetchTasks();
    };

    const addTodo = async (taskContent) => {
        if (!taskContent.trim()) return;
        const newTask = {
            content: taskContent,
            done: false,
            createdAt: new Date().toISOString(),
        };
        const response = await addTask(newTask);
        if (response && response.id) {
            todos.value.push({ id: response.id, ...newTask });
        }
    };

    const updateTodo = async (taskId, newContent) => {
        if (!newContent.trim()) return;
        await updateTask(taskId, { content: newContent });
        const index = todos.value.findIndex((t) => t.id === taskId);
        if (index !== -1) {
            todos.value[index].content = newContent;
        }
    };

    const removeTodo = async (taskId) => {
        await deleteTask(taskId);
        todos.value = todos.value.filter((t) => t.id !== taskId);
    };

    return {
        todos,
        totalTodos,
        loadTodos,
        addTodo,
        updateTodo,
        removeTodo
    };
});
