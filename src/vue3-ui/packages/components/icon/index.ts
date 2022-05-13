import Icon from './src/icon.vue';
import { widthInstall } from '@vue3-ui/utils/width-install'
// 配置注册方法 这么写不支持install 方法
// Icon.install = function(app: App) {
//     app.component(Icon.name, Icon);
// }
interface Componenttype {
    name: string
}

const  VIcon = widthInstall<Componenttype>(Icon);

export {
    VIcon
}
export default VIcon;