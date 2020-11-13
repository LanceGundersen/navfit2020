<template>
  <v-navigation-drawer v-model="defaultsDrawer"
                       absolute
                       temporary
                       left>
    <v-list>
      <v-subheader>
        Command Info
        <v-spacer />
        <v-btn small
               icon
               color="warning"
               @click.stop="showCommandDefaults()">
          <v-icon small>
            mdi-pencil
          </v-icon>
        </v-btn>
      </v-subheader>
      {{ getCommandInfo }}
      <v-divider />
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>Ship/Station</v-list-item-title>
          <v-list-item-subtitle>{{ getCommandInfo ? getCommandInfo.shipStation : '' }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>UIC</v-list-item-title>
          <v-list-item-subtitle>{{ getCommandInfo ? getCommandInfo.uic : '' }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-subheader>
        Reporting Senior Info
        <v-spacer />
        <v-btn small
               icon
               color="warning"
               @click="showReportingSeniorDefaults()">
          <v-icon small>
            mdi-pencil
          </v-icon>
        </v-btn>
      </v-subheader>
      <v-divider />
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>Grade</v-list-item-title>
          <v-list-item-subtitle>{{ getCommandInfo ? getCommandInfo.grade : '' }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>Name</v-list-item-title>
          <v-list-item-subtitle>
            {{ getCommandInfo ? getCommandInfo.lastName : '' }},
            {{ getCommandInfo ? getCommandInfo.firstName : '' }},
            {{ getCommandInfo ? getCommandInfo.middleInitial : '' }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "TheDefaultsDrawerComponentVue",
  props: {
    value: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  data: () => ({
    showCommandInfo: false,
    showSeniorInfo: false,
  }),
  computed: {
    defaultsDrawer: {
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
  methods: {
    showCommandDefaults() {
      this.showCommandInfo = !this.showCommandInfo;
      this.defaultsDrawer = !this.defaultsDrawer;
    },
    showReportingSeniorDefaults() {
      this.showSeniorInfo = !this.showSeniorInfo;
      this.defaultsDrawer = !this.defaultsDrawer;
    },
  }
};
</script>

<style scoped>

</style>
