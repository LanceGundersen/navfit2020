export default {
  state: {
    sailorEdit: {},
    sailorAdd: {},
  },
  mutations: {
    SET_SAILOR_EDIT_FORM(state, payload) {
      state.sailorEdit = payload;
    },
    SET_SAILOR_ADD_FORM(state) {
      state.sailorAdd = {};
    },
    RESET_SAILOR_ADD_FORM(state) {
      state.sailorAdd = {};
    },
  },
  getters: {
    getSailorAddForm: state => state.sailorAdd,
    getSailorEditForm: state => state.sailorEdit,
  },
};
