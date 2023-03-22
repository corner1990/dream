import Button from "./button.vue.js";
const withInstall = (comp) => {
  comp.install = (app) => {
    app.component(comp.name, comp);
  };
  return comp;
};
const DefaultButton = withInstall(Button);
export {
  DefaultButton,
  DefaultButton as default,
  withInstall
};
