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
        :tweets="tweets"
      />
    </div>
    <div class="follow-top">
      <FollowTopList :pageMode="pageMode" :tweets="tweets" />
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
    />
    <UserProfileEditModal
      v-if="editModal"
      @after-click-close-edit="closeEditModal"
      :initialUser="user"
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
const dummyTweetsLike = [
  {
    id: 1,
    UserId: 2,
    TweetId: 1,
    createdAt: "2020-09-30T12:56:39.000Z",
    updatedAt: "2020-09-30T12:56:39.000Z",
    Tweet: {
      id: 1,
      UserId: 2,
      description: "ex",
      createdAt: "2020-10-01T08:02:46.000Z",
      updatedAt: "2020-10-01T08:02:46.000Z",
      Replies: [
        {
          id: 1,
          UserId: 4,
          TweetId: 1,
          comment: "ex voluptas odit",
          createdAt: "2020-10-01T08:02:46.000Z",
          updatedAt: "2020-10-01T08:02:46.000Z",
        },
        {
          id: 2,
          UserId: 3,
          TweetId: 1,
          comment: "sit error et",
          createdAt: "2020-10-01T08:02:46.000Z",
          updatedAt: "2020-10-01T08:02:46.000Z",
        },
        {
          id: 3,
          UserId: 5,
          TweetId: 1,
          comment: "voluptates est omnis",
          createdAt: "2020-10-01T08:02:46.000Z",
          updatedAt: "2020-10-01T08:02:46.000Z",
        },
      ],
      User: {
        id: 2,
        email: "user1@example.com",
        password:
          "$2a$10$3wamA26AS7tJ8szugZM38.n3ebSvNRtVuDxqb4rN1aVa0IAMEXNOq",
        name: "user1",
        avatar:
          "https://s3.amazonaws.com/uifaces/faces/twitter/chrisvanderkooi/128.jpg",
        introduction: "I am user1",
        role: "user",
        account: "@user1",
        cover: "http://lorempixel.com/640/480/abstract",
        createdAt: "2020-10-01T08:02:45.000Z",
        updatedAt: "2020-10-01T08:02:45.000Z",
      },
      Likes: [
        {
          id: 1,
          UserId: 2,
          TweetId: 1,
          createdAt: "2020-09-30T12:56:39.000Z",
          updatedAt: "2020-09-30T12:56:39.000Z",
        },
        {
          id: 3,
          UserId: 3,
          TweetId: 1,
          createdAt: "2020-09-30T12:56:39.000Z",
          updatedAt: "2020-09-30T12:56:39.000Z",
        },
        {
          id: 4,
          UserId: 6,
          TweetId: 1,
          createdAt: "2020-09-30T12:56:39.000Z",
          updatedAt: "2020-09-30T12:56:39.000Z",
        },
      ],
    },
    isLiked: true,
  },
  {
    id: 2,
    UserId: 2,
    TweetId: 44,
    createdAt: "2020-09-30T12:56:39.000Z",
    updatedAt: "2020-09-30T12:56:39.000Z",
    Tweet: {
      id: 44,
      UserId: 6,
      description: "nobis",
      createdAt: "2020-10-01T08:02:46.000Z",
      updatedAt: "2020-10-01T08:02:46.000Z",
      Replies: [
        {
          id: 130,
          UserId: 6,
          TweetId: 44,
          comment:
            "Ut laboriosam laborum sint non dolor.\nAdipisci vel quae ut.\nVelit quam sint alias quis rem odit assumenda praesentium.",
          createdAt: "2020-10-01T08:02:46.000Z",
          updatedAt: "2020-10-01T08:02:46.000Z",
        },
        {
          id: 131,
          UserId: 3,
          TweetId: 44,
          comment:
            "Voluptatem quisquam saepe et enim est minima mollitia dolor.",
          createdAt: "2020-10-01T08:02:46.000Z",
          updatedAt: "2020-10-01T08:02:46.000Z",
        },
        {
          id: 132,
          UserId: 5,
          TweetId: 44,
          comment:
            "Sunt omnis voluptas omnis rem qui quis fugiat. Dignissimos ut qui cupiditate iure dolor sit voluptate laborum.",
          createdAt: "2020-10-01T08:02:46.000Z",
          updatedAt: "2020-10-01T08:02:46.000Z",
        },
      ],
      User: {
        id: 6,
        email: "user5@example.com",
        password:
          "$2a$10$nEnsh73Oud6gE36AHq6fVug53Fz43N/ohIJiDq0tnc1WArpEC6oW6",
        name: "user5",
        avatar:
          "https://s3.amazonaws.com/uifaces/faces/twitter/hanna_smi/128.jpg",
        introduction: "I am user5",
        role: "user",
        account: "@user5",
        cover: "http://lorempixel.com/640/480/fashion",
        createdAt: "2020-10-01T08:02:46.000Z",
        updatedAt: "2020-10-01T08:02:46.000Z",
      },
      Likes: [
        {
          id: 2,
          UserId: 2,
          TweetId: 44,
          createdAt: "2020-09-30T12:56:39.000Z",
          updatedAt: "2020-09-30T12:56:39.000Z",
        },
      ],
    },
    isLiked: true,
  },
];

