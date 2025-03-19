<script setup>
import { ref, onMounted } from 'vue';
import { fetchTasks, addTask, updateTask, deleteTask } from '@/api.js';

const todos = ref([]);
const input_content = ref('');
const editingTaskId = ref(null);
const editingContent = ref('');
const contentError = ref('');
const showPopup = ref(false);


onMounted(async () => {
	todos.value = await fetchTasks();
});

const showError=(type, message)=>{
	if(type=='content'){
		contentError.value=message;
	}
	showPopup.value =true;
	setTimeout(() => {
		contentError.value=""
		showPopup.value=false;
	}, 4000);
}
const addTodo = async () => {
	contentError.value = '';
	const textOnlyRegex =/^[A-Za-z\s\W]+$/;
	if (!input_content.value.trim()) {
		showError('content', 'Task name cannot be empty.');
		return;
	}
	if (!textOnlyRegex.test(input_content.value.trim())) {
		showError('content', 'Task name must contain only letters and spaces.');
		return;
	}
	
	const newTask = {
		content: input_content.value,
		done: false,
		createdAt: new Date().toISOString(),
	};

	const response = await addTask(newTask);
	if (response && response.id) {
		todos.value.push({ id: response.id, ...newTask });
	}

	input_content.value = '';
	contentError.value = '';
	
};

const editTodo = (task) => {
	editingTaskId.value = task.id;
	editingContent.value = task.content;
};

const saveTodo = async (task) => {
	if (!editingContent.value.trim()) return;

	await updateTask(task.id, { content: editingContent.value });

	const index = todos.value.findIndex((t) => t.id === task.id);
	if (index !== -1) {
		todos.value[index].content = editingContent.value;
	}

	editingTaskId.value = null;
	editingContent.value = '';
};

const removeTodo = async (task) => {
	await deleteTask(task.id);
	todos.value = todos.value.filter((t) => t.id !== task.id);
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
			<div v-for="todo in todos" :key="todo.id" :class="{ 'todo-item': true, 'done': todo.done }">
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
