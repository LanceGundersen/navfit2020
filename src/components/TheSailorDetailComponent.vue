<template>
  <v-card flat>
    <v-toolbar dense
               flat>
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
    <v-expansion-panels hover
                        class="pa-2">
      <v-expansion-panel v-for="record in records"
                         :key="record.id">
        <v-expansion-panel-header color="grey lighten-5">
          <v-row no-gutters>
            <v-col cols="3">
              {{ record.date.from }} - {{ record.date.to }}
            </v-col>
            <v-col cols="2">
              {{ record.promotionRecommendation }}
            </v-col>
            <v-col cols="2">
              Trait Average: 3.4
            </v-col>
          </v-row>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-card flat>
            <v-card-text>
              <v-layout class="mb-2">
                <v-layout column>
                  <h4>Promotion Status</h4>
                  {{ record.promotionStatus }}
                  <h4>Occasion for Report</h4>
                  {{ record.reportOccasion }}
                  <h4>Report Type</h4>
                  {{ record.reportType }}
                  <h4>Physical Readiness</h4>
                  {{ record.physicalReadiness }}
                </v-layout>
                <v-layout column>
                  <template v-if="record.billetSubcategory">
                    <h4>Billet Subcategory</h4>
                    {{ record.billetSubcategory }}
                  </template>
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
                </v-layout>
                <v-layout column>
                  <SharedRatingComponent :label="'Personal Job Accomplishment/Initiative'"
                                         :rating="record.performanceTraits.personalInitiative" />
                  <SharedRatingComponent :label="'Teamwork'"
                                         :rating="record.performanceTraits.teamwork" />
                  <SharedRatingComponent :label="'Leadership'"
                                         :rating="record.performanceTraits.leadership" />
                </v-layout>
              </v-layout>
              <v-layout column
                        class="mb-2">
                <h4>Comments on Performance</h4>
                {{ record.performanceComments }}
              </v-layout>
              <v-layout column
                        class="mb-2">
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
  </v-card>
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
