<template>
  <div class="container">
    <Spinner v-if="isLoading" />
    <!-- sidebar -->
    <Sidebar
      @showCreateModal="showCreateModal"
      :admin-page="adminPage"
      :selected-page="selectedPage"
    />
    <div class="main-tweets">
      <div class="tweet-create">
        <div class="tweet-title">
          <p>首頁</p>
        </div>
        <div class="tweet-create-container">
          <div class="profile-image">
            <router-link
              :to="{ name: 'user-profile', params: { id: currentUser.id } }"
            >
              <img
                :src="this.currentUserData.avatar | emptyImage"
                class="user-img"
                alt=""
              />
            </router-link>
          </div>
          <form class="tweet-input">
            <textarea
              name="tweet-input-area"
              class="tweet-input-content"
              id=""
              cols="30"
              rows="10"
              placeholder="有什麼新鮮事？"
              v-model="description"
            ></textarea>
            <button
              type="submit"
              class="tweet-create-btn"
              @click.stop.prevent="createTweet"
              :disabled="isProcessing"
            >
              推文
            </button>
          </form>
        </div>
      </div>
      <UserTweetsList
        @showReplyModal="showReplyModal"
        :page-mode="pageMode"
        :initial-tweets="tweets"
        :initial-tweet="tweet"
      />
    </div>
    <div class="follow-top">
      <FollowTopList />
    </div>
    <TweetCreateModal
      v-if="createModal"
      @after-click-close-create="closeCreateModal"
      :initial-description="description"
      @afterSubmit="creatTweetFromModal"
      :currentUserData="currentUserData"
    />
    <TweetReplyModal
      v-if="replyModal"
      @after-click-close-reply="closeReplyModal"
      :tweet="tweet"
      @after-create-reply="createReply"
    />
  </div>
</template>


<script>
import Sidebar from "./../components/Sidebar";
import UserTweetsList from "./../components/UserTweetsList";
import FollowTopList from "./../components/FollowTopList";
import TweetCreateModal from "./../components/TweetCreateModal";
import TweetReplyModal from "./../components/TweetReplyModal";
import tweetsAPI from "./../apis/tweets";
import { Toast } from "./../utils/helpers";
import { emptyImageFilter } from "./../utils/mixins";
import { mapState } from "vuex";
import Spinner from "./../components/Spinner";
import usersAPI from "./../apis/users";

export default {
  name: "home",
  mixins: [emptyImageFilter],
  components: {
    Sidebar,
    UserTweetsList,
    FollowTopList,
    TweetCreateModal,
    TweetReplyModal,
    Spinner,
  },
  data() {
    return {
      createModal: false,
      replyModal: false,
      pageMode: "main",
      tweets: [],
      description: "",
      tweet: {},
      adminPage: false,
      selectedPage: "home",
      isProcessing: false,
      isLoading: false,
      currentUserData: {
        id: "",
        name: "",
        account: "",
        avatar: "",
      },
    };
  },
  computed: {
    //從vuex拿取現在登入者的資料
    ...mapState(["currentUser"]),
  },
  created() {
    this.fetchUserTweets();
    this.fetchCurrentUserData(this.currentUser.id);
  },
  beforeRouteUpdate(to, from, next) {
    next();
  },
  methods: {
    showCreateModal() {
      this.createModal = true;
    },
    closeCreateModal() {
      this.createModal = false;
    },
    showReplyModal(replyTweet) {
      this.replyModal = true;
      this.tweet = replyTweet;
    },
    closeReplyModal() {
      this.replyModal = false;
    },
    async fetchCurrentUserData(id) {
      const { data } = await usersAPI.getUser({ userId: id });
      const { account, name, avatar } = data;
      this.currentUserData.account = account;
      this.currentUserData.name = name;
      this.currentUserData.avatar = avatar;
    },
    async fetchUserTweets() {
      try {
        this.isLoading = true;
        const response = await tweetsAPI.getTweets();
        const { data } = response;
        this.tweets = data;
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
    async createTweet() {
      try {
        this.isProcessing = true;
        if (this.description.length === 0) {
          Toast.fire({
            icon: "warning",
            title: "沒寫推文內容，不給送出喔！",
          });
          return;
        }
        if (this.description.length > 140) {
          Toast.fire({
            icon: "warning",
            title: "哎呀！推文只能輸入140個字喔！",
          });
          return;
        }
        const { data } = await tweetsAPI.createTweet({
          description: this.description,
        });
        console.log(data);
        if (data.status === "error") {
          throw new Error(data.message);
        }
        console.log(data.UserId);
        this.tweets.splice(0, 0, {
          id: data.id,
          description: this.description,
          createdAt: new Date(),
          User: {
            id: data.UserId,
            name: this.currentUser.name,
            account: this.currentUser.account,
            avatar: this.currentUser.avatar,
          },
          Likes: [],
        });
        Toast.fire({
          icon: "success",
          title: "送出熱騰騰的推文囉！",
        });
        this.isProcessing = false;
        this.description = "";
      } catch (error) {
        console.log(error);
        Toast.fire({
          icon: "error",
          title: "無法新增推文，請稍後再試",
        });
        this.isProcessing = false;
      }
    },
    async creatTweetFromModal(newDescription) {
      try {
        if (newDescription.length === 0) {
          Toast.fire({
            icon: "warning",
            title: "沒寫推文內容，不給送出喔！",
          });
          return;
        }
        if (newDescription.length > 140) {
          Toast.fire({
            icon: "warning",
            title: "哎呀！推文只能輸入140個字喔！",
          });

          return;
        }
        const { data } = await tweetsAPI.createTweet({
          description: newDescription,
        });
        if (data.status === "error") {
          throw new Error(data.message);
        }
        Toast.fire({
          icon: "success",
          title: "送出熱騰騰的推文囉！",
        });
        this.tweets.splice(0, 0, {
          id: data.id,
          createdAt: new Date(),
          description: newDescription,
          User: {
            id: data.UserId,
            name: this.currentUser.name,
            account: this.currentUser.account,
            avatar: this.currentUser.avatar,
          },
          Likes: [],
        });
        this.closeCreateModal();
        this.description = "";
      } catch (error) {
        console.log(error);
        Toast.fire({
          icon: "error",
          title: "無法新增推文，請稍後再試看",
        });
      }
    },
    async createReply(payload) {
      try {
        const { tweetId, comment } = payload;
        console.log(comment);
        if (comment.length === 0) {
          Toast.fire({
            icon: "warning",
            title: "請輸入回覆內容",
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
        this.tweet.Replies.push({
          tweetId,
          comment,
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

.main-tweets {
  width: 600px;
  height: 100%;
}
.tweet-title {
  font-size: 18px;
  font-weight: 700;
  width: 600px;
  height: 55px;
  border: 1px solid #e6ecf0;
}
.tweet-title p {
  line-height: 55px;
  margin-left: 15px;
}
.tweet-create-container {
  display: flex;
  width: 600px;
  height: 120px;
  padding-top: 10px;
  border: 1px solid #e6ecf0;
  border-bottom: 10px solid #e6ecf0;
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
.tweet-input {
  width: 510px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
}
.tweet-input-content:focus {
  color: black;
}
.tweet-input-content {
  width: 510px;
  height: 26px;
  resize: none;
  border: none;
  margin-top: 10px;
  font-size: 18px;
  font-weight: 500;
  color: #9197a3;
}
.tweet-create-btn {
  width: 64px;
  height: 40px;
  background-color: #ff6000;
  border-radius: 50px;
  color: #f5f8fa;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  margin-top: 25px;
}
.tweet-create-btn:hover {
  background-color: #f75000;
}
</style>