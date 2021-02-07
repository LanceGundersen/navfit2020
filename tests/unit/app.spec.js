import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vue from "vue";
import Vuex from "vuex";
import VueRouter from "vue-router";
import Vuetify from "vuetify";
import App from "@/App";

describe("App.vue", () => {
  const localVue = createLocalVue();
  localVue.use(VueRouter);
  const router = new VueRouter();

  let actions;
  let store;

  const shallowMountFunction = options => shallowMount(App, {
    Vuetify,
    localVue,
    store,
    router,
    ...options
  });

  beforeEach(() => {
    Vue.use(Vuex);
    Vue.use(Vuetify);
    actions = {
      loadDb: jest.fn()
    };
    store = new Vuex.Store({
      state: {},
      actions
    });
  });

  test.skip("render", () => {
    const wrapper = shallowMountFunction({});
    expect(wrapper.vm).toBeTruthy();
    expect(actions.loadDb).toHaveBeenCalled();
    expect(router.history.current.path).toEqual("/");
  });
});
