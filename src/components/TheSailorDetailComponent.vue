<template>
  <div>
    <v-toolbar dense>
      <v-toolbar-title>
        {{ rate }} {{ lastName }}, {{ firstName }}
        <v-btn icon
               small
               color="primary"
               @click.stop="showEditSailorDialog = !showEditSailorDialog">
          <v-icon small>
            mdi-pencil
          </v-icon>
        </v-btn>
      </v-toolbar-title>
      <v-spacer />
      <v-btn text
             color="primary"
             @click="showAddEvalDialog = !showAddEvalDialog">
        {{ officer ? 'ADD FITREP' : 'ADD EVAL' }}
      </v-btn>
    </v-toolbar>
    <v-expansion-panels>
      <v-expansion-panel v-for="record in records"
                         :key="record.id">
        <v-expansion-panel-header>
          Reporting Period: {{ record.date.from }} - {{ record.date.to }}
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          {{ JSON.stringify(record) }}
          <v-card flat>
            <v-card-text>
              <v-layout>
                <v-layout column>
                  <h4>Promotion Status</h4>
                  {{ record.promotionStatus }}
                  <h4>Occasion for Report</h4>
                  {{ record.reportOccasion }}
                  <h4>Report Type</h4>
                  {{ record.reportType }}
                  <h4>Physical Readiness</h4>
                  {{ record.physicalReadiness }}
                  <h4>Billet Subcategory</h4>
                  {{ record.billetSubcategory }}
                  <h4>Reporting Senior</h4>
                  TODO
                  <h4>Mid-Term Counseling</h4>
                  TODO
                </v-layout>
                <v-layout column>
                  <SharedRatingComponent :label="'Professional Knowledge'"
                                         :rating="record.performanceTraits.professionalKnowledge" />
                  <SharedRatingComponent :label="'Quality of Work'"
                                         :rating="record.performanceTraits.qualityOfWork" />
                  <SharedRatingComponent :label="'Command or Organizational Climate/Equal Opportunity'"
                                         :rating="record.performanceTraits.commandClimate" />
                  <SharedRatingComponent :label="'Military Bearing/Character'"
                                         :rating="record.performanceTraits.militaryBearing" />
                  <SharedRatingComponent :label="'Personal Job Accomplishment/Initiative'"
                                         :rating="record.performanceTraits.personalInitiative" />
                  <SharedRatingComponent :label="'Teamwork'"
                                         :rating="record.performanceTraits.teamwork" />
                  <SharedRatingComponent :label="'Leadership'"
                                         :rating="record.performanceTraits.leadership" />
                </v-layout>
              </v-layout>
              <v-layout column>
                <h4>Comments on Performance</h4>
                {{ record.performanceComments }}
              </v-layout>
              <v-layout column>
                <h4>Qualifications/Achievements</h4>
                {{ record.qualificationsComments }}
              </v-layout>
            </v-card-text>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <TheAddEvalDialogComponent v-model="showAddEvalDialog" />
    <TheEditSailorDialogComponent v-model="showEditSailorDialog" />
  </div>
</template>

<script>
import Vue from "vue";
import { mapFields } from "vuex-map-fields";
import TheAddEvalDialogComponent from "./TheAddEvalDialogComponent";
import TheEditSailorDialogComponent from "./TheEditSailorDialogComponent";
import SharedRatingComponent from "./shared/SharedRatingComponent";

export default Vue.extend({
  name: "TheSailorDetailComponent",
  components: {
    TheAddEvalDialogComponent,
    TheEditSailorDialogComponent,
    SharedRatingComponent,
  },
  props: {
    value: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  data: () => ({
    showAddEvalDialog: false,
    showEditSailorDialog: false,
  }),
  computed: {
    ...mapFields([
      "selected.sailor.lastName",
      "selected.sailor.firstName",
      "selected.sailor.rate",
      "selected.sailor.officer",
      "selected.sailor.records",
    ]),
  },
  beforeCreate() {
    if (!this.$store.getters.getSelectedSailor.uuid) {
      this.$router.push({ name: "home" });
    }
  },
  methods: {
    deleteEval(givenUuid) {
      this.uuid = givenUuid;
      this.showDeleteSailorDialog = true;
    },
  },
});
</script>
