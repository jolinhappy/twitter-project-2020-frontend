import { apiHelper } from '../utils/helpers'

const getToken = () => localStorage.getItem('token')

export default {
  adminLogin({ account, password }) {
    return apiHelper.post('/admin', {
      account,
      password
    })
  },
  getTweets() {
    return apiHelper.get('/admin/tweets', { headers: { Authorization: `Bearer ${getToken()}` } })
  },
  getUsers() {
    return apiHelper.get('/admin/users', { headers: { Authorization: `Bearer ${getToken()}` } })
  },
  deletTweet({ tweetId }) {
    return apiHelper.delete(`/admin/tweets/${tweetId}`, { headers: { Authorization: `Bearer ${getToken()}` } })
  }

}