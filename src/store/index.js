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
    token: ''

  },
  mutations: {
    setCurrentUser(state, currentUser) {
      state.currentUser = {
        ...state.currentUser,
        //用API取得的目前使用者資料(login和變換頁面時兩種情況)
        ...currentUser
      }
      state.isAuthenticated = true
      state.token = localStorage.getItem('token')
    },
    revokeAuthentication(state) {
      state.currentUser = {}
      state.isAuthenticated = false
      localStorage.removeItem('token')
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
        //判斷是否驗證
        return true
      } catch (error) {
        console.log(error)
        console.error('can not fetch current user information')
      }
      return false

    }
  },
  modules: {
  }
})
