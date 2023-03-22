"use strict";
Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: "Module" } });
const button = require("./button.vue.js");
const withInstall = (comp) => {
  comp.install = (app) => {
    app.component(comp.name, comp);
  };
  return comp;
};
const DefaultButton = withInstall(button);
exports.DefaultButton = DefaultButton;
exports.default = DefaultButton;
exports.withInstall = withInstall;
