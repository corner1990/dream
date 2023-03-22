declare module '*.vue' {
    import type { DefineComponent } from 'vue';
    const VueComponent: DefineComponent<{}, {}, any>;
    export default VueComponent;
}

declare module 'my-learn-vite-ui';