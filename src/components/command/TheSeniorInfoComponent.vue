<template>
  <v-card v-show="showSeniorInfo"
          outlined
          class="mb-2">
    <v-card-subtitle>Reporting Senior</v-card-subtitle>
    <v-form ref="edit"
            v-model="valid">
      <v-card-text>
        <v-layout>
          <v-text-field :input="edit.length
                          ? edit.commandInfo.lastName : getCommandInfo
                            ? getCommandInfo.lastName : ''"
                        class="pa-1"
                        label="Last Name"
                        :rules="requiredRules"
                        required />
          <v-text-field :input="edit.length
                          ? edit.commandInfo.firstName : getCommandInfo
                            ? getCommandInfo.firstName : ''"
                        class="pa-1"
                        label="First Name"
                        :rules="requiredRules"
                        required />
          <v-text-field :input="edit.length
                          ? edit.commandInfo.middleInitial : getCommandInfo
                            ? getCommandInfo.middleInitial : ''"
                        class="pa-1"
                        label="Middle Initial (optional)" />
        </v-layout>
        <v-layout>
          <v-text-field :input="edit.length
                          ? edit.commandInfo.grade : getCommandInfo
                            ? getCommandInfo.grade : ''"
                        class="pa-1"
                        label="Grade"
                        :rules="requiredRules"
                        required />
          <v-text-field :input="edit.length
                          ? edit.commandInfo.designation : getCommandInfo
                            ? getCommandInfo.designation : ''"
                        class="pa-1"
                        label="Designation"
                        :rules="requiredRules"
                        required />
          <v-text-field :input="edit.length
                          ? edit.commandInfo.title : getCommandInfo
                            ? getCommandInfo.title : ''"
                        class="pa-1"
                        label="Title"
                        :rules="requiredRules"
                        required />
          <v-text-field :input="edit.length
                          ? edit.commandInfo.reportingSeniorUic : getCommandInfo
                            ? getCommandInfo.reportingSeniorUic : ''"
                        label="UIC (if different)"
                        class="pa-1" />
          <v-text-field :input="edit.length
                          ? edit.commandInfo.ssn : getCommandInfo
                            ? getCommandInfo.ssn : ''"
                        class="pa-1"
                        label="SSN"
                        placeholder="111-11-1111"
                        :rules="requiredRules"
                        required />
        </v-layout>
        <v-textarea :input="edit.length
                      ? edit.commandInfo.address : getCommandInfo
                        ? getCommandInfo.address : ''"
                    label="Address"
                    auto-grow
                    rows="1"
                    :rules="requiredRules"
                    required />
      </v-card-text>
    </v-form>
  </v-card>
</template>

<script>
export default {
  name: "TheSeniorInfoComponentVue",
  props: {
    value: {
      type: Boolean,
      required: false,
      default: true,
    },
    edit: {
      type: Object,
      required: false,
      default: null,
    }
  },
  emits: ["input"],
  data: () => ({
    valid: false,
    requiredRules: [
      v => !!v || "Is required",
    ],
  }),
  computed: {
    showSeniorInfo: {
      get() {
        return this.value;
      },
      set(newValue) {
        this.$emit("input", newValue);
      },
    },
    getCommandInfo() {
      return this.$store.getters.getCommandInfo;
    },
  },
};
</script>

<style scoped>

</style>
