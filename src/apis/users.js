import { apiHelper } from '../utils/helpers'

const getToken = () => localStorage.getItem('token')

export default {
  getTopUsers() {
    return apiHelper.get('/followships/top', { headers: { Authorization: `Bearer ${getToken()}` } })
  },
  getUser({ userId }) {
    return apiHelper.get(`/users/${userId}`, { headers: { Authorization: `Bearer ${getToken()}` } })
  },
  getUserTweets({ userId }) {
    return apiHelper.get(`/users/${userId}/tweets`, { headers: { Authorization: `Bearer ${getToken()}` } })
  },
  getUserRepliedTweets({ userId }) {
    return apiHelper.get(`/users/${userId}/replied_tweets`, { headers: { Authorization: `Bearer ${getToken()}` } })
  },
  getUserLikedTweets({ userId }) {
    return apiHelper.get(`/users/${userId}/likes`, { headers: { Authorization: `Bearer ${getToken()}` } })
  },
  addFollow() {
    return apiHelper.post('/followships', null, { headers: { Authorization: `Bearer ${getToken()}` } })
  },
  deleteFollow({ userId }) {
    return apiHelper.delete(`/followships/${userId}`, { headers: { Authorization: `Bearer ${getToken()}` } })
  }

}