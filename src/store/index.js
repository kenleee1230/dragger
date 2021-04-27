import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: window.sessionStorage.getItem('user'),
    token: window.sessionStorage.getItem('token'),
    layout: window.sessionStorage.getItem('layout'),
  },
  mutations: {
    //  将token保存到sessionStorage里，token表示登陆状态
    SET_TOKEN: (state, data) => {
      state.token = data;
      window.sessionStorage.setItem('token', data);
    },
    //  获取用户名
    GET_USER: (state, data) => {
      state.user = data;
      window.sessionStorage.setItem('user', data);
    },
    SET_LAYOUT: (state, value) => {
      state.layout = value;
      window.sessionStorage.setItem('layout', value);
    },
    CLEAR_LAYOUT: (state) => {
      state.layout = null;
      window.sessionStorage.removeItem('layout');
      window.localStorage.removeItem('layout');
    }
  },
  actions: {
  },
  modules: {
  }
})
