import Vue from 'vue'
import Vuex from 'vuex'
import userAPI from './../apis/users'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUser: {
      id: -1,
      account: '',
      name: '',
      email: '',
      avatar: '',
      cover: '',
      isAdmin: false
    },
    isAuthenticated: false,

  },
  mutations: {
    setCurrentUser(state, currentUser) {
      state.currentUser = {
        ...state.currentUser,
        //API取得的目前使用者
        ...currentUser
      }
      state.isAuthenticated = true
    }
  },
  actions: {
    async fetchCurrentUser({ commit }) {
      try {
        const response = await userAPI.getCurrentUser()

        if (response.statusText === 'error') {
          throw new Error(response.data)
        }
        const { account, avatar, cover, email, id, isAdmin, name } = response.data
        commit('setCurrentUser', { account, avatar, cover, email, id, isAdmin, name })

      } catch (error) {
        console.log(error)
        console.error('can not fetch current user information')
      }


    }
  },
  modules: {
  }
})
