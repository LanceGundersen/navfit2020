export default {
  state: {
    sailor: {},
  },
  mutations: {
    SET_SELECTED_SAILOR(state, payload) {
      state.sailor = payload;
    },
    ADD_SELECTED_SAILOR_RECORD(state, payload) {
      state.sailor.records.push(payload);
    },
    REMOVE_SELECTED_SAILOR_RECORD(state, payload) {
      state.sailor.records = state.sailor.records.filter(record => record.id !== payload);
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
