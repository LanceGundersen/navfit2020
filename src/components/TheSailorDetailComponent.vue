<template>
  <v-card outlined>
    <v-toolbar dense
               flat>
      <v-toolbar-title>
        {{ sailor.rate }} {{ sailor.lastName }}, {{ sailor.firstName }}
        <v-btn icon
               small
               color="primary"
               @click="showAddSailorDialog = !showAddSailorDialog">
          <v-icon small>
            mdi-pencil
          </v-icon>
        </v-btn>
      </v-toolbar-title>
      <v-spacer />
      <v-btn text
             color="primary"
             @click="showAddEditEvalDialog()">
        {{ 'ADD EVAL' }}
      </v-btn>
    </v-toolbar>
    <v-expansion-panels hover
                        class="pa-2">
      <v-expansion-panel v-for="record in sailor.records"
                         :key="record.id">
        <v-expansion-panel-header color="grey lighten-5">
          <v-row no-gutters
                 class="align-center">
            <v-col cols="3">
              {{ record.fromDate }} - {{ record.toDate }}
            </v-col>
            <v-col cols="2">
              {{ record.promotionRecommendation }}
            </v-col>
            <v-col cols="2">
              Trait Average: TODO
            </v-col>
            <v-spacer />
            <v-btn icon
                   small
                   color="primary"
                   @click.native.stop="showAddEditEvalDialog(record.id)">
              <v-icon small>
                mdi-pencil
              </v-icon>
            </v-btn>
            <v-menu
              bottom
              left
              transition="slide-y-transition">
              <template #activator="{ on, attrs }">
                <v-btn
                  icon
                  v-bind="attrs"
                  v-on="on">
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </template>

              <v-list>
                <v-list-item @click="exportEval(record.id)">
                  <v-list-item-title>
                    <v-icon small
                            color="primary">
                      mdi-file-export-outline
                    </v-icon>
                    Export PDF
                  </v-list-item-title>
                </v-list-item>
                <v-list-item @click="deleteEval(record.id)">
                  <v-list-item-title>
                    <v-icon small
                            color="error">
                      mdi-delete
                    </v-icon>
                    Delete Record
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-row>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-card flat>
            <v-card-text>
              <v-layout class="mb-2">
                <v-layout column>
                  <h4>Promotion Status</h4>
                  {{ record.promotionStatus ? record.promotionStatus : '' }}
                  <h4>Occasion for Report</h4>
                  {{ record.reportOccasion ? record.reportOccasion : '' }}
                  <h4>Report Type</h4>
                  {{ record.reportType ? record.reportType : '' }}
                  <h4>Physical Readiness</h4>
                  {{ record.physicalReadiness ? record.physicalReadiness : '' }}
                </v-layout>
                <v-layout column>
                  <template v-if="record.billetSubcategory">
                    <h4>Billet Subcategory</h4>
                    {{ record.billetSubcategory ? record.billetSubcategory : '' }}
                  </template>
                  <h4>Reporting Senior</h4>
                  {{ record.commandInfo && record.commandInfo.grade ? record.commandInfo.grade : "" }}
                  {{ record.commandInfo && record.commandInfo.firstName ? record.commandInfo.firstName + ',' : "" }}
                  {{ record.commandInfo && record.commandInfo.lastName ? record.commandInfo.lastName : "" }}
                  {{ record.commandInfo && record.commandInfo.middleInitial ?record.commandInfo.middleInitial : "" }}
                  <h4>Mid-Term Counseling</h4>
                  TODO
                </v-layout>
                <v-divider vertical
                           class="mr-4 " />
                <v-layout column>
                  <SharedRatingComponent :label="'Professional Knowledge'"
                                         :rating="record.professionalKnowledge ? record.professionalKnowledge : ''" />
                  <SharedRatingComponent :label="'Quality of Work'"
                                         :rating="record.qualityOfWork ? record.qualityOfWork : ''" />
                  <SharedRatingComponent :label="'Command or Organizational Climate/Equal Opportunity'"
                                         :rating="record.commandClimate ? record.commandClimate : ''" />
                  <SharedRatingComponent :label="'Military Bearing/Character'"
                                         :rating="record.militaryBearing ? record.militaryBearing : ''" />
                </v-layout>
                <v-layout column>
                  <SharedRatingComponent :label="'Personal Job Accomplishment/Initiative'"
                                         :rating="record.personalInitiative ? record.personalInitiative : ''" />
                  <SharedRatingComponent :label="'Teamwork'"
                                         :rating="record.teamwork ? record.teamwork : ''" />
                  <SharedRatingComponent :label="'Leadership'"
                                         :rating="record.leadership ? record.leadership : ''" />
                </v-layout>
              </v-layout>
              <v-layout column
                        class="mb-2">
                <h4>Comments on Performance</h4>
                <v-divider />
                {{ record.performanceComments ? record.performanceComments : '' }}
              </v-layout>
              <v-layout column
                        class="mb-2">
                <h4>Qualifications/Achievements</h4>
                <v-divider />
                {{ record.qualificationComments ? record.qualificationComments : '' }}
              </v-layout>
            </v-card-text>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <TheAddEditEvalDialogComponent v-model="showEvalDialog" />
    <TheAddEditSailorDialogComponent v-model="showAddSailorDialog"
                                     :sailor="sailor" />
    <TheDeleteConfirmationDialogComponent v-model="showDeleteConfirmationDialog"
                                          :uuid="sailor.uuid"
                                          :recordid="recordId" />
  </v-card>
</template>

<script>
import Vue from "vue";
import TheAddEditSailorDialogComponent from "./TheAddEditSailorDialogComponent";
import TheAddEditEvalDialogComponent from "./TheAddEditEvalDialogComponent";
import SharedRatingComponent from "./shared/SharedRatingComponent";
import TheDeleteConfirmationDialogComponent from "./shared/TheDeleteConfirmationDialogComponent";

export default Vue.extend({
  name: "TheSailorDetailComponent",
  components: {
    TheAddEditEvalDialogComponent,
    TheAddEditSailorDialogComponent,
    SharedRatingComponent,
    TheDeleteConfirmationDialogComponent,
  },
  props: {
    value: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  data: () => ({
    showEvalDialog: false,
    showAddSailorDialog: false,
    showDeleteConfirmationDialog: false,
    recordId: null,
  }),
  computed: {
    sailor() {
      return this.$store.getters.getSelectedSailor;
    },
  },
  methods: {
    showAddEditEvalDialog(recordId) {
      this.$store.dispatch("clearEvalEditForm");

      if (recordId) {
        this.$store.dispatch("setEvalEditForm", this.$store.getters.getRecordById({
          uuid: this.sailor.uuid,
          recordId
        }));
      }

      this.showEvalDialog = !this.showEvalDialog;
    },
    showEditSailorDialog() {
      this.$store.dispatch("setSailorEditForm", this.sailor).then(() => {
        this.showAddSailorDialog = !this.showAddSailorDialog;
      });
    },
    deleteEval(recordId) {
      this.recordId = recordId;
      this.showDeleteConfirmationDialog = !this.showDeleteConfirmationDialog;
    },
    exportEval(recordId) {
      this.$store.dispatch("exportEval", recordId);
    }
  },
});
</script>
