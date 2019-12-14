import Vue from 'vue'
import Vuex from 'vuex'
import api from '@/api/getData.js'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    adminInfo: '',
  },
  mutations: {
    saveAdminInfo(state, val) {
      // console.log(val)
      state.adminInfo = val;
    }
  },
  actions: {
    async getAdminInfo({
      commit,
      state
    }) {
      try {
        const result = await api.getAdimData();
        // console.log(result)
        if (result.status == 1) {
          state.adminInfo = result.data.id;
          // console.log(state.adminInfo)
        } else {
          throw new Error(result.type)
        }
      } catch (err) {
        
      }
    }
  },
  modules: {}
})