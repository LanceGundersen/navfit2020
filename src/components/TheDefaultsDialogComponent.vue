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
                <v-text-field :value="getCommandInfo ? getCommandInfo.uic : ''"
                              class="pa-1"
                              label="UIC"
                              :rules="requiredRules"
                              required
                              @input="updateForm('uic', $event)" />
                <v-text-field :value="getCommandInfo ? getCommandInfo.shipStation : ''"
                              class="pa-1"
                              label="Ship/Station"
                              :rules="requiredRules"
                              required
                              @input="updateForm('shipStation', $event)" />
              </v-layout>
              <v-textarea :value="getCommandInfo ? getCommandInfo.commandDescription : ''"
                          class="pa-1"
                          auto-grow
                          rows="1"
                          label="Command Employment and Command Achievements"
                          :rules="requiredRules"
                          required
                          @input="updateForm('commandDescription', $event)" />
            </v-card-text>
          </v-card>
          <v-card outlined>
            <v-card-subtitle>Reporting Senior</v-card-subtitle>
            <v-card-text>
              <v-layout>
                <v-text-field :value="getCommandInfo ? getCommandInfo.lastName : ''"
                              class="pa-1"
                              label="Last Name"
                              :rules="requiredRules"
                              required
                              @input="updateForm('lastName', $event)" />
                <v-text-field :value="getCommandInfo ? getCommandInfo.firstName : ''"
                              class="pa-1"
                              label="First Name"
                              :rules="requiredRules"
                              required
                              @input="updateForm('firstName', $event)" />
                <v-text-field :value="getCommandInfo ? getCommandInfo.middleInitial : ''"
                              class="pa-1"
                              label="Middle Initial (optional)"
                              @input="updateForm('middleInitial', $event)" />
              </v-layout>
              <v-layout>
                <v-text-field :value="getCommandInfo ? getCommandInfo.grade : ''"
                              class="pa-1"
                              label="Grade"
                              :rules="requiredRules"
                              required
                              @input="updateForm('grade', $event)" />
                <v-text-field :value="getCommandInfo ? getCommandInfo.designation : ''"
                              class="pa-1"
                              label="Designation"
                              :rules="requiredRules"
                              required
                              @input="updateForm('designation', $event)" />
                <v-text-field :value="getCommandInfo ? getCommandInfo.title : ''"
                              class="pa-1"
                              label="Title"
                              :rules="requiredRules"
                              required
                              @input="updateForm('title', $event)" />
                <v-text-field :value="getCommandInfo ? getCommandInfo.reportingSeniorUic : ''"
                              label="UIC (if different)"
                              class="pa-1"
                              @input="updateForm('reportingSeniorUic', $event)" />
                <v-text-field :value="getCommandInfo ? getCommandInfo.ssn : ''"
                              class="pa-1"
                              label="SSN"
                              placeholder="111-11-1111"
                              :rules="requiredRules"
                              required
                              return-masked-value
                              mask="***-**-****"
                              @input="updateForm('ssn', $event)" />
              </v-layout>
              <v-textarea :value="getCommandInfo ? getCommandInfo.address : ''"
                          label="Address"
                          auto-grow
                          rows="1"
                          :rules="requiredRules"
                          required
                          @input="updateForm('address', $event)" />
            </v-card-text>
          </v-card>
        </v-card-text>
        <v-divider />
        <v-card-actions>
          <v-spacer />
          <v-btn text
                 @click="closeDialog">
            Cancel
          </v-btn>
          <v-btn color="primary"
                 :disabled="!valid"
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
    getCommandInfo() {
      return this.$store.getters.getCommandInfo;
    },
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
    updateForm(input, value) {
      this.$store.dispatch("updateCommandEditForm", { input, value });
    },
    closeDialog() {
      this.dialog = false;
    },
    submit() {
      this.$refs.form.validate();
      this.$store.dispatch("saveCommandDefaults")
        .then(() => {
          if (!this.$store.getters.isError) {
            this.closeDialog();
          } else {
            // TODO: Handle error
          }
        });
    },
  },
});
</script>
