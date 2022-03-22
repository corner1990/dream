// 所有组件的入口
// import { VueElement } from 'vue';
import { App } from 'vue';
import Button from './Button/button-com.vue'
import Icon from './Icon/index-com.vue';

// 注册组件
const install = (app: App) => {
    app.component(Button.name, Button);
    app.component(Icon.name, Icon)
}

// 标签引入的时候自动调用
if( typeof window.Vue !== 'undefined' ) {
    install(window.Vue)
}
// 导出函数 给外部使用
export default { install };