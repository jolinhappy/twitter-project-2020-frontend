import { apiHelper } from '../utils/helpers'

export default {
  getCurrentUser() {
    return apiHelper.get('get_current_user')
  },
  getTopUsers() {
    return apiHelper.get('/followships/top')
  },
  getUser({ userId }) {
    return apiHelper.get(`/users/${userId}`)
  },
  getUserTweets({ userId }) {
    return apiHelper.get(`/users/${userId}/tweets`)
  },
  getUserRepliedTweets({ userId }) {
    return apiHelper.get(`/users/${userId}/replied_tweets`)
  },
  getUserLikedTweets({ userId }) {
    return apiHelper.get(`/users/${userId}/likes`)
  },
  addFollow({ id }) {
    return apiHelper.post('/followships', { id })
  },
  deleteFollow({ followingId }) {
    return apiHelper.delete(`/followships/${followingId}`)
  },
  getFollowings({ userId }) {
    return apiHelper.get(`/users/${userId}/followings`)
  },
  getFollowers({ userId }) {
    return apiHelper.get(`/users/${userId}/followers`)
  },
  updateInfo({ userId, formData }) {
    return apiHelper.put(`/users/${userId}`, formData)
  }
}