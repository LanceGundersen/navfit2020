<template>
  <div>
    <v-app-bar app
               dense
               color="indigo white--text">
      <v-app-bar-nav-icon color="white"
                          @click.stop="showNavigationDrawer = !showNavigationDrawer" />
      <v-avatar class="mr-2">
        <img :src="require('../static/logo.png')">
      </v-avatar>
      <v-toolbar-title>
        NavFit 2020
        <span class="subtitle-2 orange--text text--lighten-2">ALPHA PRE-RELEASE</span>
      </v-toolbar-title>
      <v-spacer />
      <v-btn text
             tile
             color="white"
             @click.stop="showAddEditSailorDialog()">
        Add Sailor
      </v-btn>
      <v-btn icon
             color="white"
             @click.stop="showCommandDefaultsDialog()">
        <v-icon>mdi-cog</v-icon>
      </v-btn>
    </v-app-bar>
    <TheNavigationDrawerComponent v-model="showNavigationDrawer" />
    <TheAddSailorDialogComponent v-model="showAddSailorDialog" />
    <TheDefaultsDialogComponent v-model="showDefaultsDialog" />
  </div>
</template>

<script>
import Vue from "vue";
import TheNavigationDrawerComponent from "./TheNavigationDrawerComponent";
import TheAddSailorDialogComponent from "./TheAddEditSailorDialogComponent";
import TheDefaultsDialogComponent from "./TheDefaultsDialogComponent";

export default Vue.extend({
  name: "TheAppBarComponent",
  components: {
    TheNavigationDrawerComponent,
    TheAddSailorDialogComponent,
    TheDefaultsDialogComponent,
  },
  props: {
    type: {
      type: String,
      default: "",
    },
  },
  data: () => ({
    showNavigationDrawer: false,
    showAddSailorDialog: false,
    showDefaultsDialog: false,
  }),
  computed: {
    drawer: {
      get() {
        return this.value;
      },
      set(newValue) {
        this.$emit("input", newValue);
      },
    },
  },
  methods: {
    showAddEditSailorDialog() {
      this.$store.dispatch("clearSailorEditForm").then(() => {
        this.showAddSailorDialog = !this.showAddSailorDialog;
      });
    },
    showCommandDefaultsDialog() {
      this.showDefaultsDialog = !this.showDefaultsDialog;
    }
  }
});
</script>
