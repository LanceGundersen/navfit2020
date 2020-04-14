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
  addSailor({ commit }) {
    db.addSailor(this.getters.getSailorAddForm).then(response => {
      commit("SET_SAILORS", response);
    });
  },
  updateSailor({ commit }, payload) {
    db.updateSailor({ uuid: this.getters.getSailorEditForm.uuid, form: payload }).then(response => {
      commit("SET_SAILORS", response);
    });
  },
  deleteSailor({ dispatch }, payload) {
    db.deleteSailor(payload);
    dispatch("loadDb");
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
  setSelectedSailor({ commit }, { uuid }) {
    const sailorData = this.getters.getSailorById(uuid);
    commit("SET_SELECTED_SAILOR", sailorData);
    commit("SET_SAILOR_EDIT_FORM", sailorData);
  },
  setSailorAddForm({ commit }) {
    commit("SET_SAILOR_ADD_FORM");
  },
  clearSailorAddForm({ commit }) {
    commit("RESET_SAILOR_ADD_FORM");
  },
};
