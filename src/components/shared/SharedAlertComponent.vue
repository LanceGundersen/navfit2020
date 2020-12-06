<template>
  <v-dialog v-model="dialog.show"
            persistent
            width="500">
    <v-card>
      <v-card-title :class="['headline', (dialog.type === 'error') ? 'error' : '', (dialog.type === 'success') ? 'success' : '']">
        {{ dialog.title }}
      </v-card-title>

      <v-card-text>
        <v-layout class="my-2">
          {{ dialog.msg }}
        </v-layout>
        <v-layout class="my-2">
          <span class="subtitle-2">
            {{ dialog.filePath }}
          </span>
        </v-layout>
        <v-layout>
          <code>
            {{ dialog.error }}
          </code>
        </v-layout>
      </v-card-text>

      <v-divider />

      <v-card-actions>
        <v-spacer />
        <v-btn
          v-if="dialog.type === 'error'"
          text
          @click="openFeedbackForm()">
          Submit Bug
        </v-btn>
        <v-btn
          color="primary"
          text
          @click="dismissDialog()">
          Dismiss
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  name: "SharedAlertComponent",
  computed: {
    dialog() {
      return this.$store.state.app.dialog;
    },
  },
  methods: {
    dismissDialog() {
      this.$store.dispatch("dismissDialog");
    },
    openFeedbackForm() {
      this.$store.dispatch("openFeedbackForm");
    }
  }
});
</script>
