import db from "./db";

export default {
  loadDb({ commit }) {
    db.readDatabase().then(response => {
      if (response.commandInfo) {
        commit("SET_COMMAND", response.commandInfo);
      }
      commit("SET_SAILORS", response.sailors);
    });
  },
  addSailor({ commit, dispatch }, payload) {
    db.addSailor(payload).then(response => {
      if (response.error) {
        commit("setError");
        commit("setErrorMsg", response.error?.toString());
        commit("setErrorObj", response);
      }
      dispatch("loadDb");
      dispatch("setSelectedSailor", response.uuid);
    });
  },
  updateSailor({ commit, dispatch }, payload) {
    db.updateSailor(payload).then(response => {
      if (response.error) {
        commit("setError");
        commit("setErrorMsg", response.error?.toString());
        commit("setErrorObj", response);
      }
      dispatch("loadDb");
    });
  },
  deleteSailor({ commit }, payload) {
    db.deleteSailor(payload).then(response => {
      commit("SET_SAILORS", { sailors: response });
    });
  },
  addRecord({ dispatch }, payload) {
    db.addRecord(payload);
    dispatch("loadDb");
  },
  saveCommandDefaults({ commit }, payload) {
    db.saveCommandDefaults(payload).then(response => {
      commit("SET_COMMAND_INFO", response);
    });
  },
  setSelectedSailor({ commit }, uuid) {
    const sailorData = this.getters.getSailorById(uuid);
    commit("SET_SELECTED_SAILOR", sailorData);
  },
  setSailorEditForm({ commit }, uuid) {
    const sailorData = this.getters.getSailorById(uuid);
    delete sailorData.records;
    commit("SET_SAILOR_EDIT_FORM", sailorData);
  },
};
