<template>
  <v-dialog v-model="dialog"
            persistent
            max-width="75%">
    <v-card class="pa-4">
      <v-card-title>
        Add Eval/Fitrep
      </v-card-title>
      <v-form ref="form"
              v-model="valid" />
      <v-card-text>
        <v-layout>
          <TheDatePickerComponent :label="'From Date'"
                                  @date-string="setFromDate" />
          <TheDatePickerComponent :label="'To Date'"
                                  @date-string="setToDate" />
        </v-layout>
        <v-layout>
          <v-select v-model="form.promotionStatus"
                    :items="promotionStatus"
                    class="pa-1"
                    label="Promotion Status"
                    :rules="requiredRules"
                    required>
            <template v-slot:selection="{ item }">
              <span>{{ item }}</span>
            </template>
          </v-select>
          <v-text-field v-model="form.billetSubcategory"
                        class="pa-1"
                        label="Billet Subcategory (if any)" />
        </v-layout>
        <v-row>
          <v-col cols="6">
            <v-checkbox v-model="form.periodic"
                        class="mr-2"
                        label="Periodic"
                        type="checkbox" />
            <v-checkbox v-model="form.detachmentOfIndividual"
                        class="mr-2"
                        label="Detachment of Individual"
                        type="checkbox" />
            <v-checkbox v-model="form.detachmentOfReportingSenior"
                        class="mr-2"
                        label="Detachment of Reporting Senior"
                        type="checkbox" />
            <v-checkbox v-model="form.special"
                        class="mr-2"
                        label="Special"
                        type="checkbox" />
          </v-col>
          <v-col cols="6">
            <v-checkbox v-model="form.notObserved"
                        class="mr-2"
                        label="Not Observed Report"
                        type="checkbox" />
            <v-checkbox v-model="form.regular"
                        class="mr-2"
                        label="Regular"
                        type="checkbox"
                        :disabled="form.notObserved" />
            <v-checkbox v-model="form.concurrent"
                        class="mr-2"
                        label="Concurrent"
                        type="checkbox"
                        :disabled="form.notObserved" />
            <v-checkbox v-model="form.opsCdr"
                        class="mr-2"
                        label="Ops Cdr"
                        type="checkbox"
                        :disabled="form.notObserved" />
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn text
               @click="dialog = false">
          Cancel
        </v-btn>
        <v-btn color="primary"
               :disabled="!valid"
               @click="submit">
          Add Eval/Fitrep
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import Vue from "vue";
import TheDatePickerComponent from "./shared/SharedDatePickerComponent";

export default Vue.extend({
  name: "TheAddEvalDialogComponent",
  components: {
    TheDatePickerComponent,
  },
  props: {
    value: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  data: () => ({
    valid: false,
    form: {
      promotionStatus: null,
      periodic: null,
      detachmentOfIndividual: null,
      detachmentOfReportingSenior: null,
      special: null,
      notObserved: null,
      regular: null,
      concurrent: null,
      opsCdr: null,
      physicalReadiness: null,
      billetSubcategory: null,
      date: {
        from: null,
        to: null,
      }
    },
    requiredRules: [
      v => !!v || "Is required",
    ],
  }),
  computed: {
    dialog: {
      get() {
        return this.value;
      },
      set(newValue) {
        this.$emit("input", newValue);
      },
    },
    promotionStatus: {
      get() {
        return this.$store.getters.promotionStatus;
      },
    },
    uuid() {
      return this.$router.currentRoute.params.uuid;
    },
    records() {
      return this.$store.getters.getRecordsById(this.uuid);
    }
  },
  methods: {
    submit() {
      this.$refs.form.validate();
      console.log({ form: this.form });
      this.$store.dispatch("addRecord", { uuid: this.uuid, form: this.form });
      this.dialog = false;
      this.clear();
    },
    clear() {
      this.$refs.form.reset();
    },
    setFromDate(value) {
      this.form.date.from = value;
    },
    setToDate(value) {
      this.form.date.to = value;
    },
  },
});
</script>
