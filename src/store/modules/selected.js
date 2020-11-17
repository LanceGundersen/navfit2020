import { exportEval } from "../../services/evalExport.service";

export default {
  state: {
    sailor: {},
  },
  mutations: {
    SET_SELECTED_SAILOR(state, payload) {
      state.sailor = payload;
    },
    EXPORT_EVAL(state, { recordId }) {
      exportEval({ sailor: state.sailor, recordId });
    }
  },
  getters: {
    getSelectedSailor: state => state.sailor,
  },
};
