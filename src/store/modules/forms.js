export default {
  state: {
    sailorEdit: {},
  },
  mutations: {
    SET_SAILOR_EDIT_FORM(state, payload) {
      state.sailorEdit = payload;
    },
  },
  getters: {
    getSailorEditForm: state => state.sailorEdit,
  },
};
