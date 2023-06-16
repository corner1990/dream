import { createApp } from 'vue';
import App from './app.vue';
import router from './router';

const app = createApp(App);

app.use(router)
console.log('hello parcel')

app.mount('#app')