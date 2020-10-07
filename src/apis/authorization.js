import { apiHelper } from '../utils/helpers'

export default {
  login({ account, password }) {
    return apiHelper.post('/login', {
      account,
      password
    })
  },
  regist({ account, name, email, password, checkPassword }) {
    return apiHelper.post('/users', {
      account,
      name,
      email,
      password,
      checkPassword,
    })
  },
  adminLogin({ account, password }) {
    return apiHelper.post('/admin', {
      account,
      password
    })
  },
}