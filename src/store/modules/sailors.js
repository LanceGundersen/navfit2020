export default {
  state: {
    data: [],
  },
  mutations: {
    SET_SAILORS(state, payload) {
      state.data = payload ? [...payload] : payload;
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
    getRecordsById: state => sailorUuid => state.data?.find(sailor => sailor.uuid === sailorUuid).records || [],
    getRecordById: state => payload => state.data?.find(sailor => sailor.uuid === payload.uuid).records.find(
      record => record.uuid === payload.recordid
    ) || {},
  },
};
