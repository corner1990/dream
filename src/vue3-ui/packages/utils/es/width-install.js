export const widthInstall = (icon) => {
    icon.install = function (app) {
        app.component(icon.name, icon);
    };
    return icon;
};
