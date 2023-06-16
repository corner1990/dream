import { createRouter, createWebHistory } from 'vue-router';

const Home  = () => import('../views/home.vue');
const About  = () => import('../views/about.vue');
const News  = () => import('../views/news.vue');

const routes = [
    {
        path: '',
        name: 'Home',
        component: Home
    },
    {
        path: '/about',
        name: 'About',
        component: About
    },
    {
        path: '/news',
        name: 'News',
        component: News
    }
];

const router = createRouter({
    routes,
    history: createWebHistory(),
})

export default router;