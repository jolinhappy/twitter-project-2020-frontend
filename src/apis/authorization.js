import { apiHelper } from '../utils/helpers'

export default {
  login({ account, password }) {
    return apiHelper.post('/login', {
      account,
      password
    })
  },
  regist() {
    return apiHelper.post('/users', {
      account: "",
      name: "",
      email: "",
      password: "",
      checkPassword: "",
    })
  },
}