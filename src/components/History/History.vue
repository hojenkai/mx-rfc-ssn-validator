<template>
  <div>
    <md-list class="md-double-line md-dense">
      <md-subheader>Capturas</md-subheader>
      <div v-for="(record, index) in records">
        <md-list-item>
          <md-icon class="md-primary">person</md-icon>
          <div class="md-list-item-text">
            <span>{{record.rfc}}</span>
            <span>RFC</span>
          </div>
          <md-button
            class="md-icon-button md-list-action"
            @click="copyRFC(index)"
            title="Copiar"
          >
            <md-icon>content_copy</md-icon>
          </md-button>
        </md-list-item>

        <md-list-item>
          <md-icon class="md-primary"></md-icon>
          <div class="md-list-item-text">
            <span>{{record.ssn}}</span>
            <span>NSS</span>
          </div>
          <md-button
            class="md-icon-button md-list-action"
            @click="copySSN(index)"
            title="Copiar"
          >
            <md-icon>content_copy</md-icon>
          </md-button>
        </md-list-item>

        <md-divider></md-divider>
      </div>
    </md-list>
  </div>
</template>
<style src="./History.css" scoped></style>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Record } from "../../services/Record";

@Component
export default class History extends Vue {
  @Prop()
  private records!: Record[];

  copyRFC(index: number) {
    this.copy(this.records[index].rfc);
  }
  copySSN(index: number) {
    this.copy(this.records[index].ssn);
  }

  copy(value: string) {
    let tmpInput = document.createElement("textarea") as HTMLTextAreaElement;
    tmpInput.style.top = "0";
    tmpInput.style.left = "0";
    tmpInput.style.position = "fixed";
    document.body.appendChild(tmpInput);
    tmpInput.value = value;
    tmpInput.focus();
    tmpInput.select();
    tmpInput.setSelectionRange(0, 99999);
    document.execCommand("copy");
    document.body.removeChild(tmpInput);
    this.$toasted.show("Copiado", {
      position: "bottom-center",
      duration: 1000
    });
  }
}
</script>
