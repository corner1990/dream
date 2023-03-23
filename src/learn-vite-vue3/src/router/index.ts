
import { createRouter , createWebHistory} from 'vue-router';
import  type { RouteRecordRaw } from 'vue-router'
const Home  = () => import('../views/home.vue');
const About  = () => import('../views/about.vue');
const News  = () => import('../views/news.vue');


export const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'home',
        component: Home,
    },
    {
        path: '/about',
        name: 'about',
        component: About,
    },
    {
        path: '/news',
        name: 'news',
        component: News,
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});


export default router;