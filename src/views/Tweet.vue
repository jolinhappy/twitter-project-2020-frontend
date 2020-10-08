<template>
  <div class="container">
    <Spinner v-if="isLoading" />
    <!-- sidebar -->
    <Sidebar @showCreateModal="showCreateModal" :selected-page="selectedPage" />
    <div class="user-tweet">
      <div class="user-tweet-card">
        <div class="tweet-title">
          <button class="back-button" @click="$router.back()">
            <img
              src="https://i.imgur.com/aPVTDn2.png"
              class="back-img"
              alt=""
            />
          </button>
          <div class="title-content">
            <div class="title-name">推文</div>
          </div>
        </div>

        <div class="user-tweet-content">
          <div class="tweet-info">
            <div class="profile-image">
              <img
                :src="tweet.User.avatar | emptyImage"
                class="user-img"
                alt=""
              />
            </div>
            <div class="user-info">
              <router-link
                :to="{ name: 'user-profile', params: { id: tweet.User.id } }"
                class="user-name-link"
              >
                <div class="user-name">{{ tweet.User.name }}</div>
              </router-link>
              <div class="user-account">@{{ tweet.User.account }}</div>
            </div>
          </div>
          <div class="tweet">
            <div class="user-tweet-text">
              {{ tweet.description }}
            </div>
            <div class="create-time">
              {{ tweet.createdAt | formateDateToTime }}．{{
                tweet.createdAt | formateDate
              }}
            </div>
          </div>
        </div>
        <div class="action-count">
          <div class="user-reply-count">
            <strong>{{ tweet.Replies.length }}</strong
            >回覆
          </div>
          <div class="user-like-count">
            <strong>{{ tweet.Likes.length }}</strong
            >喜歡次數
          </div>
        </div>
        <div class="main-tweet-action">
          <div class="tweet-reply" @click="showReplyModal">
            <img
              src="https://i.imgur.com/SaR8cz3.png"
              class="reply-icon"
              alt="reply"
            />
          </div>
          <div class="tweet-like" v-if="tweet.isLiked">
            <img
              src="https://i.imgur.com/8wXFVUF.png"
              class="like-icon"
              alt="like"
              @click="deleteLike(tweet.id)"
            />
          </div>
          <div class="tweet-like" v-else>
            <img
              src="https://i.imgur.com/qs9Pe3N.png"
              class="like-icon"
              alt="like"
              @click="addLike(tweet.id)"
            />
          </div>
        </div>
      </div>
      <UserTweetsList
        @showReplyModal="showReplyModal"
        :page-mode="pageMode"
        :initial-tweets="tweets"
        :main-tweet="tweet"
      />
    </div>
    <div class="follow-top">
      <FollowTopList :initial-is-followed="isFollowed" />
    </div>
    <TweetCreateModal
      v-if="createModal"
      @after-click-close-create="closeCreateModal"
      :initial-description="description"
      @afterSubmit="creatTweetFromModal"
    />
    <TweetReplyModal
      v-if="replyModal"
      @after-click-close-reply="closeReplyModal"
      :tweet="tweet"
      @after-create-reply="createReply"
    />
    <UserProfileEditModal
      v-if="editModal"
      @after-click-close-edit="closeEditModal"
    />
  </div>
</template>


<script>
import Sidebar from "./../components/Sidebar";
import UserTweetsList from "./../components/UserTweetsList";
import FollowTopList from "./../components/FollowTopList";
import TweetCreateModal from "./../components/TweetCreateModal";
import TweetReplyModal from "./../components/TweetReplyModal";
import { emptyImageFilter } from "./../utils/mixins";
import { v4 as uuidv4 } from "uuid";
import tweetsAPI from "./../apis/tweets";
import { Toast } from "./../utils/helpers";
import { mapState } from "vuex";
import Spinner from "./../components/Spinner";

