<template>
  <div class="tweets-list">
    <div class="tweet-list-container" v-for="tweet in tweets" :key="tweet.id">
      <div class="profile-image">
        <router-link
          :to="{ name: 'user-profile', params: { id: tweet.User.id } }"
        >
          <img :src="tweet.User.avatar | emptyImage" class="user-img" alt="" />
        </router-link>
      </div>
      <div class="tweet">
        <div class="tweet-info">
          <router-link
            :to="{ name: 'user-profile', params: { id: tweet.User.id } }"
            class="user-name-link"
          >
            <div class="user-name">{{ tweet.User.name | maxSlice }}</div>
          </router-link>
          <div class="user-account" v-show="tweet.User.name.length < 45">
            @{{ tweet.User.account }}
          </div>
          <div class="create-time">．{{ tweet.createdAt | fromNow }}</div>
        </div>
        <div class="tag-user" v-if="pageMode !== 'main'">
          <div class="tag-text">回覆</div>
          <a href="#" class="tag-user-acount">@{{ mainTweet.User.account }}</a>
        </div>
        <router-link
          :to="{ name: 'tweet', params: { id: tweet.id } }"
          class="tweet-content"
        >
          {{ tweet.description || tweet.comment }}
        </router-link>
        <div class="tweet-action">
          <div class="tweet-reply" @click="showReplyModal(tweet)">
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
              @click="deleteLike({ id: tweet.id, tweet })"
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
              @click="addLike({ id: tweet.id, tweet })"
            />
            <span class="like-count">{{
              tweet.Likes ? tweet.Likes.length : "0"
            }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="no-data-container" v-if="initialTweets.length === 0">
      <div class="no-data">尚無相關推文...</div>
    </div>
  </div>
</template>

<script>
import { fromNowFilter } from "./../utils/mixins";
import { emptyImageFilter } from "./../utils/mixins";
import tweetsAPI from "./../apis/tweets";
import { Toast } from "./../utils/helpers";

export default {
  mixins: [fromNowFilter, emptyImageFilter],
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
  watch: {
    initialTweets(newValue) {
      this.tweets = { ...this.tweets, ...newValue };
    },
  },
  methods: {
    //tweet頁面底下留言功能暫時PASS，另外因為是comment不是description，回覆窗內文無法套用
    showReplyModal(tweet) {
      console.log(tweet);
      this.tweet = tweet;
      this.$emit("showReplyModal", this.tweet);
    },
    async addLike({ id, tweet }) {
      try {
        const { data } = await tweetsAPI.addLike({ tweetId: id });
        if (data.status !== "success") {
          throw new Error(data.message);
        }
        tweet.isLiked = true;
        console.log(tweet);
        tweet.Likes.push({
          UserId: this.currentUser,
        });
        Toast.fire({
          icon: "success",
          title: "對方已經收到您的讚囉！",
        });
      } catch (error) {
        console.log(error);
        Toast.fire({
          icon: "error",
          title: "無法按讚，請稍後再試",
        });
      }
    },
    async deleteLike({ id, tweet }) {
      try {
        const { data } = await tweetsAPI.deleteLike({ tweetId: id });
        if (data.status !== "success") {
          throw new Error(data.message);
        }
        Toast.fire({
          icon: "success",
          title: "成功取消按讚！",
        });
        tweet.isLiked = false;
        tweet.Likes.splice(0, 1);
      } catch (error) {
        console.log(error);
        Toast.fire({
          icon: "error",
          title: "無法取消按讚，請稍後再試",
        });
      }
    },
  },
  filters: {
    //多餘的名字字數以...顯示
    maxSlice(name) {
      return name.length > 45 ? name.slice(0, 45) + "..." : name;
    },
  },
};
</script>

<style scoped>
.user-tweet {
  width: 600px;
  height: auto;
}
.tweets-list {
  width: 600px;
  height: 100%;
  flex: 1;
  border-left: 1px solid #e6ecf0;
  border-right: 1px solid #e6ecf0;
}
.tweet-list-container {
  width: 600px;
  height: auto;
  border-top: 1px solid #e6ecf0;
  border-bottom: 1px solid #e6ecf0;
  display: flex;
  padding-top: 10px;
}
.tweet-list-container:hover {
  background: #e6ecf0;
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
.user-account {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
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
  word-break: break-all;
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
.no-data-container {
  display: flex;
  justify-content: center;
}
.no-data {
  font-weight: 700;
  font-size: 20px;
  margin-top: 15px;
  margin-left: 15px;
}
</style>