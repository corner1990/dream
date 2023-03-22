interface ComponentName {
    name: string;
}
export declare const withInstall: <T>(comp: T & ComponentName) => T & ComponentName;
export declare const DefaultButton: {
    name: string;
    setup(): {};
} & ComponentName;
export default DefaultButton;
