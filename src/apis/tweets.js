import { apiHelper } from '../utils/helpers'

const getToken = () => localStorage.getItem('token')

export default {
  getTweets() {
    return apiHelper.get('/tweets', { headers: { Authorization: `Bearer ${getToken()}` } })
  },
  createTweet({ description }) {
    return apiHelper.post('/tweets', { description }, { headers: { Authorization: `Bearer ${getToken()}` } })
  },
  replyTweet({ tweetId, comment }) {
    return apiHelper.post(`/tweets/${tweetId}/replies`, { comment }, { headers: { Authorization: `Bearer ${getToken()}` } })
  },
  getTweet({ tweetId }) {
    return apiHelper.get(`/tweets/${tweetId}`, { headers: { Authorization: `Bearer ${getToken()}` } })
  },
  getTweetReplies({ tweetId }) {
    return apiHelper.get(`/tweets/${tweetId}/replies`, { headers: { Authorization: `Bearer ${getToken()}` } })
  },
  addLike({ tweetId }) {
    return apiHelper.post(`/tweets/${tweetId}/like`, null, { headers: { Authorization: `Bearer ${getToken()}` } })
  },
  deleteLike({ tweetId }) {
    return apiHelper.delete(`/tweets/${tweetId}/unlike`, { headers: { Authorization: `Bearer ${getToken()}` } })
  }
}