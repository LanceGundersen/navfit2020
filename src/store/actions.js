const db = {};

export default {
  loadDb({ commit }) {
    window.ipcRenderer.send("db:load");
    window.ipcRenderer.on("db:loaded", (event, args) => {
      if (args.commandInfo) {
        commit("SET_COMMAND", args.commandInfo);
      }
      commit("SET_SAILORS", args.sailors);
    });
  },
  loadCommandInfo({ commit }) {
    db.readDatabase().then(response => {
      commit("SET_COMMAND", response.commandInfo);
    });
  },
  addSailor({ commit, dispatch }) {
    const form = this.getters.getSailorEditForm;
    window.ipcRenderer.send("db:add:sailor", form);
    window.ipcRenderer.on("db:add:sailor:result", (_, args) => {
      if (args.error) {
        commit("setError");
        commit("setErrorMsg", args.error.toString());
        commit("setErrorObj", args);
      }
      dispatch("loadDb").then(() => {
        dispatch("setSelectedSailor", args.uuid);
      });
    });
  },
  updateSailor({ commit, dispatch }) {
    const form = this.getters.getSailorEditForm;
    db.updateSailor(form).then(response => {
      if (response.error) {
        commit("setError");
        commit("setErrorMsg", response.error.toString());
        commit("setErrorObj", response);
      }
      dispatch("loadDb");
    });
  },
  deleteSailor({ commit, dispatch }, payload) {
    db.deleteSailor(payload).then(response => {
      if (response.error) {
        commit("setError");
        commit("setErrorMsg", response.error.toString());
        commit("setErrorObj", response);
      }
      dispatch("loadDb");
    });
  },
  addEval({ commit, dispatch }) {
    const { uuid } = this.getters.getSelectedSailor;
    const form = {
      ...this.getters.getEvalEditForm,
      command: { ...this.getters.getCommandInfo },
    };

    db.addRecord({ uuid, form }).then(response => {
      if (response.error) {
        commit("setError");
        commit("setErrorMsg", response.error.toString());
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
        commit("setErrorMsg", response.error.toString());
        commit("setErrorObj", response);
      } else {
        dispatch("clearEvalEditForm");
        dispatch("loadDb");
      }
    });
  },
  saveCommandDefaults({ commit, dispatch }) {
    const form = this.getters.getCommandEditForm;
    db.saveCommandDefaults(form).then(response => {
      if (response.error) {
        commit("setError");
        commit("setErrorMsg", response.error.toString());
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
  },
  openFeedbackForm() {
    window.ipcRenderer.send("open:feedback");
  }
};
