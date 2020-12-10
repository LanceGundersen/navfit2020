export default {
  state: {
    sailor: {},
  },
  mutations: {
    SET_SELECTED_SAILOR(state, payload) {
      state.sailor = payload;
    },
    CLEAR_SELECTED_SAILOR(state) {
      state.sailor = {};
    }
  },
  getters: {
    getSelectedSailor: state => state.sailor,
    getSelectedSailorId: state => state.sailor.uuid,
  },
};
