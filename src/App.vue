<template>
  <v-app fluid>
    <TheAppBarComponent />
    <v-main>
      <v-container fluid>
        <v-banner
          sticky
          color="warning"
          dark
          icon="mdi-alert">
          NavFit 2020 is no longer being developed and will be removed from all application stores and archived on 28FEB2021.
          <v-btn color="primary"
                 @click="openExternalGitHubAnnouncement"
                 rounded
                 small
                 dark>
            Read About It Here
          </v-btn>
        </v-banner>
        <router-view />
        <SharedAlertComponent />
      </v-container>
      <v-footer
        fixed
        padless
        class="grey lighten-2">
        <v-col
          class="caption text-center pa-0"
          cols="12">
          Crafted by Lance Gundersen
        </v-col>
      </v-footer>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import TheAppBarComponent from "./components/TheAppBarComponent.vue";
import SharedAlertComponent from "./components/shared/SharedAlertComponent.vue";

export default Vue.extend({
  name: "App",
  components: {
    TheAppBarComponent,
    SharedAlertComponent,
  },
  created() {
    this.$store.dispatch("loadDb");
  },
  methods: {
    openExternalGitHubAnnouncement() {
      this.$store.dispatch("openGitHubAnnouncement");
    },
  },
});
</script>

<style lang="sass">
body
  margin: 0
</style>
