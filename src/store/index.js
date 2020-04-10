import Vue from "vue";
import Vuex from "vuex";
import { getField, updateField } from "vuex-map-fields";
import INITIAL_STATE from "./state";
import actions from "./actions";
import forms from "./modules/forms";
import selected from "./modules/selected";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== "production",
  state: INITIAL_STATE,
  mutations: {
    updateField,
    SET_DEFAULTS(state, payload) {
      state.defaults = payload;
    },
    SET_COMMAND(state, payload) {
      state.commandInfo = payload;
    },
    SET_SAILORS(state, payload) {
      state.sailors = payload;
    },
    SET_COMMAND_INFO(state, payload) {
      state.commandInfo = payload;
    },
  },
  actions,
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
    getCommandInfo: state => state.commandInfo,
  },
  modules: {
    forms,
    selected,
  }
});
