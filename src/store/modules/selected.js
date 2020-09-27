export default {
  state: {
    sailor: {},
  },
  mutations: {
    SET_SELECTED_SAILOR(state, payload) {
      state.sailor = payload;
    },
  },
  getters: {
    getSelectedSailor: state => state.sailor,
  },
};
