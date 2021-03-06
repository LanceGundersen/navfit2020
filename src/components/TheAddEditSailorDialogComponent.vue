<template>
  <v-dialog v-model="dialog"
            persistent
            max-width="75%">
    <v-card class="ma-0">
      <v-card-title>
        {{ sailor ? 'Edit' : 'Add' }} Sailor
      </v-card-title>
      <v-form ref="form"
              v-model="valid">
        <v-card-text>
          <v-row>
            <v-col>
              <v-text-field :value="sailor ? sailor.lastName : ''"
                            class="pa-1"
                            label="Last Name"
                            required
                            @input="updateForm('lastName', $event)" />
              <v-text-field :value="sailor ? sailor.firstName : ''"
                            class="pa-1"
                            label="First Name"
                            :rules="requiredRules"
                            required
                            @input="updateForm('firstName', $event)" />
              <v-text-field :value="sailor ? sailor.middleInitial : ''"
                            class="pa-1"
                            label="Middle Initial (optional)"
                            @input="updateForm('middleInitial', $event)" />
              <v-select :value="sailor ? sailor.rank : ''"
                        :items="ranks"
                        item-text="display"
                        label="Rank"
                        :rules="ranksRequired"
                        return-object
                        required
                        @change="updateForm('rank', $event)" />
            </v-col>
            <v-col>
              <TheDatePickerComponent :datestr="sailor && sailor.dateReported ? sailor.dateReported : ''"
                                      :label="'Date Reported'"
                                      @date-string="updateForm('dateReported', $event)" />
              <v-text-field :value="sailor ? sailor.ssn : ''"
                            class="pa-1"
                            label="SSN"
                            counter="9"
                            :rules="countRequired"
                            placeholder="#########"
                            @input="updateForm('ssn', $event)" />
              <v-select :value="sailor ? sailor.memberStatus : ''"
                        :items="memberStatuses"
                        class="pa-1"
                        label="Member Status"
                        @change="updateForm('memberStatus', $event)" />
              <v-text-field :value="sailor ? sailor.rate : ''"
                            class="pa-1"
                            label="Rate"
                            placeholder="BM3"
                            :rules="requiredRules"
                            required
                            @input="updateForm('rate', $event)" />
              <v-text-field :value="sailor ? sailor.designation : ''"
                            class="pa-1"
                            label="Warfare (optional)"
                            placeholder="ESWS/SS"
                            @input="updateForm('designation', $event)" />
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn text
                 @click="closeDialog()">
            Cancel
          </v-btn>
          <v-btn color="primary"
                 :disabled="!valid"
                 @click="submit">
            {{ sailor ? 'Edit' : 'Add' }} Sailor
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import Vue from "vue";
import TheDatePickerComponent from "@/components/shared/SharedDatePickerComponent";

export default Vue.extend({
  name: "TheAddEditSailorDialogComponent",
  components: {
    TheDatePickerComponent,
  },
  props: {
    value: {
      type: Boolean,
      required: false,
      default: true,
    },
    sailor: {
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
    ranksRequired: [
      v => !!v || "Rank is required",
    ],
    countRequired: [
      v => v.length <= 9 || "Max of 9 Numbers",
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
    memberStatuses() {
      return this.$store.getters.memberStatuses;
    },
    ranks() {
      return this.$store.getters.ranks;
    },
    getCommandInfo() {
      return this.$store.getters.getCommandInfo;
    },
    getSailorEditForm() {
      return this.$store.getters.getSailorEditForm;
    },
  },
  methods: {
    updateForm(input, value) {
      this.$store.dispatch("updateSailorEditForm", { input, value });
    },
    closeDialog() {
      this.dialog = false;
    },
    submit() {
      this.$refs.form.validate();
      if (this.sailor) {
        this.$store.dispatch("updateSailor")
          .then(() => {
            if (!this.$store.getters.isError) {
              this.closeDialog();
            } else {
              // TODO: Handle error
            }
          });
      } else {
        this.$store.dispatch("addSailor");
        this.closeDialog();
      }
    },
  },
});
</script>
