<script setup>
import { ref, onMounted } from 'vue';
import { useTodoStore } from '../stores/todoStore';

const todoStore = useTodoStore();  
const input_content = ref('');
const editingTaskId = ref(null);
const editingContent = ref('');
const contentError = ref('');
const showPopup = ref(false);


onMounted(() => {
    todoStore.loadTodos();
});

const showError = (type, message) => {
    if (type == 'content') {
        contentError.value = message;
    }
    showPopup.value = true;
    setTimeout(() => {
        contentError.value = "";
        showPopup.value = false;
    }, 4000);
};

const addTodo = async () => {
    contentError.value = '';
    const textOnlyRegex = /^[A-Za-z\s\W]+$/;
    if (!input_content.value.trim()) {
        showError('content', 'Task name cannot be empty.');
        return;
    }
    if (!textOnlyRegex.test(input_content.value.trim())) {
        showError('content', 'Task name must contain only letters and spaces.');
        return;
    }
    await todoStore.addTodo(input_content.value);
    input_content.value = '';
};
const editTodo = (task) => {
    editingTaskId.value = task.id;
    editingContent.value = task.content;
};

const saveTodo = async (task) => {
    if (!editingContent.value.trim()) return;
    await todoStore.updateTodo(task.id, editingContent.value);
    editingTaskId.value = null;
    editingContent.value = '';
};

const removeTodo = async (task) => {
    await todoStore.removeTodo(task.id);
};
</script>

<template>
    <main class="app">
        <section class="create-todo">
            <h2>CREATE A TASK</h2>
            <form id="new-todo-form" @submit.prevent="addTodo">
                <input type="text" v-model="input_content" placeholder="Task name" class="inputcontent" />
                <div v-if="showPopup && contentError" class="error-popup">
                    {{ contentError }}
                </div>
                <button class="add-button" type="submit">Add Task</button>
            </form>
            
            <div v-for="todo in todoStore.todos" :key="todo.id" :class="{ 'todo-item': true, 'done': todo.done }">
                <div v-if="editingTaskId === todo.id" class="todo-content">
                    <input type="text" v-model="editingContent" />
                    <div class="todo-buttons">
                        <button @click="saveTodo(todo)" class="save">Save</button>
                        <button @click="editingTaskId = null" class="cancel">Cancel</button>
                    </div>
                </div>
                <div v-else class="todo-content">
                    <div class="todo-text">{{ todo.content }}</div>
                    <div class="todo-buttons">
                        <button @click="editTodo(todo)" class="edit">Edit</button>
                        <button @click="removeTodo(todo)" class="delete">Delete</button>
                    </div>
                </div>
            </div>
        </section>
    </main>
</template>

<style>
* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
	font-family: 'montserrat', sans-serif;
}
body {
    background-color: #c8e200; 
}
.app {
	max-width: 600px;
	margin: 30px auto;
	font-family: Arial, sans-serif;
}
.inputcontent{
	flex: 1;
	padding: 8px;
	border: 1px solid #ccc;
	border-radius: 5px;
	font-size: 16px;
	width: 80%;
}
.create-todo {
	background: #65f0a3;
	padding: 20px;
	border-radius: 10px;
	margin-bottom: 20px;
}

.create-todo h2 {
	margin-bottom: 30px;
	display: flex;
	justify-content: center;

}

#new-todo-form {
	display: flex;
	flex-direction: column;
	align-items: center;
}

.add-button {
	margin: 20px;
	border-radius: 5px;
	cursor: pointer;
	padding: 8px 12px;
	font-weight: 600;
	background-color: #4CAF50;
	border-color: #ceaeae;
}	
.todo-list {
	background: #a0fac8;
	padding: 20px;
	border-radius: 10px;
}
.todo-list h2 {
	text-align: center;
	margin-bottom: 20px;
	font-size: 24px;
	color: #333;
}
.todo-item {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 10px;
	border-bottom: 1px solid #cec4c4;
	border-radius: 5px;
	margin-bottom: 10px;
	font-weight: 600;
}

.todo-item.done {
	text-decoration: line-through;
	opacity: 0.6;
}
.todo-content {
	display: flex;
	width: 100%;
	align-items: center;
	gap: 10px;
}
.todo-content input {
	flex: 1;
	padding: 8px;
	border: 1px solid #ccc;
	border-radius: 5px;
	font-size: 16px;
}

.todo-text {
	flex: 1;
	font-size: 18px;
	color: #333;
}

.todo-buttons {
	display: flex;
	gap: 10px;
}
.todo-buttons button {
	padding: 8px 12px;
	border: none;
	border-radius: 5px;
	cursor: pointer;
	font-weight: 600;
	white-space: nowrap;
}
.save{
	background-color:#4CAF50
}
.cancel{
	background-color:#f39c12
}
.edit{
	background-color: #2ccfec;
}
.delete{
	background-color:#f5756c
}
.error-popup {
	position: fixed;
	top: 10px;
	left: 50%;
	transform: translateX(-50%);
	background-color: rgba(255, 0, 0, 0.9);
	color: white;
	padding: 10px 20px;
	border-radius: 5px;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
	animation: fadeInOut 3s ease-in-out;
	font-weight: bold;
}
@keyframes fadeInOut {
	0% { opacity: 0; transform: translateY(-10px); }
	10% { opacity: 1; transform: translateY(0); }
	90% { opacity: 1; transform: translateY(0); }
	100% { opacity: 0; transform: translateY(-10px); }
}


</style>