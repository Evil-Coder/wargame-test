import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    selectedIndicator: 0,
  },
  getters: {
    getSelectedIndicator: s => {
      return s.selectedIndicator
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
