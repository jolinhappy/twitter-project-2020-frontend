<template>
  <div class="tweets-list">
    <div class="tweet-list-container" v-for="tweet in tweets" :key="tweet.id">
      <div class="profile-image">
        <router-link
          :to="{ name: 'user-profile', params: { id: tweet.User.id } }"
        >
          <img :src="tweet.User.avatar" class="user-img" alt="" />
        </router-link>
      </div>
      <div class="tweet">
        <div class="tweet-info">
          <router-link
            :to="{ name: 'user-profile', params: { id: tweet.User.id } }"
            class="user-name-link"
          >
            <div class="user-name">{{ tweet.User.name }}</div>
          </router-link>
          <div class="user-account">{{ tweet.User.account }}</div>
          <div class="create-time">．{{ tweet.createdAt | fromNow }}</div>
        </div>
        <div class="tag-user" v-if="pageMode !== 'main'">
          <div class="tag-text">回覆</div>
          <a href="#" class="tag-user-acount">{{ mainTweet.User.account }}</a>
        </div>
        <router-link
          :to="{ name: 'tweet', params: { id: tweet.id } }"
          class="tweet-content"
        >
          {{ tweet.description }}
        </router-link>
        <div class="tweet-action">
          <div class="tweet-reply" @click="showReplyModal(tweet.id)">
            <img
              src="https://i.imgur.com/SaR8cz3.png"
              class="reply"
              alt="reply"
            />
            <span class="reply-count">{{
              tweet.Replies ? tweet.Replies.length : "0"
            }}</span>
          </div>
          <div class="tweet-like" v-if="tweet.isLiked">
            <img
              src="https://i.imgur.com/8wXFVUF.png"
              class="like"
              alt="like"
              @click="deleteLike(tweet.id)"
            />
            <span class="isLike-count">{{
              tweet.Likes ? tweet.Likes.length : "0"
            }}</span>
          </div>
          <div class="tweet-like" v-else>
            <img
              src="https://i.imgur.com/qs9Pe3N.png"
              class="like isliked"
              alt="like"
              @click="addLike(tweet.id)"
            />
            <span class="like-count">{{
              tweet.Likes ? tweet.Likes.length : "0"
            }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const dummyUser = {
  currentUser: {
    id: 1,
    name: "dummy",
    email: "123@hhhh.com",
    avatar:
      "https://s3.amazonaws.com/uifaces/faces/twitter/chrisvanderkooi/128.jpg",
  },
  isAuthenticated: true,
};
import { fromNowFilter } from "./../utils/mixins";
import { v4 as uuidv4 } from "uuid";
export default {
  mixins: [fromNowFilter],
  props: {
    pageMode: {
      type: String,
      required: true,
    },
    initialTweets: {
      type: Array,
      required: true,
    },
    mainTweet: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      tweets: this.initialTweets,
      currentUser: {
        id: -1,
        name: " ",
        email: "",
        avatar: "",
      },
      isAuthenticated: false,
      tweet: {},
    };
  },
  created() {
    this.fetchCurrentUser();
  },
  methods: {
    showReplyModal(id) {
      //TODO用單篇推文的id串GET/api/tweets/:id拿回覆彈窗中的原文推文資料(可先用假資料串)
      const replyTweet = this.tweets.filter((oneTweet) => oneTweet.id === id);
      this.tweet = { ...replyTweet }[0];
      this.$emit("showReplyModal", this.tweet);
    },
    fetchCurrentUser() {
      this.currentUser = {
        ...this.currentUser,
        ...dummyUser.currentUser,
      };
      this.isAuthenticated = dummyUser.isAuthenticated;
    },
    addLike(id) {
      this.tweets = this.tweets.map((tweet) => {
        if (tweet.id === id) {
          return {
            ...tweet,
            isLiked: true,
          };
        }
        return tweet;
      });
      const likeTweet = this.tweets.filter((oneTweet) => oneTweet.id === id);
      likeTweet[0].Likes.push({
        id: uuidv4(),
        UserId: this.currentUser,
        TweetId: this.tweet.id,
      });
    },
    deleteLike(id) {
      this.tweets = this.tweets.map((tweet) => {
        if (tweet.id === id) {
          return {
            ...tweet,
            isLiked: false,
          };
        }
        return tweet;
      });
      const deleteLikeTweet = this.tweets.filter(
        (oneTweet) => oneTweet.id === id
      );
      deleteLikeTweet[0].Likes.splice(0, 1);
      console.log(deleteLikeTweet);
    },
  },
};
</script>

<style scoped>
.user-tweet {
  width: 600px;
  height: auto;
}
.tweet-list-container {
  width: 600px;
  height: auto;
  border: 1px solid #e6ecf0;
  display: flex;
  padding-top: 10px;
}
.tweet-info {
  display: flex;
  flex-direction: row;
}
.user-name {
  font-size: 15px;
  font-weight: bold;
  margin-right: 10px;
}
.user-name-link:hover {
  text-decoration: underline;
}
.user-account,
.create-time {
  font-size: 15px;
  font-weight: 500;
  color: #657786;
}

.tweet {
  display: flex;
  flex-direction: column;
}
.tweet-content {
  width: 510px;
  height: auto;
  flex: 1;
  font-size: 15px;
  font-weight: 500;
}
.tweet-action,
.tweet-reply,
.tweet-like {
  display: flex;
  width: 130px;
  height: 21px;
}
.tweet-action {
  margin: 8px 0;
}
.reply,
.like {
  width: 12.34px;
  height: 12.34px;
  line-height: 21px;
  margin: auto 0;
  cursor: pointer;
}

.reply:hover {
  transform: scale(1.5, 1.5);
}
.like:hover {
  transform: scale(1.5, 1.5);
}
.like-count,
.reply-count {
  font-size: 13px;
  font-weight: 500;
  color: #657786;
  margin: auto 0 auto 8px;
}

.isLike-count {
  font-size: 13px;
  font-weight: 500;
  color: #e0245e;
  margin: auto 0 auto 8px;
}
.tweet-reply {
  margin-right: 30px;
}
.profile-image {
  width: 70px;
  height: auto;
  display: flex;
  justify-content: center;
}
.user-img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.tag-user {
  display: flex;
  margin: 5px 0;
  font-size: 15px;
  font-weight: 500;
}
.tag-text {
  color: #657786;
  margin-right: 5px;
}
.tag-user-acount {
  color: #ff6000;
}
.user-img:hover {
  transform: scale(1.1, 1.1);
}
</style>