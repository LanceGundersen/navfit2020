<template>
  <v-card v-show="showCommandInfo"
          outlined
          class="mb-2">
    <v-card-subtitle>Command Info</v-card-subtitle>
    <v-form ref="edit"
            v-model="valid">
      <v-card-text>
        <v-layout>
          <v-text-field :input="edit
                          ? edit.commandInfo.uic : getCommandInfo
                            ? getCommandInfo.uic : ''"
                        class="pa-1"
                        label="UIC"
                        :rules="requiredRules"
                        required />
          <v-text-field :input="edit
                          ? edit.commandInfo.shipStation : getCommandInfo
                            ? getCommandInfo.shipStation : ''"
                        class="pa-1"
                        label="Ship/Station"
                        :rules="requiredRules"
                        required />
        </v-layout>
        <v-textarea :input="edit
                      ? edit.commandInfo.commandDescription : getCommandInfo
                        ? getCommandInfo.commandDescription : ''"
                    class="pa-1"
                    auto-grow
                    rows="1"
                    label="Command Employment and Command Achievements"
                    :rules="requiredRules"
                    required />
      </v-card-text>
    </v-form>
  </v-card>
</template>

<script>
export default {
  name: "TheCommandInfoComponentVue",
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
  data: () => ({
    valid: false,
    requiredRules: [
      v => !!v || "Is required",
    ],
  }),
  computed: {
    showCommandInfo: {
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
