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
    UPDATE_SELECTED_SAILOR_RECORD(state, payload) {
      const recordIndex = state.sailor.records.indexOf(payload.id);
      state.sailor.records.splice(recordIndex, 1, payload);
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
