<template>
  <v-stepper v-model="e6"
             vertical
             class="flex-grow-1">
    <v-stepper-step :complete="e6 > 1"
                    step="1">
      Command Info
      <small>UIC, Ship/Station, Reporting Senior, Command Summary, etc.</small>
    </v-stepper-step>

    <v-stepper-content step="1">
      <v-card color="grey lighten-1"
              class="mb-12"
              height="200px" />
      <v-btn color="primary"
             @click="e6 = 2">
        Continue
      </v-btn>
      <v-btn text>
        Cancel
      </v-btn>
    </v-stepper-content>

    <v-stepper-step :complete="e6 > 2"
                    step="2">
      Sailor Info
      <small>Desig, ssn, status, date reported, etc.</small>
    </v-stepper-step>

    <v-stepper-content step="2">
      <v-card color="grey lighten-1"
              class="mb-12"
              height="200px" />
      <v-btn color="primary"
             @click="e6 = 3">
        Continue
      </v-btn>
      <v-btn text>
        Cancel
      </v-btn>
    </v-stepper-content>

    <v-stepper-step :complete="e6 > 3"
                    step="3">
      Performance Traits

      <!-- gross -->
      <small>1.0 - Below standards/not progressing or UNSAT in any one standard;
        2.0 - Does not yet meet all 3.0 standards;
        3.0 - Meets all 3.0 standards; 4.0 - Exceeds most 3.0 standards;
        5.0 - Meets overall criteria and most of the specific standards for 5.0.
        Standards are not all inclusive</small>
    </v-stepper-step>

    <v-stepper-content step="3">
      <v-card color="grey lighten-1"
              class="mb-12"
              height="200px" />
      <v-btn color="primary"
             @click="e6 = 4">
        Continue
      </v-btn>
      <v-btn text>
        Cancel
      </v-btn>
    </v-stepper-content>

    <v-stepper-step step="4">
      Performance Comments
    </v-stepper-step>
    <v-stepper-content step="4">
      <v-card color="grey lighten-1"
              class="mb-12"
              height="200px" />
      <v-btn color="primary"
             @click="e6 = 1">
        Continue
      </v-btn>
      <v-btn text>
        Cancel
      </v-btn>
    </v-stepper-content>
  </v-stepper>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  name: "TheStepperrComponent",
  data: () => ({
    e6: 1,
  }),
});
</script>

<style lang="sass">
  .v-stepper
    box-shadow: none
</style>
