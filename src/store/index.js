import Vue from "vue";
import Vuex from "vuex";
import { getField, updateField } from "vuex-map-fields";
import actions from "./actions";
import commandInfo from "./modules/commandInfo";
import forms from "./modules/forms";
import sailors from "./modules/sailors";
import selected from "./modules/selected";
import INITIAL_STATE from "./state";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== "production",
  state: INITIAL_STATE,
  mutations: {
    updateField,
  },
  actions,
  getters: {
    getField,
    memberStatuses: state => state.defaults.memberStatuses,
    promotionStatuses: state => state.defaults.promotionStatuses,
    ranksAll: state => state.defaults.ranks,
    ranksEnlisted: state => state.defaults.ranks.enlisted,
    ranksOfficer: state => state.defaults.ranks.officer,
    traits: state => state.defaults.traits,
    promotionRecommendations: state => state.defaults.promotionRecommendations,
    fonts: state => state.defaults.fonts,
    physicalReadiness: state => state.defaults.physicalReadiness,
    reportTypes: state => state.defaults.reportTypes,
    reportOccasions: state => state.defaults.reportOccasions,
  },
  modules: {
    commandInfo,
    forms,
    sailors,
    selected,
  }
});
