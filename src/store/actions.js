import router from "@/router";

export default {
  routeToSelectedSailor() {
    const uuid = this.getters.getSelectedSailorId;
    router.push({
      name: "detail",
      params: { uuid }
    });
  },
  routeToHome() {
    router.push({ name: "home" });
  },
  loadApp() {
    window.ipcRenderer.send("app:load");
  },
  loadDb({ commit }) {
    window.ipcRenderer.send("db:load");
    window.ipcRenderer.once("db:loaded", (event, args) => {
      if (args.commandInfo) {
        commit("SET_COMMAND", args.commandInfo);
      }
      commit("SET_SAILORS", args.sailors);
    });
  },
  addSailor({ commit, dispatch }) {
    const form = this.getters.getSailorEditForm;
    window.ipcRenderer.send("db:add:sailor", form);
    window.ipcRenderer.once("db:add:sailor:result", (event, args) => {
      dispatch("loadDb");
      commit("SET_SELECTED_SAILOR", { ...args });
      commit("SET_SAILOR_EDIT_FORM", { ...args });
      dispatch("routeToSelectedSailor");
    });
    window.ipcRenderer.once("dialog:show", (event, args) => {
      commit("SET_DIALOG_INFO", args);
      commit("SHOW_DIALOG");
    });
  },
  updateSailor({ commit, dispatch }) {
    const form = this.getters.getSailorEditForm;
    window.ipcRenderer.send("db:update:sailor", form);
    window.ipcRenderer.once("db:update:sailor:result", (_, args) => {
      if (args.error) {
        commit("setError");
        commit("setErrorMsg", args.error.toString());
        commit("setErrorObj", args);
      }
      dispatch("loadDb");
    });
  },
  deleteSailor({ commit, dispatch }, payload) {
    window.ipcRenderer.send("db:delete:sailor", payload);
    window.ipcRenderer.once("db:update:sailor:result", (event, args) => {
      dispatch("loadDb");
      commit("SET_SAILORS", args);
      if (router.history.current.path !== "/") dispatch("routeToHome");
    });
  },
  addEval({ commit, dispatch }) {
    const { uuid } = this.getters.getSelectedSailor;
    const form = {
      ...this.getters.getEvalEditForm,
      command: { ...this.getters.getCommandInfo },
    };

    window.ipcRenderer.send("db:add:record", { uuid, form });
    window.ipcRenderer.once("db:add:record:result", (event, args) => {
      dispatch("loadDb");
      commit("ADD_SELECTED_SAILOR_RECORD", args);
    });
    window.ipcRenderer.once("dialog:show", (event, args) => {
      commit("SET_DIALOG_INFO", args);
      commit("SHOW_DIALOG");
    });
  },
  updateEval({ commit, dispatch }) {
    const form = this.getters.getEvalEditForm;
    const { uuid } = this.getters.getSelectedSailor;

    window.ipcRenderer.send("db:update:record", { uuid, form });
    window.ipcRenderer.once("db:update:record:result", (_, args) => {
      if (args.error) {
        commit("setError");
        commit("setErrorMsg", args.error.toString());
        commit("setErrorObj", args);
      } else {
        dispatch("clearEvalEditForm");
        dispatch("loadDb");
      }
    });
  },
  deleteRecord({ commit, dispatch }, payload) {
    window.ipcRenderer.send("db:delete:record", payload);
    window.ipcRenderer.once("db:delete:record:result", (event, args) => {
      dispatch("loadDb");
      commit("REMOVE_SELECTED_SAILOR_RECORD", args);
    });
  },
  saveCommandDefaults({ commit, dispatch }) {
    const form = this.getters.getCommandEditForm;
    window.ipcRenderer.send("db:add:commandDefaults", form);
    window.ipcRenderer.once("db:add:commandDefaults:result", (_, args) => {
      if (args.error) {
        commit("setError");
        commit("setErrorMsg", args.error.toString());
        commit("setErrorObj", args);
      }
      dispatch("loadDb");
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
  async setSelectedSailor({ commit }, uuid) {
    const sailorData = this.getters.getSailorById(uuid);
    commit("SET_SELECTED_SAILOR", sailorData);
    commit("SET_SAILOR_EDIT_FORM", sailorData);
  },
  async clearSelectedSailor({ commit }) {
    commit("CLEAR_SELECTED_SAILOR");
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
  exportEval({ commit }, payload) {
    const sailor = this.getters.getSelectedSailor;
    window.ipcRenderer.send("pdf:export", { sailor, id: payload });
    window.ipcRenderer.once("dialog:show", (event, args) => {
      commit("SET_DIALOG_INFO", args);
      commit("SHOW_DIALOG");
    });
  },
  dismissDialog({ commit }) {
    commit("DISMISS_DIALOG");
  },
  openFeedbackForm() {
    window.ipcRenderer.send("open:feedback");
  },
  openGithubRepo() {
    window.ipcRenderer.send("open:githubRepo");
  }
};
