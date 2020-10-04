export default {
  state: {
    sailorEdit: {},
    commandEdit: {},
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
    }
  },
  getters: {
    getSailorEditForm: state => state.sailorEdit,
    getCommandEditForm: state => state.commandEdit,
  },
};
