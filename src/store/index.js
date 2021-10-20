import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    selectIndicator: 0,
  },
  getters: {
    getSelectedIndicator: s => {
      return s.selectIndicator
    }
  },
  mutations: {
    setSelectedIndicator(s, p) {
      s.selectIndicator = p
    },
    setDefaultIndicator(s) {
      s.selectIndicator = 0
    },
  },
  actions: {},
  modules: {},
});
