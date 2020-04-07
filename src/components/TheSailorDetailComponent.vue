<template>
  <div>
    <v-toolbar dense>
      <v-toolbar-title>
        {{ sailorDetail.rate }} {{ sailorDetail.lastName }}, {{ sailorDetail.firstName }}
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
        {{ sailorDetail.rank.charAt(0) === "E" ? 'ADD EVAL' : 'ADD FITREP' }}
      </v-btn>
    </v-toolbar>
    <v-expansion-panels>
      <v-expansion-panel v-for="record in sailorDetail.records"
                         :key="record.id">
        <v-expansion-panel-header>
          Reporting Period: {{ record.date.from }} - {{ record.date.to }}
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          {{ JSON.stringify(record) }}
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <TheAddEvalDialogComponent v-model="showAddEvalDialog" />
    <TheEditSailorDialogComponent v-model="showEditSailorDialog" />
  </div>
</template>

<script>
import Vue from "vue";
import TheAddEvalDialogComponent from "./TheAddEvalDialogComponent";
import TheEditSailorDialogComponent from "./TheEditSailorDialogComponent";

export default Vue.extend({
  name: "TheSailorDetailComponent",
  components: {
    TheAddEvalDialogComponent,
    TheEditSailorDialogComponent,
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
    sailorDetail() {
      return this.$store.getters.getSailorById(
        this.$router.currentRoute.params.uuid
      );
    },
  },
});
</script>
