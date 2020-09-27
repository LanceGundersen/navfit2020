<template>
  <TheSailorDetailComponent />
</template>

<script>
import Vue from "vue";
import TheSailorDetailComponent from "../components/TheSailorDetailComponent";

export default Vue.extend({
  name: "DetailsView",
  components: {
    TheSailorDetailComponent,
  },
});
</script>
