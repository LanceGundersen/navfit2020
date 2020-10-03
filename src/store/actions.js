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
  addSailor({ commit, dispatch }) {
    const form = this.getters.getSailorEditForm;
    db.addSailor(form).then(response => {
      if (response.error) {
        commit("setError");
        commit("setErrorMsg", response.error?.toString());
        commit("setErrorObj", response);
      }
      dispatch("loadDb").then(() => {
        dispatch("setSelectedSailor", response.uuid);
      });
    });
  },
  updateSailor({ commit, dispatch }) {
    const form = this.getters.getSailorEditForm;
    db.updateSailor(form).then(response => {
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
  addRecord({ commit, dispatch }, payload) {
    db.addRecord(payload).then(response => {
      if (response.error) {
        commit("setError");
        commit("setErrorMsg", response.error?.toString());
        commit("setErrorObj", response);
      }
      dispatch("loadDb");
    });
  },
  saveCommandDefaults({ commit }, payload) {
    db.saveCommandDefaults(payload).then(response => {
      commit("SET_COMMAND_INFO", response);
    });
  },
  setSelectedSailor({ commit }, uuid) {
    const sailorData = this.getters.getSailorById(uuid);
    commit("SET_SELECTED_SAILOR", sailorData);
    commit("SET_SAILOR_EDIT_FORM", sailorData);
  },
  setSailorEditForm({ commit }, payload) {
    commit("SET_SAILOR_EDIT_FORM", payload);
  },
  updateSailorEditForm({ commit }, payload) {
    commit("UPDATE_SAILOR_EDIT_FORM", payload);
  },
  clearSailorEditForm({ commit }) {
    commit("CLEAR_SAILOR_EDIT_FORM");
  }
};
