export * from './src/index';
import * as components from './src/index';
import type { App, Plugin } from 'vue'


type CompKeyTypes = keyof typeof components;

export const install = (app: App) => {

    Object.keys(components).forEach((key) => {
        const comp = components[key as CompKeyTypes] as unknown as Plugin;
        if ((comp as any).install) {
            app.use(comp)
        }
    })

    // 挂载全部调用的组件 ru message， notification， modal等组件
    // app.config.globalProperties.$message = components.message;
}