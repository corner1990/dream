export default {}
import './main.css';
import Vue from 'vue';
import App from './App.vue';

new Vue({
    render(h) {
        return h(App)
    },
}).$mount('#app')

// const name: string = 'rollup';
// const age: number = 12;
// console.log(name, age)
