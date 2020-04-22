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
                                    :rules="requiredRules"
                                    required
                                    @date-string="setFromDate" />
            <TheDatePickerComponent :label="'To Date'"
                                    :rules="requiredRules"
                                    required
                                    @date-string="setToDate" />
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
            <v-col>
              <h4>Occasion for Report</h4>
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
            <v-col>
              <h4>Type of Report</h4>
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
            <v-col>
              <h4>Promotion</h4>
              <v-select v-model="form.promotionRecommendation"
                        :items="promotionRecommendation"
                        class="pa-1"
                        label="Recommendation"
                        :rules="requiredRules"
                        required>
                <template v-slot:selection="{ item }">
                  <span>{{ item }}</span>
                </template>
              </v-select>
              <v-checkbox v-model="form.retention"
                          label="Retention"
                          class="pa-1" />
            </v-col>
          </v-row>
          <v-row>
            <h4 class="pl-2 pb-3">
              Performance Traits
            </h4>
            <v-expansion-panels tile
                                class="pa-2" >
              <v-expansion-panel v-for="(trait, index) in traits"
                                 :key="index">
                <v-expansion-panel-header>{{ trait.title }}</v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-row>
                    <v-col cols="4"
                           align-self="center">
                      <v-radio-group row
                                     dense>
                        <v-radio v-for="(standard, traitIndex) in trait.standards"
                                 :key="traitIndex"
                                 v-model="form.performanceTraits[trait.key]"
                                 :value="standard.value"
                                 :label="standard.label" />
                      </v-radio-group>
                    </v-col>
                    <v-divider vertical />
                    <v-col cols="auto"
                           align-self="center">
                      <p class="subtitle-2">
                        {{ trait.subtitle }}
                      </p>
                      <p>1.0 - Below standards/not progressing or UNSAT in any one standard;</p>
                      <p>2.0 - Does not yet meet all 3.0 standards;</p>
                      <p>3.0 - Meets all 3.0 standards;</p>
                      <p>4.0 - Exceeds most 3.0 standards;</p>
                      <p>5.0 - Meets overall criteria and most of the specific standards for 5.0.</p>
                      <p>Standards are not all inclusive.</p>
                    </v-col>
                  </v-row>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-row>
          <v-layout column>
            <h4>Comments on Performance.</h4>
            <v-layout>
              <v-subheader>
                *All 1.0 marks, three 2.0 marks, and 2.0 marks in Block 35 must be specifically substantiated in comments.
                Comments must be verifiable. Use upper and lower case.
              </v-subheader>
              <v-select dense
                        :items="fonts"
                        label="Font Size" />
            </v-layout>
            <v-textarea filled
                        counter />
          </v-layout>
          <v-layout column>
            <h4>Qualifications/Achievements</h4>
            <v-subheader>Education, awards, community involvement, etc., during this period.</v-subheader>
            <v-textarea filled
                        counter />
          </v-layout>
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
    fonts: ["10 Point", "12 Point"],
    promotionRecommendation: [
      "NOB",
      "Significant Problems",
      "Progressing",
      "Promotable",
      "Must Promote",
      "Early Promote"
    ],
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
      },
      performanceTraits: {
        professionalKnowledge: "",
        qualityOfWork: "",
        commandClimate: "",
        militaryBearing: "",
        personalInitiative: "",
        teamwork: "",
        leadership: "",
      },
      promotionRecommendation: "",
      retention: false,
    },
    requiredRules: [
      v => !!v || "Is required",
    ],
  }),
  computed: {
    dialog: {
      get() {
        return this.value;
      },
      set(newValue) {
        this.$emit("input", newValue);
      },
    },
    traits() {
      return this.$store.getters.traits;
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
      console.log({ form: this.form });
      // this.$store.dispatch("addRecord", { uuid: this.uuid, form: this.form });
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
