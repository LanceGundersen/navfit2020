<template>
  <v-app fluid>
    <TheAppBarComponent />
    <v-content>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-content>
    <div class="d-flex justify-center">
      <SharedAlertComponent />
    </div>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import TheAppBarComponent from "./components/TheAppBarComponent";
import SharedAlertComponent from "./components/shared/SharedAlertComponent.vue";

export default Vue.extend({
  name: "App",
  components: {
    TheAppBarComponent,
    SharedAlertComponent,
  },
  data: () => ({}),
  created() {
    this.$store.dispatch("loadDb");
  }
});
</script>

<style lang="sass">
body
  margin: 0
</style>
