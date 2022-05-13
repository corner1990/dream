"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.widthInstall = void 0;
const widthInstall = (icon) => {
    icon.install = function (app) {
        app.component(icon.name, icon);
    };
    return icon;
};
exports.widthInstall = widthInstall;
