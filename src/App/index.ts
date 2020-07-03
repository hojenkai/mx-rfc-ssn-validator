import { Component, Vue } from "vue-property-decorator";

import template from "./App.vue";
import Capture from "../components/Capture/Capture.vue";

@Component({
  mixins: [template],
  components: {
    Capture
  }
})
export default class App extends Vue {}
