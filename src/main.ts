import Vue from "vue";

import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/default.css';

import App from "./App";

Vue.use(require("vue-material/dist/components").MdCard)
Vue.use(require("vue-material/dist/components").MdIcon)
Vue.use(require("vue-material/dist/components").MdField)
Vue.use(require("vue-material/dist/components").MdTable)
Vue.use(require("vue-material/dist/components").MdRipple)
Vue.use(require("vue-material/dist/components").MdButton)
Vue.use(require("vue-material/dist/components").MdContent)
Vue.use(require("vue-material/dist/components").MdTabs)

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");

