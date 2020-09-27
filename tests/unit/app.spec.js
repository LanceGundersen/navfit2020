import { createLocalVue, shallow } from "@vue/test-utils";
import Vuex from "vuex";
import App from "@/App";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("App.vue", () => {
  let actions;
  let store;

  beforeEach(() => {
    actions = {
      loadDb: jest.fn()
    };
    store = new Vuex.Store({
      state: {},
      actions
    });
  });

  it("should dispatch action when created", () => {
    shallow(App, {
      localVue,
      store
    });
    expect(actions.loadDb).toHaveBeenCalled();
  });
});