export default {
  name: "Tweet",
  mixins: [emptyImageFilter],
  components: {
    Sidebar,
    UserTweetsList,
    FollowTopList,
    TweetCreateModal,
    TweetReplyModal,
    Spinner,
  },
  computed: {
    ...mapState(["currentUser"]),
  },
  data() {
    return {
      createModal: false,
      replyModal: false,
      editModal: false,
      pageMode: "reply",
      description: "",
      tweet: {},
      tweets: [],
      selectedPage: "",
      date: "",
      isFollowed: "",
      isLoading: false,
    };
  },
  created() {
    const { id: tweetId } = this.$route.params;
    this.fetchTweet(tweetId);
    this.fetchReplies(tweetId);
  },
  beforeRouteUpdate(to, from, next) {
    const { id: tweetId } = to.params;
    this.fetchTweet(tweetId);
    this.fetchReplies(tweetId);
    next();
  },
  methods: {
    showCreateModal() {
      this.createModal = true;
      console.log(this.createModal);
    },
    closeCreateModal() {
      this.createModal = false;
    },
    CreateFinish() {
      this.$router.push({ name: "tweets-home" });
    },
    showReplyModal() {
      this.replyModal = true;
    },
    closeReplyModal() {
      this.replyModal = false;
    },
    async fetchTweet(tweetId) {
      try {
        this.isLoading = true;
        const { data } = await tweetsAPI.getTweet({ tweetId });
        this.tweet = data;
        this.isLoading = false;
      } catch (error) {
        console.log(error);
        Toast.fire({
          icon: "error",
          title: "無法取得推文資料，請稍後再試",
        });
        this.isLoading = false;
      }
    },
    async fetchReplies(tweetId) {
      try {
        const { data } = await tweetsAPI.getTweetReplies({ tweetId });
        this.tweets = data;
      } catch (error) {
        console.log(error);
        Toast.fire({
          icon: "error",
          title: "無法取得推文的回覆內容，請稍後再試",
        });
      }
    },
    async creatTweetFromModal(newDescription) {
      try {
        if (newDescription.length === 0) {
          Toast.fire({
            icon: "warning",
            title: "請輸入推文內容",
          });
          return;
        }
        if (newDescription.length > 140) {
          Toast.fire({
            icon: "warning",
            title: "推文字數限制140字以內，請減少輸入的字數",
          });
          return;
        }
        const { data } = await tweetsAPI.createTweet({
          description: newDescription,
        });
        if (data.status === "error") {
          throw new Error(data.message);
        }
        this.tweets.splice(0, 0, {
          id: uuidv4(),
          userId: this.currentUser.id,
          createdAt: new Date(),
          description: newDescription,
          User: {
            name: this.currentUser.name,
            account: this.currentUser.account,
            avatar: this.currentUser.avatar,
          },
        });
        this.CreateFinish();
      } catch (error) {
        console.log(error);
        Toast.fire({
          icon: "error",
          title: "無法新增推文，請稍後再試看",
        });
      }
    },
    //單篇推文底下的回覆推文功能暫時PASS，只做主要推文回覆
    async createReply(payload) {
      try {
        const { tweetId, comment } = payload;
        if (comment.length === 0) {
          Toast.fire({
            icon: "warning",
            title: "請輸入回覆內容",
          });
          return;
        }

        if (Comment.length > 140) {
          Toast.fire({
            icon: "warning",
            title: "回覆字數限制140字以內，請減少輸入的字數",
          });
          return;
        }
        const { data } = await tweetsAPI.replyTweet({
          tweetId,
          comment,
        });
        if (data.status === "error") {
          throw new Error(data.message);
        }
        this.tweets.splice(0, 0, {
          tweetId,
          User: {
            id: this.currentUser.id,
            name: this.currentUser.name,
            avatar: this.currentUser.avatar,
            acount: this.currentUser.account,
          },
          comment,
          createdAt: new Date(),
        });
        Toast.fire({
          icon: "success",
          title: "已送出回覆推文",
        });
        this.closeReplyModal();
      } catch (error) {
        console.log(error);
        Toast.fire({
          icon: "error",
          title: "無法回覆推文，請稍後再試看",
        });
      }
    },
    async addLike(id) {
      try {
        const { data } = await tweetsAPI.addLike({ tweetId: id });
        if (data.status !== "success") {
          throw new Error(data.message);
        }
        this.tweet.isLiked = true;
        Toast.fire({
          icon: "success",
          title: "對方已經收到您的讚囉！",
        });
        this.tweet.Likes.push({
          id: uuidv4(),
          UserId: this.currentUser,
          TweetId: this.tweet.id,
        });
      } catch (error) {
        console.log(error);
        Toast.fire({
          icon: "error",
          title: "無法按讚，請稍後再試",
        });
      }
    },
    async deleteLike(id) {
      try {
        console.log("yy", id);
        const { data } = await tweetsAPI.deleteLike({ tweetId: id });
        console.log(data);
        if (data.status !== "success") {
          throw new Error(data.message);
        }
        console.log(this.tweet);
        Toast.fire({
          icon: "success",
          title: "成功取消按讚！",
        });

        this.tweet.isLiked = false;

        this.tweet.Likes.splice(0, 1);
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
    formateDate(value) {
      const date = new Date(value);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();

      return year + "年" + month + "月" + day + "日";
    },
    formateDateToTime(value) {
      const date = new Date(value);
      const hour = date.getHours();
      const afterhour = hour - 12;
      const minute = date.getMinutes();
      return hour > 12
        ? "下午" + afterhour + ":" + minute
        : "上午" + hour + ":" + minute;
    },
  },
};
</script>
<style scoped>
.container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
}

.user-tweet {
  width: 600px;
  height: 100%;
}

.back-button {
  height: 55px;
}
.profile-content {
  width: 600px;
  border: 1px solid #e5e5e5;
  position: relative;
}
.back-img {
  width: 24px;
  height: 24px;
  display: inline;
  margin: auto 15px;
  margin-top: 15px;
}
.tweet-title {
  font-size: 18px;
  font-weight: 700;
  width: 600px;
  height: 55px;
  border: 1px solid #e6ecf0;
  display: flex;
}
.title-content {
  margin-left: 25px;
  display: flex;
}

.profile-image {
  width: 70px;
  height: 120px;
  margin-top: 10px;
}

.title-name {
  font-size: 19px;
  font-weight: 900;
  margin: auto 0;
}
.user-tweet-content {
  width: 600px;
  height: auto;
  border: 1px solid #e6ecf0;
}
.tweet-info {
  display: flex;
  height: 80px;
  width: 600px;
}
.user-info {
  display: flex;
  flex-direction: column;
  margin-top: 10px;
}
.profile-image {
  width: 70px;
  height: 120px;
  display: flex;
  justify-content: center;
}
.user-img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.user-name {
  font-size: 15px;
  font-weight: bold;
}
.user-name:hover {
  text-decoration: underline;
}
.user-account {
  font-size: 15px;
  font-weight: 500;
  color: #657786;
}
.tweet {
  width: 510px;
  height: auto;
  display: flex;
  flex-direction: column;
  margin-left: 12px;
}
.user-tweet-text {
  font-size: 23px;
  font-weight: 500;
  height: auto;
}
.create-time {
  font-size: 15px;
  font-weight: 500;
  color: #657786;
  margin: 10px 0;
}

.action-count {
  display: flex;
  width: 600px;
  height: 69px;
  border: 1px solid #e6ecf0;
  align-items: center;
  font-size: 19px;
}
.user-reply-count {
  margin-left: 12px;
  margin-right: 18px;
}

.main-tweet-action {
  width: 600px;
  height: 60px;
  border: 1px solid #e6ecf0;
  display: flex;
  align-items: center;
}

.reply-icon,
.like-icon {
  width: 24.69px;
  height: 24.69px;
  cursor: pointer;
}

.reply-icon {
  margin-left: 12px;
  margin-right: 160px;
}

.reply-icon:hover,
.like-icon:hover {
  transform: scale(1.2, 1.2);
}
</style>