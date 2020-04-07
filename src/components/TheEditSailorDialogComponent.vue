<template>
  <v-dialog v-model="dialog"
            persistent
            max-width="75%">
    <v-card class="pa-4">
      <v-card-title>
        Edit {{ rate }} {{ lastName }}, {{ firstName }}
      </v-card-title>
      <v-card-text>
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
        <v-select v-model="rank"
                  :items="ranks"
                  label="Rank"
                  :rules="ranksRequired"
                  required />
        <v-text-field v-model="ssn"
                      class="pa-1"
                      label="SSN (optional)"
                      placeholder="111-11-1111" />
        <v-select v-model="memberStatus"
                  :items="memberStatus"
                  class="pa-1"
                  label="Member Status (optional)">
          <template v-slot:selection="{ item }">
            <span>{{ item }}</span>
          </template>
        </v-select>
        <v-text-field v-if="!officer"
                      v-model="rate"
                      class="pa-1"
                      label="Designation (optional)"
                      placeholder="BM3" />
        <v-text-field v-if="!officer"
                      v-model="designation"
                      class="pa-1"
                      label="Rate (optional)"
                      placeholder="ESWS/SS" />
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn text
               @click="dialog = false">
          Cancel
        </v-btn>
        <v-btn color="primary"
               @click="submit">
          Save Sailor
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import Vue from "vue";
import { mapFields } from "vuex-map-fields";

export default Vue.extend({
  name: "TheAddSailorDialogComponent",
  props: {
    value: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  data: () => ({
    requiredRules: [
      v => !!v || "Is required",
    ],
    ranksRequired: [
      v => !!v || "Rank is required",
    ],
  }),
  computed: {
    ...mapFields([
      "forms.sailor.firstName",
      "forms.sailor.lastName",
      "forms.sailor.middleInitial",
      "forms.sailor.rank",
      "forms.sailor.officer",
      "forms.sailor.rate",
      "forms.sailor.designation",
      "forms.sailor.ssn",
      "forms.sailor.memberStatus",
    ]),
    dialog: {
      get() {
        return this.value;
      },
      set(newValue) {
        this.$emit("input", newValue);
      }
    },
    memberStatus: {
      get() {
        return this.$store.getters.memberStatus;
      },
    },
    ranks() {
      return this.$store.getters.ranksAll;
    }
  },
  methods: {
    submit() {
      this.$store.dispatch("updateSailor");
      this.dialog = false;
    },
  },
});
</script>
