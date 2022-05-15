import { VIcon } from '@vue3-ui/components';
import type { App } from 'vue';


// 所有组件
const components = [
    VIcon
]
// 注册所哟组件
const install = (app: App) => {
    // 这里需要对组件和component 分别处理
    components.forEach((com) => {
        app.use(com);
    })
}
// 导出所有组件供按需引入
export * from '@vue3-ui/components';
// 全部引入
export default {
    install
}