<template>
  <v-layout>
    <v-col>
      <v-card class="mb-1">
        <v-card-title class="headline grey lighten-2 mb-3">
          Welcome to NavFit2020 - Pre-Alpha Testing
        </v-card-title>
        <v-card-text>
          <p>
            This is really early so <strong>DO NOT </strong> use this application for real world work yet.
            The database, application and all associated technology is subject to change due to development cadence.
          </p>
          <p>
            The initial focus is on enlisted evaluations only at this time in order to get a focused minimum viable
            product (MVP) in a timely fashion.
          </p>
        </v-card-text>
      </v-card>
      <v-card class="mb-1">
        <v-card-title class="headline error lighten-3 mb-3">
          Feedback & Bug Reporting
        </v-card-title>
        <v-card-text>
          <p>
            Please provide feedback and bug reports via the Google form. Any and all feedback is desired.
            If sending a bug report please include as much detail as possible.
          </p>
          <p>
            To view the changelog, go to the <a class="github"
                                                @click="openExternalGithubRepo">Github Repo</a>
          </p>
        </v-card-text>
        <v-card-actions>
          <v-btn class="feedback"
                 color="primary"
                 @click="openExternalFeedbackForm">
            Feedback & Bug Reporting Form
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
    <v-col>
      <v-card class="mb-1">
        <v-card-title class="headline info lighten-2 mb-3">
          Getting Started
        </v-card-title>
        <v-card-text>
          <ol>
            <li>
              Fill out default command details. Via the gear icon <v-icon>mdi-cog</v-icon>
              in the upper right hand corner.
            </li>
            <li>Add a Sailor. Click <code>ADD SAILOR</code> button in the upper right hand corner.</li>
            <li>Click the menu icon <v-icon>mdi-menu</v-icon> in the upper left hand corner and select a Sailor.</li>
            <li>Add an Eval. Click <code>ADD EVAL</code> button in the upper right hand corner.</li>
            <li>
              Fill out the eval details. <strong>NOTE:</strong> the command details override (accessed via the eval
              dialog) isn't setup yet.
            </li>
          </ol>
        </v-card-text>
      </v-card>
    </v-col>
  </v-layout>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  name: "TheStartComponent",
  methods: {
    openExternalFeedbackForm() {
      this.$store.dispatch("openFeedbackForm");
    },
    openExternalGithubRepo() {
      this.$store.dispatch("openGithubRepo");
    }
  }
});
</script>
