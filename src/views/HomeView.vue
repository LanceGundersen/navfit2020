<template>
  <TheStartComponent />
</template>

<script>
import Vue from "vue";
import TheStartComponent from "../components/TheStartComponent";

export default Vue.extend({
  name: "HomeView",
  components: {
    TheStartComponent,
  },
});
</script>
