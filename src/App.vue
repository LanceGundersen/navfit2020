<template>
  <v-app fluid>
    <TheAppBarComponent />
    <v-content>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import TheAppBarComponent from "./components/TheAppBarComponent";

export default Vue.extend({
  name: "App",
  components: {
    TheAppBarComponent,
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
