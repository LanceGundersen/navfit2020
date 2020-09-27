<template>
  <div>
    <h4>{{ label }}</h4>
    <v-row align="center"
           class="mx-0">
      <v-rating :value="Number(rating)"
                color="accent"
                dense
                readonly
                size="14" />
      <div class="grey--text ml-4">
        {{ rating }}
      </div>
    </v-row>
  </div>
</template>
<script>
import Vue from "vue";

export default Vue.extend({
  name: "SharedRatingComponent",
  props: {
    rating: {
      type: String,
      required: false,
      default: null,
    },
    label: {
      type: String,
      required: false,
      default: "Rating"
    }
  },
});
</script>
