<template>
  <v-dialog v-model="dialog"
            persistent
            max-width="75%">
    <v-card class="pa-4">
      <v-card-title>
        Add Eval/Fitrep
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
                                      :edit="record" />
          <TheSeniorInfoComponentVue v-model="showSeniorInfo"
                                     :edit="record" />
          <v-layout>
            <TheDatePickerComponent :label="'From Date'"
                                    :rules="requiredRules"
                                    required
                                    @date-string="updateForm('fromDate', $event)" />
            <TheDatePickerComponent :label="'To Date'"
                                    :rules="requiredRules"
                                    required
                                    @date-string="updateForm('toDate', $event)" />
          </v-layout>
          <v-layout>
            <v-col cols="4">
              <v-select :input="recordid ? record.reportOccasion : ''"
                        :items="reportOccasions"
                        label="Occasion for Report"
                        item-text="label"
                        @input="updateForm('reportOccasion', $event)" />
              <v-layout>
                <v-select :input="recordid ? record.reportType : ''"
                          :items="reportTypes"
                          label="Type of Report"
                          item-text="label"
                          @change="updateForm('reportType', $event)" />
                <v-checkbox :input="recordid ? record.notObserved : ''"
                            dense
                            label="NOB"
                            type="checkbox"
                            @change="updateForm('notObserved', $event)" />
              </v-layout>
              <v-checkbox :input="recordid ? record.retention : ''"
                          dense
                          label="Recommended for Retention"
                          @change="updateForm('retention', $event)" />
            </v-col>
            <v-col cols="4">
              <v-select :input="recordid ? record.promotionStatus : ''"
                        :items="promotionStatus"
                        label="Promotion Status"
                        @change="updateForm('promotionStatus', $event)">
                <template v-slot:selection="{ item }">
                  <span>{{ item }}</span>
                </template>
              </v-select>
              <v-text-field :input="recordid ? record.billetSubcategory : ''"
                            label="Billet Subcategory (if any)"
                            @input="updateForm('billetSubcategory', $event)" />
            </v-col>
            <v-col cols="4">
              <v-select :input="recordid ? record.promotionRecommendation : ''"
                        :items="promotionRecommendations"
                        label="Recommendation"
                        @change="updateForm('promotionRecommendation', $event)">
                <template v-slot:selection="{ item }">
                  <span>{{ item }}</span>
                </template>
              </v-select>
              <v-select :input="recordid ? record.physicalReadiness : ''"
                        :items="physicalReadiness"
                        label="Physical Readiness"
                        @change="updateForm('physicalReadiness', $event)">
                <template v-slot:selection="{ item }">
                  <span>{{ item }}</span>
                </template>
              </v-select>
            </v-col>
          </v-layout>
          <h4>Performance Traits</h4>
          <v-layout>
            <v-col cols="6">
              <v-select :input="recordid && record.professionalKnowledge ? record.professionalKnowledge : ''"
                        :items="traits.professionalKnowledge.standards"
                        :label="traits.professionalKnowledge.title"
                        item-text="label"
                        @change="updateForm('professionalKnowledge', $event)" />
              <v-select :input="recordid ? record.qualityOfWork : ''"
                        :items="traits.qualityOfWork.standards"
                        :label="traits.qualityOfWork.title"
                        item-text="label"
                        @change="updateForm('qualityOfWork', $event)" />
              <v-select :input="recordid ? record.commandClimate : ''"
                        :items="traits.commandClimate.standards"
                        :label="traits.commandClimate.title"
                        item-text="label"
                        @change="updateForm('commandClimate', $event)" />
              <v-select :input="recordid ? record.militaryBearing : ''"
                        :items="traits.militaryBearing.standards"
                        :label="traits.militaryBearing.title"
                        item-text="label"
                        @change="updateForm('militaryBearing', $event)" />
            </v-col>
            <v-col cols="6">
              <v-select :input="recordid ? record.personalInitiative : ''"
                        :items="traits.personalInitiative.standards"
                        :label="traits.personalInitiative.title"
                        item-text="label"
                        @change="updateForm('personalInitiative', $event)" />
              <v-select :input="recordid ? record.teamwork : ''"
                        :items="traits.teamwork.standards"
                        :label="traits.teamwork.title"
                        item-text="label"
                        @change="updateForm('teamwork', $event)" />
              <v-select :input="recordid ? record.leadership : ''"
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
            <v-select :input="recordid ? record.fontSize : ''"
                      dense
                      :items="fonts"
                      label="Font Size"
                      @change="updateForm('fontSize', $event)" />
          </v-layout>
          <v-textarea :input="recordid ? record.performanceComments : ''"
                      filled
                      counter
                      @input="updateForm('performanceComments', $event)" />
          <v-layout column>
            <h4>Qualifications/Achievements</h4>
            <v-subheader>Education, awards, community involvement, etc., during this period.</v-subheader>
            <v-textarea :input="recordid ? record.qualificationsComments : ''"
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
            {{ recordid ? "Edit Eval" : "Add Eval" }}}
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
    recordid: {
      type: String,
      required: false,
      default: null,
    }
  },
  data: () => ({
    defaultsDrawer: false,
    showCommandInfo: false,
    showSeniorInfo: false,
    valid: false,
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
    reportTypes() {
      return this.$store.getters.reportTypes || [];
    },
    reportOccasions() {
      return this.$store.getters.reportOccasions || [];
    },
    uuid() {
      return this.$router.currentRoute.params.uuid;
    },
    record() {
      return this.$store.getters.getRecordById(this.uuid, this.recordid);
    },
    getCommandInfo() {
      return this.$store.getters.getCommandInfo;
    },
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
      this.dialog = false;
    },
    submit() {
      this.$refs.eval.validate();
      if (this.eval) {
        console.log("in here with eval");
        this.$store.dispatch("updateEval")
          .then(() => {
            if (!this.$store.getters.isError) {
              this.closeDialog();
            } else {
              // TODO: Handle error
            }
          });
      } else {
        console.log("in here");
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
