import { openBlock, createElementBlock } from "vue";
import "./button.vue2.js";
import _export_sfc from "../_virtual/_plugin-vue_export-helper.js";
const _sfc_main = {
  name: "Button",
  setup() {
    return {};
  }
};
const _hoisted_1 = { class: "my-ui-btn" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1, " 测试按钮 ");
}
const Button = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-018eadd9"]]);
export {
  Button as default
};
