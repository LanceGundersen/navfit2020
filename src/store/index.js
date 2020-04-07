import Vue from "vue";
import Vuex from "vuex";
import { getField, updateField } from "vuex-map-fields";
import db from "./db";
import INITIAL_STATE from "./state";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== "production",
  state: INITIAL_STATE,
  mutations: {
    updateField,
    setState(state, payload) {
      Vue.set(state.defaults.ranks, payload.defaults.ranks, payload.defaults.ranks);
      Vue.set(state.defaults.memberStatus, payload.defaults.memberStatus, payload.defaults.memberStatus);
      Vue.set(state.defaults.promotionStatus, payload.defaults.promotionStatus, payload.defaults.promotionStatus);
      state.sailors = payload.sailors;
    },
    setSailorForm(state, payload) {
      Vue.set(state.forms, "sailor", payload);
    },
    clearSailorForm(state) {
      Vue.set(state.forms, "sailor", {});
    },
  },
  actions: {
    loadDb({ commit }) {
      commit("setState", db.readDatabase());
    },
    addSailor({ dispatch }) {
      db.addSailor(this.getters.getFormSailor);
      dispatch("loadDb");
    },
    updateSailor({ dispatch }) {
      db.updateSailor({ uuid: this.getters.getFormSailor.uuid, form: this.getters.getFormSailor });
      dispatch("loadDb");
    },
    deleteSailor({ dispatch }, payload) {
      db.deleteSailor(payload);
      dispatch("loadDb");
    },
    addRecord({ dispatch }, payload) {
      db.addRecord(payload);
      dispatch("loadDb");
    },
    setSelectedSailor({ commit }, payload) {
      commit("setSailorForm", this.getters.getSailorById(payload));
    },
    clearSelectedSailor({ commit }) {
      commit("clearSailorForm");
    },
  },
  getters: {
    getField,
    memberStatus: state => state.defaults.memberStatus,
    promotionStatus: state => state.defaults.promotionStatus,
    ranksAll: state => state.defaults.ranks,
    ranksEnlisted: state => state.defaults.ranks.filter(rank => rank.charAt(0) === "E"),
    ranksOfficer: state => state.defaults.ranks.filter(rank => rank.charAt(0) === "O"),
    enlistedSummaryList: state => state.sailors?.filter(sailor => !sailor.officer).map(sailor => ({
      uuid: sailor.uuid,
      name: `${sailor.lastName}, ${sailor.firstName} : ${sailor.rank}`
    })),
    officerSummaryList: state => state.sailors?.filter(sailor => sailor.officer).map(sailor => ({
      uuid: sailor.uuid,
      name: `${sailor.lastName}, ${sailor.firstName} : ${sailor.rank}`
    })),
    getSailorById: state => givenUuid => state.sailors.find(sailor => sailor.uuid === givenUuid),
    getRecordsById: state => givenUuid => state.sailors.find(sailor => sailor.uuid === givenUuid).records || null,
    getFormSailor: state => state.forms.sailor,
  },
  modules: {}
});
