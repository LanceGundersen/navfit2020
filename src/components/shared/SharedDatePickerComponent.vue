<template>
  <v-menu
    v-model="dateMenu"
    :close-on-content-click="false"
    max-width="290px"
    min-width="290px">
    <template v-slot:activator="{ on }">
      <v-text-field
        :label="label"
        prepend-icon="mdi-calendar"
        readonly
        :value="fromDateDisp"
        v-on="on" />
    </template>
    <v-date-picker
      v-model="dateVal"
      locale="en-in"
      no-title
      @input="emitDateString(dateVal)" />
  </v-menu>
</template>
<script>
import Vue from "vue";

export default Vue.extend({
  name: "SharedDatePickerComponent",
  props: {
    date: {
      type: String,
      required: false,
      default: null,
    },
    label: {
      type: String,
      required: false,
      default: "Date"
    }
  },
  data: () => ({
    dateMenu: false,
    dateVal: null,
  }),
  computed: {
    fromDateDisp() {
      return this.dateVal;
    },
  },
  methods: {
    emitDateString() {
      this.$emit("date-string", this.dateVal);
      this.dateMenu = false;
    }
  },
});
</script>
