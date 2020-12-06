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
    SHOW_DIALOG: state => { state.app.dialog.show = true; },
    SET_DIALOG_INFO: (state, payload) => {
      state.app.dialog.title = payload.title;
      state.app.dialog.msg = payload.msg;
      state.app.dialog.error = payload.error;
      state.app.dialog.filePath = payload.filePath;
      state.app.dialog.type = payload.type;
    },
    DISMISS_DIALOG: state => { state.app.dialog = { show: false, title: "", msg: "", path: "", type: "info" }; },
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
