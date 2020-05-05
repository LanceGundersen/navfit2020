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
      <v-form ref="form"
              v-model="valid">
        <v-card-text>
          <v-card v-show="showCommandInfo"
                  outlined
                  class="mb-2">
            <v-card-subtitle>Command Info</v-card-subtitle>
            <v-card-text>
              <v-layout>
                <v-text-field v-model="form.commandInfo.uic"
                              class="pa-1"
                              label="UIC"
                              :rules="requiredRules"
                              required />
                <v-text-field v-model="form.commandInfo.shipStation"
                              class="pa-1"
                              label="Ship/Station"
                              :rules="requiredRules"
                              required />
              </v-layout>
              <v-textarea v-model="form.commandInfo.commandDescription"
                          class="pa-1"
                          auto-grow
                          rows="1"
                          label="Command Employment and Command Achievements"
                          :rules="requiredRules"
                          required />
            </v-card-text>
          </v-card>
          <v-card v-show="showSeniorInfo"
                  outlined
                  class="mb-2">
            <v-card-subtitle>Reporting Senior</v-card-subtitle>
            <v-card-text>
              <v-layout>
                <v-text-field v-model="form.commandInfo.lastName"
                              class="pa-1"
                              label="Last Name"
                              :rules="requiredRules"
                              required />
                <v-text-field v-model="form.commandInfo.firstName"
                              class="pa-1"
                              label="First Name"
                              :rules="requiredRules"
                              required />
                <v-text-field v-model="form.commandInfo.middleInitial"
                              class="pa-1"
                              label="Middle Initial (optional)" />
              </v-layout>
              <v-layout>
                <v-text-field v-model="form.commandInfo.grade"
                              class="pa-1"
                              label="Grade"
                              :rules="requiredRules"
                              required />
                <v-text-field v-model="form.commandInfo.designation"
                              class="pa-1"
                              label="Designation"
                              :rules="requiredRules"
                              required />
                <v-text-field v-model="form.commandInfo.title"
                              class="pa-1"
                              label="Title"
                              :rules="requiredRules"
                              required />
                <v-text-field v-model="form.commandInfo.reportingSeniorUic"
                              label="UIC (if different)"
                              class="pa-1" />
                <v-text-field v-model="form.commandInfo.ssn"
                              class="pa-1"
                              label="SSN"
                              placeholder="111-11-1111"
                              :rules="requiredRules"
                              required />
              </v-layout>
              <v-textarea v-model="form.commandInfo.address"
                          label="Address"
                          auto-grow
                          rows="1"
                          :rules="requiredRules"
                          required />
            </v-card-text>
          </v-card>
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
    <v-navigation-drawer v-model="defaultsDrawer"
                         absolute
                         temporary
                         left>
      <v-list>
        <v-subheader>
          Command Info
          <v-spacer />
          <v-btn small
                 icon
                 color="warning"
                 @click.stop="showCommandDefaults()">
            <v-icon small>
              mdi-pencil
            </v-icon>
          </v-btn>
        </v-subheader>
        <v-divider />
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Ship/Station</v-list-item-title>
            <v-list-item-subtitle>{{ form.commandInfo.shipStation }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>UIC</v-list-item-title>
            <v-list-item-subtitle>{{ form.commandInfo.uic }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-subheader>
          Reporting Senior Info
          <v-spacer />
          <v-btn small
                 icon
                 color="warning"
                 @click="showReportingSeniorDefaults()">
            <v-icon small>
              mdi-pencil
            </v-icon>
          </v-btn>
        </v-subheader>
        <v-divider />
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Grade</v-list-item-title>
            <v-list-item-subtitle>{{ form.commandInfo.grade }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Name</v-list-item-title>
            <v-list-item-subtitle>
              {{ form.commandInfo.lastName }}, {{ form.commandInfo.firstName }}, {{ form.commandInfo.middleInitial }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
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
    defaultsDrawer: false,
    showCommandInfo: false,
    showSeniorInfo: false,
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
      commandInfo: {
        uic: "",
        shipStation: "",
        commandDescription: "",
        reportingSenior: {
          lastName: "",
          firstName: "",
          middleInitial: "",
          grade: "",
          designation: "",
          title: "",
          reportingSeniorUic: "",
          ssn: "",
          address: "",
        },
      },
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
    },
    getCommandInfo: {
      get() {
        return this.$store.getters.getCommandInfo;
      },
    },
  },
  created() {
    this.form.commandInfo = this.getCommandInfo;
  },
  methods: {
    showCommandDefaults() {
      this.showCommandInfo = !this.showCommandInfo;
      this.defaultsDrawer = !this.defaultsDrawer;
    },
    showReportingSeniorDefaults() {
      this.showSeniorInfo = !this.showSeniorInfo;
      this.defaultsDrawer = !this.defaultsDrawer;
    },
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
