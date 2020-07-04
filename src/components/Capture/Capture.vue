<template>
<div id="capture">
  <form novalidate @submit.prevent="validate">
    <md-card>
      <md-card-header>
        <div class="md-title">Validar NSS y RFC</div>
      </md-card-header>

      <md-card-content>
        <md-field :class="getValidationClass('rfc')">
          <label for="rfc">RFC</label>
          <md-input name="rfc" id="rfc" v-model="form.rfc" autocomplete="off"/>
          <span class="md-error" v-if="!$v.form.rfc.required">RFC es requerido</span>
          <span class="md-error" v-else-if="!$v.form.rfc.mustBeRfc">RFC invalido</span>
        </md-field>

        <md-field :class="getValidationClass('nss')">
          <label for="nss">NSS</label>
          <md-input name="number" id="nss" v-model="form.nss" autocomplete="off"/>
          <span class="md-error" v-if="!$v.form.nss.required">NSS es requerido</span>
          <span class="md-error" v-else-if="!$v.form.nss.minlength">NSS invalido</span>
          <span v-if="!$v.form.nss.$invalid">Año de nacimiento calculado: {{getYoB()}}</span>
        </md-field>

        <div class="actions-container">
          <md-button
            class="md-raised md-primary"
            @click="addHistoryItem()"
            :disabled="this.$v.$invalid"
          >
            Registrar
          </md-button>
        </div>

        <div class="history-container" v-show="records.length > 0">
          <History :records="records"/>
        </div>
      </md-card-content>
    </md-card>
  </form>
</div>
</template>
<style src="./Capture.css"></style>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { validationMixin } from 'vuelidate'
import {
  required,
  minLength,
  maxLength,
  helpers,
} from 'vuelidate/lib/validators'

import { Record } from "../../services/Record";
import History from "../../components/History/History.vue";

interface Form {
  rfc: string;
  nss: string;
}

const rfcRegEx = new RegExp("^([A-ZÑ\x26]{3,4}([0-9]{2})(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])([A-Z]|[0-9]){2}([A]|[0-9]){1})?$");
const nssRegEx = new RegExp("^(\\d{2})(\\d{2})(\\d{2})\\d{5}$");
const rfcValidator = helpers.regex('rfc', rfcRegEx);
const nssValidator = helpers.regex('nss', nssRegEx);

@Component({
  mixins: [validationMixin],
  components: {
    History
  },
  validations: {
    form: {
      rfc: {
        required: required,
        mustBeRfc: rfcValidator,
      },
      nss: {
        required: required,
        mustBeNSS: nssValidator,
        minlength: minLength(11),
        maxLength: maxLength(11),
      }
    }
  }
})
export default class Capture extends Vue {
  private records: Record[] = [];
  private form: Form = {
    rfc: "",
    nss: ""
  };
  private yob: number = 0;

  getYoB() {
    const nssMatchResult = this.form.nss.match(nssRegEx);
    const yob = nssMatchResult && nssMatchResult[3];
    let year = yob ? parseInt(yob, 10) : -1;
    if (year > -1) {
      if ( year >= 0 && year <= 20) {
        return parseInt("20"+(year < 10 ? "0"+year : year), 10);
      }
    }
    return parseInt("19"+year, 10);
  }

  getIcon() {
    return this.$v.$invalid ? "down" : "up";
  }

  getValidationClass(field: string) {
    let invalid = false;
    if (field === "rfc") {
      invalid = (this.$v.form?.rfc?.$invalid || !this.$v.form?.rfc?.mustBeRfc) && this.$v.form?.rfc?.$dirty || false;
    } else if (field === "nss") {
      invalid =(this.$v.form?.nss?.$invalid || !this.$v.form?.nss?.mustBeNSS) && this.$v.form?.nss?.$dirty || false;
    }
    return {
      "md-invalid": invalid
    };
  }

  addHistoryItem() {
    this.$v.$touch();

    if ( this.$v.$invalid ) {
      return;
    }

    this.records.push({rfc: this.form.rfc, ssn: this.form.nss });
    this.form.rfc = "";
    this.form.nss = "";
    this.$v.$reset();
  }
}
</script>
