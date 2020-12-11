import { createLocalVue, mount } from "@vue/test-utils";
import Vue from "vue";
import Vuex from "vuex";
import VueRouter from "vue-router";
import Vuetify from "vuetify";
import TheStartComponent from "@/components/TheStartComponent";

describe("TheStartComponent.vue", () => {
  const localVue = createLocalVue();
  localVue.use(VueRouter);
  const router = new VueRouter();

  let actions;
  let store;

  const mountFunction = options => mount(TheStartComponent, {
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
      openFeedbackForm: jest.fn(),
      openGithubRepo: jest.fn()
    };
    store = new Vuex.Store({
      state: {},
      actions
    });
  });

  test("render", async () => {
    const wrapper = mountFunction();
    expect(wrapper.vm).toBeTruthy();

    await wrapper.find(".feedback").trigger("click");
    expect(actions.openFeedbackForm).toHaveBeenCalled();
    await wrapper.find(".github").trigger("click");
    expect(actions.openGithubRepo).toHaveBeenCalled();
  });
});
