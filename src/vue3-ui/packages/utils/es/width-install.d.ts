import type { Plugin } from 'vue';
export declare type SFCWithInstall<T> = T & Plugin;
export declare const widthInstall: <T>(icon: T) => SFCWithInstall<T>;
