<template>
  <v-dialog v-model="dialog"
            persistent
            max-width="75%">
    <v-card class="ma-0">
      <v-card-title>
        Edit Command Defaults
      </v-card-title>
      <v-form ref="form"
              v-model="valid">
        <v-card-text>
          <v-card outlined
                  class="mb-2">
            <v-card-subtitle>Command Info</v-card-subtitle>
            <v-card-text>
              <v-layout>
                <v-text-field v-model="uic"
                              class="pa-1"
                              label="UIC"
                              :rules="requiredRules"
                              required />
                <v-text-field v-model="shipStation"
                              class="pa-1"
                              label="Ship/Station"
                              :rules="requiredRules"
                              required />
              </v-layout>
              <v-textarea v-model="commandDescription"
                          class="pa-1"
                          auto-grow
                          rows="1"
                          label="Command Employment and Command Achievements"
                          :rules="requiredRules"
                          required />
            </v-card-text>
          </v-card>
          <v-card outlined>
            <v-card-subtitle>Reporting Senior</v-card-subtitle>
            <v-card-text>
              <v-layout>
                <v-text-field v-model="lastName"
                              class="pa-1"
                              label="Last Name"
                              :rules="requiredRules"
                              required />
                <v-text-field v-model="firstName"
                              class="pa-1"
                              label="First Name"
                              :rules="requiredRules"
                              required />
                <v-text-field v-model="middleInitial"
                              class="pa-1"
                              label="Middle Initial (optional)" />
              </v-layout>
              <v-layout>
                <v-text-field v-model="grade"
                              class="pa-1"
                              label="Grade"
                              :rules="requiredRules"
                              required />
                <v-text-field v-model="designation"
                              class="pa-1"
                              label="Designation"
                              :rules="requiredRules"
                              required />
                <v-text-field v-model="title"
                              class="pa-1"
                              label="Title"
                              :rules="requiredRules"
                              required />
                <v-text-field v-model="reportingSeniorUic"
                              label="UIC (if different)"
                              class="pa-1" />
                <v-text-field v-model="ssn"
                              class="pa-1"
                              label="SSN"
                              placeholder="111-11-1111"
                              :rules="requiredRules"
                              required />
              </v-layout>
              <v-textarea v-model="address"
                          label="Address"
                          auto-grow
                          rows="1"
                          :rules="requiredRules"
                          required />
            </v-card-text>
          </v-card>
        </v-card-text>
        <v-divider />
        <v-card-actions>
          <v-spacer />
          <v-btn text
                 @click="dialog = false">
            Cancel
          </v-btn>
          <v-btn color="primary"
                 @click="submit">
            Save Command Defaults
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import Vue from "vue";
import { mapFields } from "vuex-map-fields";

export default Vue.extend({
  name: "TheDefaultsDialogComponent",
  props: {
    value: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  data: () => ({
    valid: false,
    requiredRules: [
      v => !!v || "Is required",
    ],
  }),
  computed: {
    ...mapFields([
      "commandInfo.uic",
      "commandInfo.shipStation",
      "commandInfo.commandDescription",
      "commandInfo.reportingSenior.firstName",
      "commandInfo.reportingSenior.lastName",
      "commandInfo.reportingSenior.middleInitial",
      "commandInfo.reportingSenior.grade",
      "commandInfo.reportingSenior.designation",
      "commandInfo.reportingSenior.title",
      "commandInfo.reportingSenior.reportingSeniorUic",
      "commandInfo.reportingSenior.ssn",
      "commandInfo.reportingSenior.address",
    ]),
    dialog: {
      get() {
        return this.value;
      },
      set(newValue) {
        this.$emit("input", newValue);
      }
    },
  },
  methods: {
    submit() {
      // this.$refs.form.validate();
      this.$store.dispatch("saveCommandDefaults");
      this.dialog = false;
    },
  },
});
</script>
