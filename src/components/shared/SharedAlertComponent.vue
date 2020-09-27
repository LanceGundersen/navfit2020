<template>
  <v-alert v-model="alert"
           dismissible
           dense
           type="error">
    {{ errorMsg ? errorMsg : "Error, please restart application." }}
  </v-alert>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  name: "SharedAlertComponent",
  computed: {
    alert() {
      return this.$store.state.app.isError;
    },
    errorMsg() {
      return this.$store.state.app.errorMsg;
    },
  }
});
</script>

<style lang="sass">
  .v-alert
    z-index: 2000
    position: fixed
    bottom: 0
    left: 0
</style>
