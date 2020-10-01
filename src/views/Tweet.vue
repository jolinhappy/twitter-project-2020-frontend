<template>
  <div class="container">
    <!-- sidebar -->
    <Sidebar @showCreateModal="showCreateModal" />
    <div class="user-tweet">
      <div class="user-tweet-card">
        <div class="tweet-title">
          <a href="#" class="back-button"
            ><img
              src="https://i.imgur.com/aPVTDn2.png"
              class="back-img"
              alt=""
            />
          </a>
          <div class="title-content">
            <div class="title-name">推文</div>
          </div>
        </div>

        <div class="user-tweet-content">
          <div class="tweet-info">
            <div class="profile-image">
              <img
                src="https://i.imgur.com/W2nxio3.png"
                class="user-img"
                alt=""
              />
            </div>
            <div class="user-info">
              <a href="#" class="user-name-link">
                <div class="user-name">username</div>
              </a>
              <div class="user-account">@12345</div>
            </div>
          </div>
          <div class="tweet">
            <div class="user-tweet-text">
              jiejwir2irj 2r ij2oij ri2j roir32ro
            </div>
            <div class="create-time">3天前</div>
          </div>
        </div>
        <div class="action-count">
          <div class="user-reply-count"><strong>20</strong>回覆</div>
          <div class="user-like-count"><strong>3000</strong>喜歡次數</div>
        </div>
        <div class="main-tweet-action" @click="showReplyModal">
          <div class="tweet-reply">
            <img
              src="https://i.imgur.com/SaR8cz3.png"
              class="reply-icon"
              alt="reply"
            />
          </div>
          <div class="tweet-like">
            <img
              src="https://i.imgur.com/qs9Pe3N.png"
              class="like-icon"
              alt="like"
            />
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
</style>