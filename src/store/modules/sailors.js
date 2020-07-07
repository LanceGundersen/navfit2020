export default {
  state: {
    data: [],
  },
  mutations: {
    SET_SAILORS(state, payload) {
      state.data = [...payload];
    },
  },
  getters: {
    getSailorsSummaryList: state => {
      if (state.data && state.data.length) {
        return state.data.map(sailor => ({
          uuid: sailor.uuid,
          name: `${sailor.lastName}, ${sailor.firstName} : ${sailor.rank}`
        }));
      }
      return [];
    },
    getSailorById: state => givenUuid => {
      if (state.data && state.data.length) {
        return state.data.find(sailor => sailor.uuid === givenUuid);
      }
      return {};
    },
    getRecordsById: state => givenUuid => state.data?.find(sailor => sailor.uuid === givenUuid).records || null,
  },
};
