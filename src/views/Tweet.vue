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
              <img :src="tweet.User.avatar" class="user-img" alt="" />
            </div>
            <div class="user-info">
              <a href="#" class="user-name-link">
                <div class="user-name">{{ tweet.User.name }}</div>
              </a>
              <div class="user-account">{{ tweet.User.account }}</div>
            </div>
          </div>
          <div class="tweet">
            <div class="user-tweet-text">
              {{ tweet.description }}
            </div>
            <div class="create-time">{{ tweet.createdAt | fromNow }}</div>
          </div>
        </div>
        <div class="action-count">
          <div class="user-reply-count">
            <strong>{{ tweet.Replies.length }}</strong
            >回覆
          </div>
          <div class="user-like-count">
            <strong>{{ tweet.LikedUsers.length }}</strong
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
              @click="deleteLike()"
            />
          </div>
          <div class="tweet-like" v-else>
            <img
              src="https://i.imgur.com/qs9Pe3N.png"
              class="like-icon"
              alt="like"
              @click="addLike()"
            />
          </div>
        </div>
      </div>
      <UserTweetsList
        @showReplyModal="showReplyModal"
        :pageMode="pageMode"
        :initial-tweets="tweets"
        :mainTweet="tweet"
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
    />
  </div>
</template>


<script>
import Sidebar from "./../components/Sidebar";
import UserTweetsList from "./../components/UserTweetsList";
import FollowTopList from "./../components/FollowTopList";
import TweetCreateModal from "./../components/TweetCreateModal";
import TweetReplyModal from "./../components/TweetReplyModal";
import { fromNowFilter } from "./../utils/mixins";
import { v4 as uuidv4 } from "uuid";

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
const dummyTweet = {
  id: 2,
  UserId: 2,
  description: "Voluptatem quibusdam perspiciatis non est fugit et.",
  createdAt: "2020-10-03T03:27:11.000Z",
  updatedAt: "2020-10-03T03:27:11.000Z",
  User: {
    id: 2,
    email: "user1@example.com",
    password: "$2a$10$nB2zP5szxWym4mgxztzDf.bDnXWcZF8FCkqgVlObo6E6WFpBeKZ1y",
    name: "user1",
    avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/bublienko/128.jpg",
    introduction: "I am user1",
    role: "user",
    account: "@user1",
    cover: "http://lorempixel.com/640/480/sports",
    createdAt: "2020-10-03T03:27:10.000Z",
    updatedAt: "2020-10-03T03:27:10.000Z",
  },
  Replies: [
    {
      id: 4,
      UserId: 6,
      TweetId: 2,
      comment:
        "Pariatur voluptatem non. Et minima quis in voluptas est ipsa sit dicta nesciunt. Beatae soluta et consequatur pariatur perferendis omnis esse. Laudantium voluptas voluptas blanditiis repellendus optio quibusdam totam et velit. Repellat facilis animi voluptatibus et ab quam omnis. Eius sint et quis sint ratione qui harum asperiores et.",
      createdAt: "2020-10-03T03:27:11.000Z",
      updatedAt: "2020-10-03T03:27:11.000Z",
    },
    {
      id: 5,
      UserId: 5,
      TweetId: 2,
      comment: "nisi",
      createdAt: "2020-10-03T03:27:11.000Z",
      updatedAt: "2020-10-03T03:27:11.000Z",
    },
    {
      id: 6,
      UserId: 3,
      TweetId: 2,
      comment:
        "Id voluptas quis quibusdam facere quod ut sit dicta dolore.\nEt illo temporibus.",
      createdAt: "2020-10-03T03:27:11.000Z",
      updatedAt: "2020-10-03T03:27:11.000Z",
    },
  ],
  LikedUsers: [],
  isLiked: false,
};
const dummyReplies = [
  {
    id: 1,
    UserId: 3,
    TweetId: 1,
    comment: "alias",
    createdAt: "2020-10-03T03:27:11.000Z",
    updatedAt: "2020-10-03T03:27:11.000Z",
    User: {
      id: 3,
      email: "user2@example.com",
      password: "$2a$10$/idL7fvEx1KV5ZYBvaXXCef6R54PMZwTtpalFqZ7CcTuvT7AUAGfe",
      name: "user2",
      avatar:
        "https://s3.amazonaws.com/uifaces/faces/twitter/jennyshen/128.jpg",
      introduction: "I am user2",
      role: "user",
      account: "@user2",
      cover: "http://lorempixel.com/640/480/nature",
      createdAt: "2020-10-03T03:27:10.000Z",
      updatedAt: "2020-10-03T03:27:10.000Z",
    },
  },
  {
    id: 2,
    UserId: 4,
    TweetId: 1,
    comment:
      "Porro similique corporis dolorem.\nAliquid cum molestiae consequatur occaecati.",
    createdAt: "2020-10-03T03:27:11.000Z",
    updatedAt: "2020-10-03T03:27:11.000Z",
    User: {
      id: 4,
      email: "user3@example.com",
      password: "$2a$10$mY2Q2EAdWvfwcHyBYefIteWMl2rrzwidezIYeX5XyVTEpG8FZ7eMO",
      name: "user3",
      avatar:
        "https://s3.amazonaws.com/uifaces/faces/twitter/sweetdelisa/128.jpg",
      introduction: "I am user3",
      role: "user",
      account: "@user3",
      cover: "http://lorempixel.com/640/480/people",
      createdAt: "2020-10-03T03:27:11.000Z",
      updatedAt: "2020-10-03T03:27:11.000Z",
    },
  },
  {
    id: 3,
    UserId: 2,
    TweetId: 1,
    comment: "fugiat",
    createdAt: "2020-10-03T03:27:11.000Z",
    updatedAt: "2020-10-03T03:27:11.000Z",
    User: {
      id: 2,
      email: "user1@example.com",
      password: "$2a$10$nB2zP5szxWym4mgxztzDf.bDnXWcZF8FCkqgVlObo6E6WFpBeKZ1y",
      name: "user1",
      avatar:
        "https://s3.amazonaws.com/uifaces/faces/twitter/bublienko/128.jpg",
      introduction: "I am user1",
      role: "user",
      account: "@user1",
      cover: "http://lorempixel.com/640/480/sports",
      createdAt: "2020-10-03T03:27:10.000Z",
      updatedAt: "2020-10-03T03:27:10.000Z",
    },
  },
];
export default {
  name: "Tweet",
  mixins: [fromNowFilter],
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
      editModal: false,
      pageMode: "reply",
      description: "",
      tweet: {},
      tweets: [],
      currentUser: {},
    };
  },
  created() {
    this.fetchCurrentUser();
    this.fetchTweet();
    this.fetchReplies();
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
    fetchTweet() {
      this.tweet = dummyTweet;
    },
    fetchReplies() {
      this.tweets = dummyReplies;
    },
    fetchCurrentUser() {
      this.currentUser = {
        ...this.currentUser,
        ...dummyCurrentUser.currentUser,
      };
      this.isAuthenticated = dummyCurrentUser.isAuthenticated;
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
    createReply(payload) {
      const { id, TweetId, comment } = payload;
      console.log(this.tweet.Replies);
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
    addLike() {
      this.tweet.isLiked = true;
      this.tweet.LikedUsers.push({
        id: uuidv4(),
        UserId: this.currentUser,
        TweetId: this.tweet.id,
      });
    },
    deleteLike() {
      this.tweet.isLiked = false;
      console.log(this.tweet.LikedUsers);
      this.tweet.LikedUsers.splice(0, 1);
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
  border-bottom: 1px solid #000;
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