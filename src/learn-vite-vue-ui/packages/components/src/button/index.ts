import Button from './button.vue';
// import { withInstall } from '@my-learn-vite-ui/utils'
import type { App, Plugin } from 'vue';
interface ComponentName {
    name: string;
}
type SFCWithInstall<T> = T&Plugin;


export const withInstall = <T>(comp: T & ComponentName) => {
    (comp as SFCWithInstall<T>).install = (app: App) => {
        // 注册组件
        app.component(comp.name, comp)
    }
    return comp;
}


export const DefaultButton = withInstall(Button);

export default DefaultButton;