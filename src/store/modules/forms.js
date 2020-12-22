import Vue from "vue";

export default {
  state: {
    sailorEdit: {},
    commandEdit: {},
    evalEdit: {},
  },
  mutations: {
    SET_SAILOR_EDIT_FORM(state, payload) {
      state.sailorEdit = payload;
    },
    UPDATE_SAILOR_EDIT_FORM(state, payload) {
      state.sailorEdit[payload.input] = payload.value;
    },
    CLEAR_SAILOR_EDIT_FORM(state) {
      state.sailorEdit = {};
    },
    SET_COMMAND_EDIT_FORM(state, payload) {
      state.commandEdit = payload;
    },
    UPDATE_COMMAND_EDIT_FORM(state, payload) {
      state.commandEdit[payload.input] = payload.value;
    },
    CLEAR_COMMAND_EDIT_FORM(state) {
      state.commandEdit = {};
    },
    SET_EVAL_EDIT_FORM(state, payload) {
      state.evalEdit = payload;
    },
    UPDATE_EVAL_EDIT_FORM(state, payload) {
      Vue.set(state.evalEdit, payload.input, payload.value);
    },
    CLEAR_EVAL_EDIT_FORM(state) {
      state.evalEdit = {};
    },
  },
  getters: {
    getSailorEditForm: state => state.sailorEdit,
    getCommandEditForm: state => state.commandEdit,
    getEvalEditForm: state => state.evalEdit,
  },
};
