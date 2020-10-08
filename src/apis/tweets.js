import { apiHelper } from '../utils/helpers'


export default {
  getTweets() {
    return apiHelper.get('/tweets')
  },
  createTweet({ description }) {
    return apiHelper.post('/tweets', { description })
  },
  replyTweet({ tweetId, comment }) {
    return apiHelper.post(`/tweets/${tweetId}/replies`, { comment })
  },
  getTweet({ tweetId }) {
    return apiHelper.get(`/tweets/${tweetId}`)
  },
  getTweetReplies({ tweetId }) {
    return apiHelper.get(`/tweets/${tweetId}/replies`)
  },
  addLike({ tweetId }) {
    return apiHelper.post(`/tweets/${tweetId}/like`, null)
  },
  deleteLike({ tweetId }) {
    return apiHelper.post(`/tweets/${tweetId}/unlike`, null)
  }
}