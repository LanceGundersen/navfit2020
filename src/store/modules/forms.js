export default {
  state: {
    sailorEdit: {},
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
    }
  },
  getters: {
    getSailorEditForm: state => state.sailorEdit,
  },
};
