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
              <v-select v-model="form.reportOccasion"
                        :items="reportOccasions"
                        label="Occasion for Report"
                        item-text="label"
                        :rules="requiredRules"
                        required />
              <v-layout>
                <v-select v-model="form.reportType"
                          :items="reportTypes"
                          label="Type of Report"
                          item-text="label"
                          :rules="requiredRules"
                          required />
                <v-checkbox v-model="form.notObserved"
                            dense
                            label="NOB"
                            type="checkbox" />
              </v-layout>
              <v-checkbox v-model="form.retention"
                          dense
                          label="Recommended for Retention" />
            </v-col>
            <v-col cols="4">
              <v-select v-model="form.promotionStatus"
                        :items="promotionStatus"
                        label="Promotion Status"
                        :rules="requiredRules"
                        required>
                <template v-slot:selection="{ item }">
                  <span>{{ item }}</span>
                </template>
              </v-select>
              <v-text-field v-model="form.billetSubcategory"
                            label="Billet Subcategory (if any)" />
            </v-col>
            <v-col cols="4">
              <v-select v-model="form.promotionRecommendation"
                        :items="promotionRecommendations"
                        label="Recommendation"
                        :rules="requiredRules"
                        required>
                <template v-slot:selection="{ item }">
                  <span>{{ item }}</span>
                </template>
              </v-select>
              <v-select v-model="form.physicalReadiness"
                        :items="physicalReadiness"
                        label="Physical Readiness"
                        :rules="requiredRules"
                        required>
                <template v-slot:selection="{ item }">
                  <span>{{ item }}</span>
                </template>
              </v-select>
            </v-col>
          </v-layout>
          <h4>Performance Traits</h4>
          <v-layout>
            <v-col cols="6">
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
            </v-col>
            <v-col cols="6">
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
            </v-col>
          </v-layout>
          <h4>Comments on Performance.</h4>
          <v-layout>
            <v-subheader>
              *All 1.0 marks, three 2.0 marks, and 2.0 marks in Block 35 must be specifically substantiated in comments.
              Comments must be verifiable. Use upper and lower case.
            </v-subheader>
            <v-select v-model="form.fontSize"
                      dense
                      :items="fonts"
                      label="Font Size" />
          </v-layout>
          <v-textarea v-model="form.performanceComments"
                      filled
                      counter />
          <v-layout column>
            <h4>Qualifications/Achievements</h4>
            <v-subheader>Education, awards, community involvement, etc., during this period.</v-subheader>
            <v-textarea v-model="form.qualificationsComments"
                        filled
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
      reportType: null,
      reportOccasion: null,
      promotionStatus: null,
      notObserved: null,
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
      fontSize: null,
      performanceComments: null,
      qualificationsComments: null,
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
        return this.$store.getters.promotionStatuses || [];
      },
    },
    physicalReadiness: {
      get() {
        return this.$store.getters.physicalReadiness || [];
      },
    },
    reportTypes: {
      get() {
        return this.$store.getters.reportTypes || [];
      },
    },
    reportOccasions: {
      get() {
        return this.$store.getters.reportOccasions || [];
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
