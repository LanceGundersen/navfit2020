export default {
  state: {
    data: {},
  },
  mutations: {
    SET_COMMAND(state, payload) {
      state.data = payload;
    },
    SET_COMMAND_INFO(state, payload) {
      state.data = payload;
    },
  },
  getters: {
    getCommandInfo: state => state.data,
  },
};
