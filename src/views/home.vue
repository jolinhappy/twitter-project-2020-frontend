<template>
  <div class="container">
    <!-- sidebar -->
    <Sidebar @showCreateModal="showCreateModal" />
    <div class="main-tweets">
      <div class="tweet-create">
        <div class="tweet-title">
          <p>首頁</p>
        </div>
        <div class="tweet-create-container">
          <div class="profile-image">
            <router-link to="/users/:id">
              <img
                src="https://i.imgur.com/W2nxio3.png"
                class="user-img"
                alt=""
              />
            </router-link>
          </div>
          <div class="tweet-input">
            <textarea
              name="tweet-input-area"
              class="tweet-input-containt"
              id=""
              cols="30"
              rows="10"
              placeholder="有什麼新鮮事？"
            ></textarea>
            <button type="submit" class="tweet-create-btn">推文</button>
          </div>
        </div>
      </div>
      <UserTweetsList @showReplyModal="showReplyModal" />
    </div>
    <div class="follow-top">
      <FollowTopList />
    </div>
    <TweetCreateModal
      v-if="createModal"
      @after-click-close-create="closeCreateModal"
    />
    <TweetReplyModal
      v-if="replyModal"
      @after-click-close-reply="closeReplyModal"
    />
  </div>
</template>


<script>
import Sidebar from "./../components/Sidebar";
import UserTweetsList from "./../components/UserTweetsList";
import FollowTopList from "./../components/FollowTopList";
import TweetCreateModal from "./../components/TweetCreateModal";
import TweetReplyModal from "./../components/TweetReplyModal";
export default {
  components: {
    Sidebar,
    UserTweetsList,
    FollowTopList,
    TweetCreateModal,
    TweetReplyModal,
  },
  data() {
    return {
      createModal: false,
      replyModal: false,
    };
  },
  methods: {
    showCreateModal() {
      this.createModal = true;
    },
    closeCreateModal() {
      this.createModal = false;
    },
    showReplyModal() {
      this.replyModal = true;
    },
    closeReplyModal() {
      this.replyModal = false;
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
.tweet-input-containt {
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
</style>