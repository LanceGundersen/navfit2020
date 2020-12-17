<template>
  <v-dialog v-model="dialog"
            persistent
            width="30%">
    <v-card>
      <v-card-title>Update Command Info?</v-card-title>
      <v-card-text>
        <v-icon>{{ 'mdi-question' }}</v-icon> Do you wish to update the command defaults?
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn color="warning"
               @click="submitUpdate(true)">
          Yes
        </v-btn>
        <v-btn text
               @click="submitUpdate(false)">
          No
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  name: "TheCommandConfirmationDialogComponent",
  props: {
    value: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  computed: {
    dialog: {
      get() {
        return this.value;
      },
      set(newValue) {
        this.$emit("input", newValue);
      }
    },
  },
  methods: {
    submitUpdate(update) {
      this.$store.dispatch("updateEval", update)
        .then(() => {
          if (!this.$store.getters.isError) {
            this.dialog = false;
            this.$emit("close-dialog");
          }
        });
    },
  },
});
</script>
