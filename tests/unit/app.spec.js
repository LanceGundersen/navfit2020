// import { createLocalVue, shallowMount } from "@vue/test-utils";
// import Vuex from "vuex";
// import App from "@/App";
//
// const localVue = createLocalVue();
// localVue.use(Vuex);
//
// describe("App.vue", () => {
//   let actions;
//   let store;
//   let router;
//
//   beforeEach(() => {
//     actions = {
//       loadDb: jest.fn()
//     };
//     store = new Vuex.Store({
//       state: {},
//       actions
//     });
//     router = {};
//   });
//
//   it("should dispatch action when created", () => {
//     shallowMount(App, {
//       localVue,
//       store,
//       router,
//     });
//     expect(actions.loadDb).toHaveBeenCalled();
//   });
// });

import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vue from "vue";
import Vuex from "vuex";
import VueRouter from "vue-router";
import Vuetify from "vuetify";
import App from "@/App";

describe("MediaDetailComponent.vue", () => {
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

  test("render", () => {
    const wrapper = shallowMountFunction({});
    expect(wrapper.vm).toBeTruthy();
    expect(actions.loadDb).toHaveBeenCalled();
  });
});
