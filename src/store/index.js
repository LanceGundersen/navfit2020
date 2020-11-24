import Vue from "vue";
import Vuex from "vuex";
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
    setError: state => { state.app.isError = !state.app.isError; },
    setErrorMsg: (state, payload) => { state.app.errorMsg = payload; },
    setErrorObj: (state, payload) => { state.app.errorObj = { ...payload }; },
  },
  actions,
  getters: {
    isError: state => state.app.isError,
    errorMsg: state => state.app.errorMsg,
    memberStatuses: state => state.defaults.memberStatuses,
    promotionStatuses: state => state.defaults.promotionStatuses,
    ranksAll: state => state.defaults.ranks,
    ranksEnlisted: state => state.defaults.ranks.enlisted,
    ranksOfficer: state => state.defaults.ranks.officer,
    traits: state => state.defaults.traits,
    promotionRecommendations: state => state.defaults.promotionRecommendations,
    fonts: state => state.defaults.fonts,
    physicalReadiness: state => state.defaults.physicalReadiness,
    billetSubcategory: state => state.defaults.billetSubcategory,
    reportTypes: state => state.defaults.reportTypes,
    reportOccasions: state => state.defaults.reportOccasions,
  },
  modules: {
    commandInfo,
    forms,
    sailors,
    selected,
  },
});
