<template>
  <v-dialog v-model="dialog"
            persistent
            width="30%">
    <v-card>
      <v-card-title>Delete {{ recordid ? 'Sailor' : 'Record' }}</v-card-title>
      <v-card-text>
        <v-icon>{{ 'mdi-alert' }}</v-icon> WARNING: This action cannot be undone.
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn text
               @click="dialog = false">
          Cancel
        </v-btn>
        <v-btn color="warning"
               @click="submitDelete">
          Delete
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  name: "TheDeleteConfirmationDialogComponent",
  props: {
    value: {
      type: Boolean,
      required: false,
      default: true,
    },
    uuid: {
      type: String,
      required: false,
      default: "",
    },
    recordid: {
      type: String,
      required: false,
      default: "",
    },
  },
  emits: ["input"],
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
    submitDelete() {
      if (this.recordid) {
        this.$store.dispatch("deleteRecord", { uuid: this.uuid, recordid: this.recordid });
      } else {
        this.$store.dispatch("deleteSailor", this.uuid);
      }
      this.dialog = false;
    },
  },
});
</script>
