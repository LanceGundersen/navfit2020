<template>
  <v-app fluid>
    <TheAppBarComponent />
    <v-main>
      <v-container fluid>
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
