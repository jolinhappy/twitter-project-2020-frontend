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
          <div class="name">Jolin</div>
          <div class="tweets-count">25推文</div>
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
    />
  </div>
</template>


<script>
import Sidebar from "./../components/Sidebar";
import FollowUsersList from "./../components/FollowUsersList";
import FollowTopList from "./../components/FollowTopList";
import TweetCreateModal from "./../components/TweetCreateModal";
import UserNavTab from "./../components/UserNavTab";

const dummyFollowers = [
  {
    id: 3,
    email: "user2@example.com",
    password: "$2a$10$midINOLdLpE6CpDpdmu7kuy2zGOg7uEgCUZmjwdNwgzihxqEwou6O",
    name: "user2",
    avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/randomlies/128.jpg",
    introduction: "I am user2",
    role: "user",
    account: "@user2",
    cover: "http://lorempixel.com/640/480/food",
    createdAt: "2020-10-01T08:02:45.000Z",
    updatedAt: "2020-10-01T08:02:45.000Z",
    Followship: {
      followerId: 3,
      followingId: 2,
      createdAt: "2020-09-30T12:56:39.000Z",
      updatedAt: "2020-09-30T12:56:39.000Z",
    },
    followerId: 3,
    isFollowed: false,
  },
  {
    id: 5,
    email: "user4@example.com",
    password: "$2a$10$3zsfWwpQrzLjWNEGWt..2OtsMuR84soXOY7ZawiNQzWL9HvUYaGlq",
    name: "user4",
    avatar:
      "https://s3.amazonaws.com/uifaces/faces/twitter/noufalibrahim/128.jpg",
    introduction: "I am user4",
    role: "user",
    account: "@user4",
    cover: "http://lorempixel.com/640/480/food",
    createdAt: "2020-10-01T08:02:45.000Z",
    updatedAt: "2020-10-01T08:02:45.000Z",
    Followship: {
      followerId: 5,
      followingId: 2,
      createdAt: "2020-09-30T12:56:39.000Z",
      updatedAt: "2020-09-30T12:56:39.000Z",
    },
    followerId: 5,
    isFollowed: false,
  },
];

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
    };
  },
  created() {
    this.fetchFollower();
  },
  methods: {
    showCreateModal() {
      this.createModal = true;
    },
    closeCreateModal() {
      this.createModal = false;
    },
    //TODO:用params取得id然後用在API取得資料
    fetchFollower() {
      this.followerUsers = dummyFollowers;
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