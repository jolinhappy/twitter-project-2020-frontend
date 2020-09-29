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
            <img
              src="https://i.imgur.com/W2nxio3.png"
              class="user-img"
              alt=""
            />
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
  /* justify-content: center; */
}

/* sidebar
.sidebar {
  width: 378px;
  height: 100%;
}
.logo {
  width: 30px;
  height: 30px;
  margin-top: 10px;
  margin-bottom: 30px;
}
.option {
  width: 24px;
  height: 24px;
  display: inline;
  margin: auto 0;
}

.sidebar-container {
  width: 235px;
  height: 1196px;
  margin: 0 auto;
}
.sidebar-list {
  height: 100%;
  flex: 1;
}
.sidebar-item {
  width: 214px;
  height: 60px;
}
.sidebar-link {
  height: 100%;
  display: flex;
  align-items: center;
}
.show-tweet-modal {
  width: 210px;
  height: 45px;
  background-color: #ff6000;
  border-radius: 50px;
  color: #f5f8fa;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  margin-top: 10px;
  flex: 1;
}
.logout-item {
  margin-bottom: 25px;
}
.logout-link {
  display: flex;
}
span {
  font-size: 18px;
  font-weight: bold;
  line-height: 18px;
  margin: auto 0;
  margin-left: 20px;
}
.selected {
  color: #ff6000;
} */

/* main-tweets */
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
}
.user-img {
  width: 50px;
  height: 50px;
  margin-left: 15px;
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

/* tweets-list

.user-tweet {
  width: 600px;
  height: 136px;
}
.tweet-list-container {
  width: 600px;
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
.tweet-content {
  width: 510px;
  height: 66px;
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
.reply,
.like {
  width: 12.34px;
  height: 12.34px;
  line-height: 21px;
  margin: auto 0;
}
.like-count,
.reply-count {
  font-size: 13px;
  font-weight: 500;
  color: #657786;
  margin-left: 8px;
} */

/* follow-top */
/* .follow-top {
  width: 462px;
  height: 100%;
}
.follow-top-container {
  width: 350px;
  height: 517px;
  background-color: #f5f8fa;
  border-radius: 14px;
  margin-left: 45px;
  margin-right: 85px;
  margin-top: 15px;
}
.follow-top-title {
  height: 45px;
  border-bottom: 1px solid #e6ecf0;
  font-size: 18px;
  font-weight: bold;
}
.follow-top-title p {
  line-height: 45px;
  margin-left: 15px;
}
.follow-top-user {
  display: flex;
  align-items: center;
  height: 70px;
  border-bottom: 1px solid #e6ecf0;
}
.top-user-info {
  width: 150px;
}
.top-user-image {
  height: 70px;
}
.top-user-image .user-img {
  margin-top: 8px;
}
.follow-btn {
  width: 100px;
  height: 70px;
  display: flex;
  justify-content: flex-end;
}
.followed {
  width: 92px;
  height: 38px;
  background-color: #ff6000;
  border-radius: 100px;
  color: #f5f8fa;
  margin: auto 0;
  font-size: 15px;
  font-weight: bold;
}
.follow {
  width: 62px;
  height: 30px;
  border-radius: 100px;
  border: 1px solid #ff6000;
  color: #ff6000;
  font-size: 15px;
  font-weight: bold;
  margin: auto 0;
}
.more {
  height: 45px;
  font-size: 15px;
  font-weight: bold;
  color: #ff6000;
}
.readMore {
  line-height: 45px;
  margin-left: 15px;
} */
</style>

