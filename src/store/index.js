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
    memberStatus: state => state.defaults.memberStatus,
    promotionStatus: state => state.defaults.promotionStatus,
    ranksAll: state => state.defaults.ranks,
    ranksEnlisted: state => state.defaults.ranks.enlisted,
    ranksOfficer: state => state.defaults.ranks.officer,
  },
  modules: {
    commandInfo,
    forms,
    sailors,
    selected,
  }
});
