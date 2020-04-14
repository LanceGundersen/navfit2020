<template>
  <v-dialog v-model="dialog"
            persistent
            max-width="75%">
    <v-card class="pa-4">
      <v-card-title>
        Add Eval/Fitrep
      </v-card-title>
      <v-form ref="form"
              v-model="valid">
        <v-card-text>
          <v-layout>
            <TheDatePickerComponent :label="'From Date'"
                                    @date-string="setFromDate"
                                    :rules="requiredRules"
                                    required />
            <TheDatePickerComponent :label="'To Date'"
                                    @date-string="setToDate"
                                    :rules="requiredRules"
                                    required />
          </v-layout>
          <v-layout>
            <v-select v-model="form.promotionStatus"
                      :items="promotionStatus"
                      class="pa-1"
                      label="Promotion Status"
                      :rules="requiredRules"
                      required>
              <template v-slot:selection="{ item }">
                <span>{{ item }}</span>
              </template>
            </v-select>
            <v-text-field v-model="form.billetSubcategory"
                          class="pa-1"
                          label="Billet Subcategory (if any)" />
          </v-layout>
          <v-row>
            <v-col cols="6">
              <v-checkbox v-model="form.periodic"
                          class="mr-2"
                          label="Periodic"
                          type="checkbox" />
              <v-checkbox v-model="form.detachmentOfIndividual"
                          class="mr-2"
                          label="Detachment of Individual"
                          type="checkbox" />
              <v-checkbox v-model="form.detachmentOfReportingSenior"
                          class="mr-2"
                          label="Detachment of Reporting Senior"
                          type="checkbox" />
              <v-checkbox v-model="form.special"
                          class="mr-2"
                          label="Special"
                          type="checkbox" />
            </v-col>
            <v-col cols="6">
              <v-checkbox v-model="form.notObserved"
                          class="mr-2"
                          label="Not Observed Report"
                          type="checkbox" />
              <v-checkbox v-model="form.regular"
                          class="mr-2"
                          label="Regular"
                          type="checkbox" />
              <v-checkbox v-model="form.concurrent"
                          class="mr-2"
                          label="Concurrent"
                          type="checkbox" />
              <v-checkbox v-model="form.opsCdr"
                          class="mr-2"
                          label="Ops Cdr"
                          type="checkbox" />
            </v-col>
          </v-row>
          <v-row>
            <v-expansion-panels>
              <v-expansion-panel v-for="(rating, index) in evalRating"
                                 :key="index">
                <v-expansion-panel-header>{{ rating.title }}</v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-row>
                    <v-col cols="5">
                      <v-radio-group row>
                        <v-radio label="Not Observed"
                                 value="nob" />
                        <v-radio label="1.0 | Below Standards"
                                 value="1.0" />
                        <v-radio label="2.0 | Progressing"
                                 value="2.0" />
                        <v-radio label="3.0 | Meets Standards"
                                 value="3.0" />
                        <v-radio label="4.0 | Above Standards"
                                 value="4.0" />
                        <v-radio label="5.0 | Greatly Exceeds Standards"
                                 value="5.0" />
                      </v-radio-group>
                    </v-col>
                    <v-col>
                      <v-textarea filled
                                  no-resize
                                  disabled>
                        <ul>
                          <li>Marginal Knowledge of rating, specialty or job.</li>
                          <li>Unable to apply knowledge to solve routine problems.</li>
                          <li>Fails to meet advancement/PQS requirements.</li>
                        </ul>
                      </v-textarea>
                    </v-col>
                  </v-row>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn text
                 @click="dialog = false">
            Cancel
          </v-btn>
          <v-btn color="primary"
                 :disabled="!valid"
                 @click="submit">
            Add Eval/Fitrep
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import Vue from "vue";
import { mapFields } from "vuex-map-fields";
import TheDatePickerComponent from "./shared/SharedDatePickerComponent";

export default Vue.extend({
  name: "TheAddEvalDialogComponent",
  components: {
    TheDatePickerComponent,
  },
  props: {
    value: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  data: () => ({
    valid: false,
    form: {
      promotionStatus: "",
      periodic: "",
      detachmentOfIndividual: "",
      detachmentOfReportingSenior: "",
      special: "",
      notObserved: "",
      regular: "",
      concurrent: "",
      opsCdr: "",
      physicalReadiness: "",
      billetSubcategory: "",
      date: {
        from: "",
        to: "",
      }
    },
    requiredRules: [
      v => !!v || "Is required",
    ],
  }),
  computed: {
    ...mapFields([
      "defaults.evalRating",
    ]),
    dialog: {
      get() {
        return this.value;
      },
      set(newValue) {
        this.$emit("input", newValue);
      },
    },
    promotionStatus: {
      get() {
        return this.$store.getters.promotionStatus || [];
      },
    },
    uuid() {
      return this.$router.currentRoute.params.uuid;
    },
    records() {
      return this.$store.getters.getRecordsById(this.uuid);
    }
  },
  methods: {
    submit() {
      this.$refs.form.validate();
      this.$store.dispatch("addRecord", { uuid: this.uuid, form: this.form });
      this.dialog = false;
      this.clear();
    },
    clear() {
      this.$refs.form.reset();
    },
    setFromDate(value) {
      this.form.date.from = value;
    },
    setToDate(value) {
      this.form.date.to = value;
    },
  },
});
</script>
