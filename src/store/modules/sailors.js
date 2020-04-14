export default {
  state: {
    data: [],
  },
  mutations: {
    SET_SAILORS(state, payload) {
      state.data = payload;
    },
  },
  getters: {
    enlistedSummaryList: state => state.data?.filter(sailor => !sailor.officer).map(sailor => ({
      uuid: sailor.uuid,
      name: `${sailor.lastName}, ${sailor.firstName} : ${sailor.rank}`
    })),
    officerSummaryList: state => state.data?.filter(sailor => sailor.officer).map(sailor => ({
      uuid: sailor.uuid,
      name: `${sailor.lastName}, ${sailor.firstName} : ${sailor.rank}`
    })),
    getSailorById: state => givenUuid => state.data?.find(sailor => sailor.uuid === givenUuid),
    getRecordsById: state => givenUuid => state.data?.find(sailor => sailor.uuid === givenUuid).records || null,
  },
};