const dummyUser = {
  id: 2,
  email: "user1@example.com",
  password: "$2a$10$3wamA26AS7tJ8szugZM38.n3ebSvNRtVuDxqb4rN1aVa0IAMEXNOq",
  name: "user1",
  avatar:
    "https://s3.amazonaws.com/uifaces/faces/twitter/chrisvanderkooi/128.jpg",
  introduction: "I am user1",
  role: "user",
  account: "@user1",
  cover: "http://lorempixel.com/640/480/abstract",
  createdAt: "2020-10-01T08:02:45.000Z",
  updatedAt: "2020-10-01T08:02:45.000Z",
  Followers: [
    {
      id: 3,
      email: "user2@example.com",
      password: "$2a$10$midINOLdLpE6CpDpdmu7kuy2zGOg7uEgCUZmjwdNwgzihxqEwou6O",
      name: "user2",
      avatar:
        "https://s3.amazonaws.com/uifaces/faces/twitter/randomlies/128.jpg",
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
    },
  ],
  Followings: [
    {
      id: 3,
      email: "user2@example.com",
      password: "$2a$10$midINOLdLpE6CpDpdmu7kuy2zGOg7uEgCUZmjwdNwgzihxqEwou6O",
      name: "user2",
      avatar:
        "https://s3.amazonaws.com/uifaces/faces/twitter/randomlies/128.jpg",
      introduction: "I am user2",
      role: "user",
      account: "@user2",
      cover: "http://lorempixel.com/640/480/food",
      createdAt: "2020-10-01T08:02:45.000Z",
      updatedAt: "2020-10-01T08:02:45.000Z",
      Followship: {
        followerId: 2,
        followingId: 3,
        createdAt: "2020-09-30T12:56:39.000Z",
        updatedAt: "2020-09-30T12:56:39.000Z",
      },
    },
    {
      id: 4,
      email: "user3@example.com",
      password: "$2a$10$Iw6Dxi0uwEhtv80niOrmbO0TDy02HsfobmxiqnhSJOE/9Ywd0VoAK",
      name: "user3",
      avatar:
        "https://s3.amazonaws.com/uifaces/faces/twitter/lebinoclard/128.jpg",
      introduction: "I am user3",
      role: "user",
      account: "@user3",
      cover: "http://lorempixel.com/640/480/nature",
      createdAt: "2020-10-01T08:02:45.000Z",
      updatedAt: "2020-10-01T08:02:45.000Z",
      Followship: {
        followerId: 2,
        followingId: 4,
        createdAt: "2020-09-30T12:56:39.000Z",
        updatedAt: "2020-09-30T12:56:39.000Z",
      },
    },
  ],
  isMyself: false,
  isFollowed: false,
};
export default {
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
    this.fetchUserTweets();
    this.fetchUser();
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
    showReplyModal() {
      this.replyModal = true;
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
    fetchUserTweets() {
      this.tweets = dummyTweetsLike.map((tweet) => {
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
      console.log(this.tweets);
    },
    fetchUser() {
      const {
        id,
        name,
        account,
        avatar,
        cover,
        introduction,
        isMyself,
        isFollowed,
      } = dummyUser;
      this.user = {
        ...this.user,
        id,
        name,
        account,
        avatar,
        cover,
        introduction,
      };
      this.followers = dummyUser.Followers;
      this.followings = dummyUser.Followings;
      this.isMyself = isMyself;
      this.isFollowed = isFollowed;
    },
    creatTweetFromModal(newDescription) {
      console.log("new", newDescription);
      this.tweets.push({
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