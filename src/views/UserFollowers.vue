<template>
  <div class="container">
    <!-- sidebar -->
    <Sidebar @showCreateModal="showCreateModal" />
    <div class="main-follow-info">
      <div class="info-title">
        <button class="back-button" @click="$router.back()">
          <img src="https://i.imgur.com/aPVTDn2.png" class="back-img" alt="" />
        </button>
        <div class="title-content">
          <div class="name">{{ userName }}</div>
          <div class="tweets-count">{{ tweets.length }}推文</div>
        </div>
      </div>
      <div class="follow-tab">
        <UserNavTab :isFollowPage="isFollowPage" />
      </div>
      <!-- USER -->
      <FollowUsersList :initialFollowData="followerUsers" />
    </div>
    <div class="follow-top">
      <FollowTopList />
    </div>
    <TweetCreateModal
      v-if="createModal"
      @after-click-close-create="closeCreateModal"
      :initial-description="description"
      @afterSubmit="creatTweetFromModal"
    />
  </div>
</template>


<script>
import Sidebar from "./../components/Sidebar";
import FollowUsersList from "./../components/FollowUsersList";
import FollowTopList from "./../components/FollowTopList";
import TweetCreateModal from "./../components/TweetCreateModal";
import UserNavTab from "./../components/UserNavTab";
import userAPI from "./../apis/users";
import { Toast } from "./../utils/helpers";
import tweetsAPI from "./../apis/tweets";

export default {
  name: "UserFollowers",
  components: {
    Sidebar,
    FollowUsersList,
    FollowTopList,
    TweetCreateModal,
    UserNavTab,
  },
  data() {
    return {
      createModal: false,
      replyModal: false,
      isFollowPage: true,
      followerUsers: [],
      tweets: [],
      userName: "",
      description: "",
    };
  },
  created() {
    const { id: userId } = this.$route.params;
    this.fetchFollower(userId);
    this.fetchUserTweets(userId);
    this.fetchUser(userId);
  },
  methods: {
    showCreateModal() {
      this.createModal = true;
    },
    closeCreateModal() {
      this.createModal = false;
    },
    CreateFinish() {
      this.$router.push({ name: "tweets-home" });
    },
    async fetchUserTweets(userId) {
      try {
        const { data } = await userAPI.getUserLikedTweets({ userId });
        this.tweets = data.map((tweet) => {
          return {
            ...tweet,
            tweet: {
              ...tweet.Tweet,
              isLiked: tweet.isLiked,
            },
          };
        });
        this.tweets = this.tweets.map((tweet) => {
          return tweet.tweet;
        });
      } catch (error) {
        console.log(error);
        Toast.fire({
          icon: "error",
          title: "無法讀取推文資料，請稍後再試",
        });
      }
    },
    async fetchUser(userId) {
      try {
        const { data } = await userAPI.getUser({ userId });
        console.log(data);
        const { name } = data;
        this.userName = name;
      } catch (error) {
        console.log(error);
        Toast.fire({
          icon: "error",
          title: "無法取得使用者資料，請稍後再試",
        });
      }
    },
    async fetchFollower(userId) {
      try {
        const { data } = await userAPI.getFollowers({ userId });
        this.followerUsers = data;
      } catch (error) {
        console.log(error);
        Toast.fire({
          icon: "error",
          title: "無法取得追總者清單，請稍後再試",
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
        this.CreateFinish();
      } catch (error) {
        console.log(error);
        Toast.fire({
          icon: "error",
          title: "無法新增推文，請稍後再試看",
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

.main-follow-info {
  width: 600px;
  height: 100%;
  border-left: 1px solid #e6ecf0;
  border-right: 1px solid #e6ecf0;
}
.back-img {
  width: 24px;
  height: 24px;
  display: inline;
  margin: auto 15px;
  margin-top: 5px;
}
.info-title {
  font-size: 18px;
  font-weight: 700;
  width: 600px;
  height: 55px;
  border-left: 1px solid #e6ecf0;
  border-right: 1px solid #e6ecf0;
  display: flex;
}
.title-content {
  margin-left: 25px;
  padding: auto 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.tweets-count {
  font-size: 13px;
  font-weight: 500;
  color: #657786;
}
.follow-tab {
  margin-top: 14px;
}
</style>