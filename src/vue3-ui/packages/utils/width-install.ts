import type { App, Plugin } from 'vue';

// 配置注册方法 这么写不支持install 方法
// Icon.install = function(app: App) {
//     app.component(Icon.name, Icon);
// }
interface Componenttype {
    name: string
}
export type SFCWithInstall<T> = T&Plugin;
export const widthInstall = <T>(icon: T) => {
    (icon as SFCWithInstall<T>).install = function(app: App) {
        app.component((icon as unknown as Componenttype).name, icon);
    }
    return  icon as SFCWithInstall<T>;
}
