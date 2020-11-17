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
  loadCommandInfo({ commit }) {
    db.readDatabase().then(response => {
      commit("SET_COMMAND", response.commandInfo);
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
  deleteSailor({ commit, dispatch }, payload) {
    db.deleteSailor(payload).then(response => {
      if (response.error) {
        commit("setError");
        commit("setErrorMsg", response.error?.toString());
        commit("setErrorObj", response);
      }
      dispatch("loadDb");
    });
  },
  addEval({ commit, dispatch }) {
    const form = this.getters.getEvalEditForm;
    const { uuid } = this.getters.getSelectedSailor;
    db.addRecord({ uuid, form }).then(response => {
      if (response.error) {
        commit("setError");
        commit("setErrorMsg", response.error?.toString());
        commit("setErrorObj", response);
      } else {
        dispatch("clearEvalEditForm");
        dispatch("loadDb");
      }
    });
  },
  updateEval({ commit, dispatch }) {
    const form = this.getters.getEvalEditForm;
    const { uuid } = this.getters.getSelectedSailor.uuid;
    db.updateRecord({ uuid, form }).then(response => {
      if (response.error) {
        commit("setError");
        commit("setErrorMsg", response.error?.toString());
        commit("setErrorObj", response);
      } else {
        dispatch("clearEvalEditForm");
        dispatch("loadDb");
      }
    });
  },
  saveCommandDefaults({ commit, dispatch }) {
    const form = this.getters.getSailorEditForm;
    db.saveCommandDefaults(form).then(response => {
      if (response.error) {
        commit("setError");
        commit("setErrorMsg", response.error?.toString());
        commit("setErrorObj", response);
      }
      dispatch("loadCommandInfo");
    });
  },
  setCommandEditForm({ commit }, payload) {
    commit("SET_COMMAND_EDIT_FORM", payload);
  },
  updateCommandEditForm({ commit }, payload) {
    commit("UPDATE_COMMAND_EDIT_FORM", payload);
  },
  clearCommandEditForm({ commit }) {
    commit("CLEAR_COMMAND_EDIT_FORM");
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
  },
  setEvalEditForm({ commit }, payload) {
    commit("SET_EVAL_EDIT_FORM", payload);
  },
  updateEvalEditForm({ commit }, payload) {
    commit("UPDATE_EVAL_EDIT_FORM", payload);
  },
  clearEvalEditForm({ commit }) {
    commit("CLEAR_EVAL_EDIT_FORM");
  },
  exportEval({ commit }, { recordId }) {
    commit("EXPORT_EVAL", { recordId });
  }
};
