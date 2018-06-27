import Vue from 'vue'
import Vuex from 'vuex'
import modules from './config'

Vue.use(Vuex);


export default new Vuex.Store({
  state: {
    globalLoad: false,
    testData: 1,
    articleBgList: [`#72616e`, `#e8846b`, `#16528e`, `#e54b4b`, `#a2c5bf`, `#167c80`, `#0082c8`],
    articleList:[
      'c19930903-1',
      'c19930903-2',
      'c19930903-3',
      'c19930903-4',
      'c19930903-5',
      'c19930903-6',
      'c19930903-7',
      'c19930903-8',
      'c19930903-9',
      'c19930903-10',
    ]
  },
  getters: {
    apiUrl() {
      return process.env.NODE_ENV === 'production' ? 'https://admin.chavesgu.com' : '/api'
    }
  },
  mutations: {
    loadingStart(state) {
      state.globalLoad = true;
    },
    loadingOver(state) {
      if (state.globalLoad) {
        state.globalLoad = false;
      }
    }
  },
  actions: {},
  modules
});
