"use strict";
const vue = require("vue");
require("./button.vue2.js");
const _pluginVue_exportHelper = require("../_virtual/_plugin-vue_export-helper.js");
const _sfc_main = {
  name: "Button",
  setup() {
    return {};
  }
};
const _hoisted_1 = { class: "my-ui-btn" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createElementBlock("div", _hoisted_1, " 测试按钮 ");
}
const Button = /* @__PURE__ */ _pluginVue_exportHelper(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-018eadd9"]]);
module.exports = Button;
