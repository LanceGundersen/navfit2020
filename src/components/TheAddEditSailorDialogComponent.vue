<template>
  <v-dialog v-model="dialog"
            persistent
            max-width="75%">
    <v-card class="ma-0">
      <v-card-title>
        {{ edit ? 'Edit' : 'Add' }} Sailor
      </v-card-title>
      <v-form ref="form"
              v-model="valid">
        <v-card-text>
          <v-row>
            <v-col>
              <v-text-field v-model="form.lastName"
                            value="this.getSailorEditForm.lastName"
                            class="pa-1"
                            label="Last Name"
                            required />
              <v-text-field v-model="form.firstName"
                            class="pa-1"
                            label="First Name"
                            :rules="requiredRules"
                            required />
              <v-text-field v-model="form.middleInitial"
                            class="pa-1"
                            label="Middle Initial (optional)" />
              <v-select v-model="form.rank"
                        :items="ranks"
                        label="Rank"
                        :rules="ranksRequired"
                        required />
            </v-col>
            <v-col>
              <v-text-field v-model="form.ssn"
                            class="pa-1"
                            label="SSN (optional)"
                            placeholder="111-11-1111" />
              <v-select v-model="form.memberStatus"
                        :items="memberStatus"
                        class="pa-1"
                        label="Member Status (optional)">
                <template v-slot:selection="{ item }">
                  <span>{{ item }}</span>
                </template>
              </v-select>
              <v-text-field v-model="form.rate"
                            class="pa-1"
                            label="Designation (optional)"
                            placeholder="BM3" />
              <v-text-field v-model="form.designation"
                            class="pa-1"
                            label="Warfare (optional)"
                            placeholder="ESWS/SS" />
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
            {{ edit ? 'Edit' : 'Add' }} Sailor
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  name: "TheAddEditSailorDialogComponent",
  props: {
    value: {
      type: Boolean,
      required: false,
      default: true,
    },
    edit: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data: () => ({
    valid: false,
    form: {
      lastName: null,
      firstName: null,
      middleInitial: null,
      rank: null,
      officer: null,
      rate: null,
      designation: null,
      ssn: null,
      memberStatus: null,
    },
    requiredRules: [
      v => !!v || "Is required",
    ],
    ranksRequired: [
      v => !!v || "Rank is required",
    ],
  }),
  computed: {
    dialog: {
      get() {
        return this.value;
      },
      set(newValue) {
        this.$emit("input", newValue);
      }
    },
    memberStatus() {
      return this.$store.getters.memberStatuses;
    },
    ranks() {
      return this.$store.getters.ranksEnlisted;
    },
    getCommandInfo() {
      return this.$store.getters.getCommandInfo;
    },
    getSailorEditForm() {
      return this.$store.getters.getSailorEditForm;
    }
  },
  beforeUpdate() {
    this.form = this.getSailorEditForm;
  },
  methods: {
    submit() {
      this.$refs.form.validate();
      if (this.edit) {
        this.$store.dispatch("updateSailor", this.form)
          .then(() => {
            if (!this.$store.getters.isError) {
              this.dialog = false;
              this.$refs.form.reset();
            }
          });
      }
      this.$store.dispatch("addSailor", this.form)
        .then(() => {
          if (!this.$store.getters.isError) {
            this.$router.push({ name: "detail", params: { uuid: this.$store.getters.getSelectedSailor.uuid } }).catch(() => {});
            this.dialog = false;
            this.$refs.form.reset();
          }
        });
    },
  },
});
</script>
