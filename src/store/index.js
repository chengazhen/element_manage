import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    users: []
  },
  mutations: {
    addusers({
      users
    }, val) {
      let user = {};
      for (var i in val) {
        user[i] = val[i];
      };
      users.push(user);
    }
  },
  actions: {},
  modules: {}
})