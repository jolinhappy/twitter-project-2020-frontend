<template>
  <div class="container">
    <!-- sidebar -->
    <Sidebar @showCreateModal="showCreateModal" />
    <div class="main-profile">
      <UserProfileCard
        @showEditModal="showEditModal"
        :user="user"
        :followers="followers"
        :followings="followings"
        :tweets="tweets"
        :isMyself="isMyself"
        :isFollowed="isFollowed"
      />
      <UserTweetsList
        @showReplyModal="showReplyModal"
        :pageMode="pageMode"
        :initial-tweets="tweets"
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
      :initialUser="user"
      @after-submit="handleAfterSubmit"
    />
  </div>
</template>


<script>
import Sidebar from "./../components/Sidebar";
import UserTweetsList from "./../components/UserTweetsList";
import FollowTopList from "./../components/FollowTopList";
import TweetCreateModal from "./../components/TweetCreateModal";
import TweetReplyModal from "./../components/TweetReplyModal";
import UserProfileEditModal from "./../components/UserProfileEditModal";
import UserProfileCard from "./../components/UserProfileCard";
import { v4 as uuidv4 } from "uuid";
import tweetsAPI from "./../apis/tweets";
import userAPI from "./../apis/users";
import { Toast } from "./../utils/helpers";

const dummyCurrentUser = {
  currentUser: {
    id: 1,
    name: "dummy",
    account: "@dummy",
    email: "123@hhhh.com",
    avatar:
      "https://s3.amazonaws.com/uifaces/faces/twitter/chrisvanderkooi/128.jpg",
  },
  isAuthenticated: true,
};

//TODO:用API帶入id拿對應使用這的資料

export default {
  name: "UserProfile",
  components: {
    Sidebar,
    UserTweetsList,
    FollowTopList,
    TweetCreateModal,
    TweetReplyModal,
    UserProfileEditModal,
    UserProfileCard,
  },
  data() {
    return {
      createModal: false,
      replyModal: false,
      editModal: false,
      pageMode: "main",
      tweets: [],
      tweet: {},
      currentUser: {},
      description: "",
      user: {
        id: -1,
        name: "",
        account: "",
        avatar: "",
        cover: "",
        introduction: "",
      },
      followers: [],
      followings: [],
      isMyself: false,
      isFollowed: false,
    };
  },
  created() {
    const { id: userId } = this.$route.params;
    this.fetchCurrentUser();
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
    showReplyModal(replyTweet) {
      this.replyModal = true;
      this.tweet = replyTweet;
    },
    closeReplyModal() {
      this.replyModal = false;
    },
    showEditModal() {
      this.editModal = true;
    },
    closeEditModal() {
      this.editModal = false;
    },
    fetchCurrentUser() {
      this.currentUser = {
        ...this.currentUser,
        ...dummyCurrentUser.currentUser,
      };
      this.isAuthenticated = dummyCurrentUser.isAuthenticated;
    },
    async fetchUserTweets(userId) {
      try {
        const { data } = await userAPI.getUserTweets({ userId });
        console.log(data);
        this.tweets = data;
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
        const {
          id,
          name,
          account,
          avatar,
          cover,
          introduction,
          isMyself,
          isFollowed,
        } = data;
        this.user = {
          ...this.user,
          id,
          name,
          account,
          avatar,
          cover,
          introduction,
        };
        this.followers = data.Followers;
        this.followings = data.Followings;
        this.isMyself = isMyself;
        this.isFollowed = isFollowed;
      } catch (error) {
        console.log(error);
        Toast.fire({
          icon: "error",
          title: "無法取得使用者資料，請稍後再試",
        });
      }
    },
    handleAfterSubmit(formData) {
      console.log(formData);
      for (let [name, value] of formData.entries()) {
        console.log(name + ": " + value);
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
    createReply(payload) {
      const { id, TweetId, comment } = payload;
      this.tweet.Replies.push({
        id,
        TweetId,
        User: {
          id: this.currentUser.id,
          name: this.currentUser.name,
        },
        comment,
        createdAt: new Date(),
      });
      this.closeReplyModal();
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

.main-profile {
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
.info-title {
  font-size: 18px;
  font-weight: 700;
  width: 600px;
  height: 55px;
  border: 1px solid #e6ecf0;
  display: flex;
}

.profile-image {
  width: 70px;
  height: 120px;
}

.name {
  font-size: 19px;
  font-weight: 900;
  margin-top: 5px;
}
.tweets-count {
  font-size: 13px;
  font-weight: 500;
  color: #657786;
}
.cover-part {
  width: 598px;
  display: flex;
  align-items: center;
}
.cover-img {
  width: 600px;
  height: 200px;
}
.user-img-part {
  background: #ffffff;
  width: 150px;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  position: absolute;
  left: 15px;
  bottom: 195px;
}
.user-main-img {
  width: 140px;
  height: 140px;
  object-fit: cover;
  border-radius: 50%;
}

.detail-info-part {
  width: 600px;
  height: 230px;
  display: flex;
  flex-direction: column;
  margin-left: 20px;
}

.button-part {
  width: 600px;
  display: flex;
  margin-left: -35px;
  justify-content: flex-end;
  margin-top: 10px;
}
.edit-info {
  width: 122px;
  height: 40px;
  font-size: 15px;
  font-weight: bold;
  border: 1px solid #ff6600;
  border-radius: 100px;
  color: #ff6600;
}
.message-icon,
.notice-icon {
  width: 40px;
  height: 40px;
}
.following {
  width: 92px;
  height: 40px;
  background: #ff6600;
  font-weight: bold;
  font-size: 15px;
  color: white;
  border-radius: 100px;
}
.name-info {
  margin-top: 30px;
  margin-bottom: 10px;
}
.user-name {
  font-size: 19px;
  font-weight: 900;
}
.user-account {
  font-size: 15px;
  font-weight: 500;
  color: #657786;
}
.discription {
  line-height: 20px;
  font-size: 14px;
  font-weight: normal;
  margin-top: 10px;
}

.follow-info {
  display: flex;
  font-size: 14px;
  font-weight: 500;
}
.followings {
  margin-right: 20px;
}
</style>