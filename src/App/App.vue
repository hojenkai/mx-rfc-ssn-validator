<template>
  <div id="app">
    <Capture/>
  </div>
</template>
<style src="./App.css"></style>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Capture from "../components/Capture/Capture.vue";

@Component({
  components: {
    Capture
  }
})
export default class App extends Vue {}
</script>
