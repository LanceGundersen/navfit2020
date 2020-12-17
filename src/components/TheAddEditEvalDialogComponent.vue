<template>
  <v-dialog v-model="dialog"
            persistent
            max-width="75%">
    <v-card class="pa-4">
      <v-card-title>
        {{ getEvalEditForm.id ? "Edit Eval" : "Add Eval" }}
        <v-spacer />
        <v-btn small
               outlined
               color="primary"
               @click.stop="defaultsDrawer = !defaultsDrawer">
          Command Defaults
        </v-btn>
      </v-card-title>
      <v-form ref="eval"
              v-model="valid">
        <v-card-text>
          <TheCommandInfoComponentVue v-model="showCommandInfo"
                                      :edit="getEvalEditForm" />
          <TheSeniorInfoComponentVue v-model="showSeniorInfo"
                                     :edit="getEvalEditForm" />
          <v-card outlined>
            <v-card-subtitle>Period of Report</v-card-subtitle>
            <v-layout class="px-5">
              <TheDatePickerComponent :datestr="getEvalEditForm.fromDate ? getEvalEditForm.fromDate : ''"
                                      :label="'Period of Report: From'"
                                      @date-string="updateForm('fromDate', $event)" />
              <TheDatePickerComponent :datestr="getEvalEditForm.toDate ? getEvalEditForm.toDate : ''"
                                      :label="'Period of Report: To'"
                                      @date-string="updateForm('toDate', $event)" />
            </v-layout>
          </v-card>
          <v-layout>
            <v-col cols="4">
              <v-select :value="getEvalEditForm.reportOccasion ? getEvalEditForm.reportOccasion : ''"
                        :items="reportOccasions"
                        label="Occasion for Report"
                        item-text="label"
                        @input="updateForm('reportOccasion', $event)" />
              <v-layout>
                <v-select :value="getEvalEditForm.reportType ? getEvalEditForm.reportType : ''"
                          :items="reportTypes"
                          label="Type of Report"
                          item-text="label"
                          @change="updateForm('reportType', $event)" />
                <v-checkbox :value="getEvalEditForm.notObserved ? getEvalEditForm.notObserved : ''"
                            dense
                            label="NOB"
                            type="checkbox"
                            @change="updateForm('notObserved', $event)" />
              </v-layout>
              <v-checkbox :value="getEvalEditForm.retention ? getEvalEditForm.retention : false"
                          dense
                          label="Recommended for Retention"
                          @change="updateForm('retention', $event)" />
            </v-col>
            <v-col cols="4">
              <v-select :value="getEvalEditForm.promotionStatus ? getEvalEditForm.promotionStatus : ''"
                        :items="promotionStatus"
                        label="Promotion Status"
                        @change="updateForm('promotionStatus', $event)">
                <template v-slot:selection="{ item }">
                  <span>{{ item }}</span>
                </template>
              </v-select>
              <v-select :value="getEvalEditForm.billetSubcategory ? getEvalEditForm.billetSubcategory : ''"
                        :items="billetSubcategory"
                        label="Billet Subcategory"
                        @change="updateForm('billetSubcategory', $event)">
                <template v-slot:selection="{ item }">
                  <span>{{ item }}</span>
                </template>
              </v-select>
            </v-col>
            <v-col cols="4">
              <v-select :value="getEvalEditForm.promotionRecommendation ? getEvalEditForm.promotionRecommendation : ''"
                        :items="promotionRecommendations"
                        label="Recommendation"
                        @change="updateForm('promotionRecommendation', $event)">
                <template v-slot:selection="{ item }">
                  <span>{{ item }}</span>
                </template>
              </v-select>
              <v-select :value="getEvalEditForm.physicalReadiness ? getEvalEditForm.physicalReadiness : ''"
                        :items="physicalReadiness"
                        label="Physical Readiness"
                        @change="updateForm('physicalReadiness', $event)">
                <template v-slot:selection="{ item }">
                  <span>{{ item }}</span>
                </template>
              </v-select>
            </v-col>
          </v-layout>
          <h4 class="pb-2">
            Primary/Collateral/Watchstanding duties
          </h4>
          <v-text-field :value="getEvalEditForm.primaryCollateralShort ? getEvalEditForm.primaryCollateralShort : ''"
                        filled
                        label="Primary Duty Abbreviation"
                        counter
                        @input="updateForm('primaryCollateralShort', $event)" />
          <v-textarea :value="getEvalEditForm.primaryCollateral ? getEvalEditForm.primaryCollateral : ''"
                      filled
                      label="Duties"
                      counter
                      @input="updateForm('primaryCollateral', $event)" />
          <h4>Performance Traits</h4>
          <v-layout>
            <v-col cols="6">
              <v-select :value="getEvalEditForm.professionalKnowledge ? getEvalEditForm.professionalKnowledge : ''"
                        :items="traits.professionalKnowledge.standards"
                        :label="traits.professionalKnowledge.title"
                        item-text="label"
                        @change="updateForm('professionalKnowledge', $event)" />
              <v-select :value="getEvalEditForm.qualityOfWork ? getEvalEditForm.qualityOfWork : ''"
                        :items="traits.qualityOfWork.standards"
                        :label="traits.qualityOfWork.title"
                        item-text="label"
                        @change="updateForm('qualityOfWork', $event)" />
              <v-select :value="getEvalEditForm.commandClimate ? getEvalEditForm.commandClimate : ''"
                        :items="traits.commandClimate.standards"
                        :label="traits.commandClimate.title"
                        item-text="label"
                        @change="updateForm('commandClimate', $event)" />
              <v-select :value="getEvalEditForm.militaryBearing ? getEvalEditForm.militaryBearing : ''"
                        :items="traits.militaryBearing.standards"
                        :label="traits.militaryBearing.title"
                        item-text="label"
                        @change="updateForm('militaryBearing', $event)" />
            </v-col>
            <v-col cols="6">
              <v-select :value="getEvalEditForm.personalInitiative ? getEvalEditForm.personalInitiative : ''"
                        :items="traits.personalInitiative.standards"
                        :label="traits.personalInitiative.title"
                        item-text="label"
                        @change="updateForm('personalInitiative', $event)" />
              <v-select :value="getEvalEditForm.teamwork ? getEvalEditForm.teamwork : ''"
                        :items="traits.teamwork.standards"
                        :label="traits.teamwork.title"
                        item-text="label"
                        @change="updateForm('teamwork', $event)" />
              <v-select :value="getEvalEditForm.leadership ? getEvalEditForm.leadership : ''"
                        :items="traits.leadership.standards"
                        :label="traits.leadership.title"
                        item-text="label"
                        @change="updateForm('leadership', $event)" />
            </v-col>
          </v-layout>
          <h4>Comments on Performance.</h4>
          <v-layout>
            <v-subheader>
              *All 1.0 marks, three 2.0 marks, and 2.0 marks in Block 35 must be specifically substantiated in comments.
              Comments must be verifiable. Use upper and lower case.
            </v-subheader>
            <v-select :value="getEvalEditForm.fontSize ? getEvalEditForm.fontSize : ''"
                      dense
                      :items="fonts"
                      label="Font Size"
                      @change="updateForm('fontSize', $event)" />
          </v-layout>
          <v-textarea :value=" getEvalEditForm.performanceComments ? getEvalEditForm.performanceComments : ''"
                      filled
                      counter
                      @input="updateForm('performanceComments', $event)" />
          <v-layout column>
            <h4>Qualifications/Achievements</h4>
            <v-subheader>Education, awards, community involvement, etc., during this period.</v-subheader>
            <v-textarea :value="getEvalEditForm.qualificationComments ? getEvalEditForm.qualificationComments : ''"
                        filled
                        counter
                        @input="updateForm('qualificationComments', $event)" />
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
            {{ getEvalEditForm.id ? "Edit Eval" : "Add Eval" }}
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
    <TheDefaultsDrawerComponentVue v-model="defaultsDrawer" />
  </v-dialog>
