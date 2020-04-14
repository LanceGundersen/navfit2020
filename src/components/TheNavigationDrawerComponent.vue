<template>
  <v-navigation-drawer v-model="drawer"
                       app
                       left
                       width="auto"
                       class="pa-2">
    <v-text-field v-model="search"
                  label="Search Sailors"
                  hide-details
                  clearable
                  clear-icon="mdi-close"
                  disabled />
    <v-treeview shaped
                hoverable
                dense
                min-width="250px"
                :items="sailors">
      <template slot="label"
                slot-scope="{ item }">
        <span class="d-flex flex-nowrap justify-space-between align-center">
          <span class="pr-4"
                :class="item.uuid ? 'pointer' : null"
                @click="viewSailorDetail(item.uuid)">
            {{ item.name }}
          </span>
          <v-btn v-if="item.uuid"
                 icon
                 small
                 @click.stop="deleteSailor(item.uuid)">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </span>
      </template>
    </v-treeview>
    <TheDeleteSailorDialogComponent v-model="showDeleteSailorDialog"
                                    :uuid="uuid" />
  </v-navigation-drawer>
</template>

<script>
import Vue from "vue";
import TheDeleteSailorDialogComponent from "./TheDeleteSailorDialogComponent";

export default Vue.extend({
  name: "TheNavigationDrawerComponent",
  components: {
    TheDeleteSailorDialogComponent,
  },
  props: {
    value: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  data: () => ({
    showDeleteSailorDialog: false,
    uuid: null,
    search: null,
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
    sailors() {
      return [
        {
          id: 1,
          name: "Enlisted",
          children: this.$store.getters.enlistedSummaryList || [],
        },
        {
          id: 2,
          name: "Officer",
          children: this.$store.getters.officerSummaryList || [],
        },
      ];
    },
  },
  methods: {
    viewSailorDetail(givenUuid) {
      this.$router.push({ name: "detail", params: { uuid: givenUuid } });
      this.$store.dispatch("setSelectedSailor", this.$router.currentRoute.params);
    },
    deleteSailor(givenUuid) {
      this.uuid = givenUuid;
      this.showDeleteSailorDialog = true;
    },
  },
});
</script>

<style lang="sass">
  .pointer
    cursor: pointer
</style>
