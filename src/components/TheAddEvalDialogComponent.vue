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
            <v-col cols="4">
              <h4>Occasion for Report</h4>
              <v-checkbox v-model="form.periodic"
                          class="mr-2"
                          label="Periodic"
                          type="checkbox" />
              <v-checkbox :value="form.detachmentOfIndividual"
                          class="mr-2"
                          label="Detachment of Individual"
                          type="checkbox" />
              <v-checkbox :value="form.detachmentOfReportingSenior"
                          class="mr-2"
                          label="Detachment of Reporting Senior"
                          type="checkbox" />
              <v-checkbox :value="form.special"
                          class="mr-2"
                          label="Special"
                          type="checkbox" />
            </v-col>
            <v-col cols="4">
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
            <v-col cols="4">
              <h4>Promotion</h4>
              <v-select v-model="form.promotionStatus"
                        :items="promotionStatus"
                        class="pa-1"
                        label="Status"
                        :rules="requiredRules"
                        required>
                <template v-slot:selection="{ item }">
                  <span>{{ item }}</span>
                </template>
              </v-select>
              <v-text-field v-model="form.billetSubcategory"
                            class="pa-1"
                            label="Billet Subcategory (if any)" />
              <v-select v-model="form.promotionRecommendation"
                        :items="promotionRecommendations"
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
          </v-layout>
          <h4>Performance Traits</h4>
          <v-layout column>
            <v-select v-model="form.performanceTraits.professionalKnowledge"
                      :items="traits.professionalKnowledge.standards"
                      :label="traits.professionalKnowledge.title"
                      item-text="label"
                      :rules="requiredRules"
                      required />
            <v-select v-model="form.performanceTraits.qualityOfWork"
                      :items="traits.qualityOfWork.standards"
                      :label="traits.qualityOfWork.title"
                      item-text="label"
                      :rules="requiredRules"
                      required />
            <v-select v-model="form.performanceTraits.commandClimate"
                      :items="traits.commandClimate.standards"
                      :label="traits.commandClimate.title"
                      item-text="label"
                      :rules="requiredRules"
                      required />
            <v-select v-model="form.performanceTraits.militaryBearing"
                      :items="traits.militaryBearing.standards"
                      :label="traits.militaryBearing.title"
                      item-text="label"
                      :rules="requiredRules"
                      required />
            <v-select v-model="form.performanceTraits.personalInitiative"
                      :items="traits.personalInitiative.standards"
                      :label="traits.personalInitiative.title"
                      item-text="label"
                      :rules="requiredRules"
                      required />
            <v-select v-model="form.performanceTraits.teamwork"
                      :items="traits.teamwork.standards"
                      :label="traits.teamwork.title"
                      item-text="label"
                      :rules="requiredRules"
                      required />
            <v-select v-model="form.performanceTraits.leadership"
                      :items="traits.leadership.standards"
                      :label="traits.leadership.title"
                      item-text="label"
                      :rules="requiredRules"
                      required />
          </v-layout>
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
    form: {
      promotionStatus: null,
      periodic: null,
      detachmentOfIndividual: null,
      detachmentOfReportingSenior: null,
      special: null,
      notObserved: null,
      regular: null,
      concurrent: null,
      opsCdr: null,
      physicalReadiness: null,
      billetSubcategory: null,
      date: {
        from: null,
        to: null,
      },
      performanceTraits: {
        professionalKnowledge: null,
        qualityOfWork: null,
        commandClimate: null,
        militaryBearing: null,
        personalInitiative: null,
        teamwork: null,
        leadership: null,
      },
      promotionRecommendation: null,
      retention: null,
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
    traits: {
      get() {
        return this.$store.getters.traits;
      }
    },
    promotionRecommendations: {
      get() {
        return this.$store.getters.promotionRecommendations || [];
      }
    },
    fonts: {
      get() {
        return this.$store.getters.fonts || [];
      }
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
      this.$store.dispatch("addRecord", {
        uuid: this.uuid,
        form: this.form
      }).then(() => {
        this.dialog = false;
        this.clear();
      });
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