</template>

<script>
import Vue from "vue";
import TheCommandInfoComponentVue from "@/components/command/TheCommandInfoComponent";
import TheSeniorInfoComponentVue from "@/components/command/TheSeniorInfoComponent";
import TheDefaultsDrawerComponentVue from "@/components/command/TheDefaultsDrawerComponent";
import TheDatePickerComponent from "./shared/SharedDatePickerComponent";

export default Vue.extend({
  name: "TheAddEditEvalDialogComponent",
  components: {
    TheDefaultsDrawerComponentVue,
    TheSeniorInfoComponentVue,
    TheCommandInfoComponentVue,
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
    defaultsDrawer: false,
    showCommandInfo: false,
    showSeniorInfo: false,
    valid: false,
    requiredRules: [
      v => !!v || "Is required",
    ],
    social: [
      v => !!v || "9 Numbers",
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
    promotionRecommendations() {
      return this.$store.getters.promotionRecommendations || [];
    },
    fonts() {
      return this.$store.getters.fonts || [];
    },
    promotionStatus() {
      return this.$store.getters.promotionStatuses || [];
    },
    physicalReadiness() {
      return this.$store.getters.physicalReadiness || [];
    },
    billetSubcategory() {
      return this.$store.getters.billetSubcategory || [];
    },
    reportTypes() {
      return this.$store.getters.reportTypes || [];
    },
    reportOccasions() {
      return this.$store.getters.reportOccasions || [];
    },
    uuid() {
      return this.$router.currentRoute.params.uuid || "";
    },
    getCommandInfo() {
      return this.$store.getters.getCommandInfo;
    },
    getEvalEditForm() {
      return this.$store.getters.getEvalEditForm;
    }
  },
  methods: {
    updateForm(input, value) {
      this.$store.dispatch("updateEvalEditForm", { input, value });
    },
    showCommandDefaults() {
      this.showCommandInfo = !this.showCommandInfo;
      this.defaultsDrawer = !this.defaultsDrawer;
    },
    showReportingSeniorDefaults() {
      this.showSeniorInfo = !this.showSeniorInfo;
      this.defaultsDrawer = !this.defaultsDrawer;
    },
    closeDialog() {
      this.$store.dispatch("clearEvalEditForm");
      this.dialog = false;
    },
    submit() {
      this.$refs.eval.validate();
      if (this.getEvalEditForm.id) {
        this.$store.dispatch("updateEval")
          .then(() => {
            if (!this.$store.getters.isError) {
              this.closeDialog();
            } else {
              // TODO: Handle error
            }
          });
      } else {
        this.$store.dispatch("addEval")
          .then(() => {
            if (!this.$store.getters.isError) {
              this.closeDialog();
            }
          });
      }
    },
  },
});
</script>
