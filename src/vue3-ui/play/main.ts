import { createApp } from 'vue';
import App from './app.vue';
import { VIcon } from '@vue3-ui/components/icon';
import '@vue3-ui/theme-chalk/src/index.scss'

const app = createApp(App)
// 全局倒入
app.use(VIcon);
app.mount('#app')