import { createApp } from 'vue';
import { createPinia } from 'pinia';
import Vuex from 'vuex'
import App from './App.vue';
import router from './routs';
import './assets/main.css'

const app = createApp(App);
const pinia = createPinia();
app.use(Vuex)

app.use(pinia); 
app.use(router); 
app.config.devtools = false;
app.mount('#app');
