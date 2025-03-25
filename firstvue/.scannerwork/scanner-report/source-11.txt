import { createWebHashHistory, createRouter } from "vue-router";

import Todo from "./components/Todo.vue";
import Home from "./views/Home.vue";
import About from "./components/About.vue";
import Counter from "./components/Count.vue"


const routes = [
    {
        name: 'home',
        path: '/',
        component: Home
    },
    {
        name: 'TodoList',
        path: '/todo',
        component: Todo
    },
    {
        name:'About',
        path:'/about',
        component:About
    },
    {
        name:'incre',
        path:'/inc',
        component:Counter
    },
    
    
];

const router=createRouter({
    history:createWebHashHistory(),
    routes
})

export default router;