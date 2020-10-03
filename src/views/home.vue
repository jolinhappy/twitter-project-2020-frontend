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
              <img :src="currentUser.avatar" class="user-img" alt="" />
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
            >
              推文
            </button>
          </form>
        </div>
      </div>
      <UserTweetsList
        @showReplyModal="showReplyModal"
        :pageMode="pageMode"
        :tweets="tweets"
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
    />
  </div>
</template>


<script>
import Sidebar from "./../components/Sidebar";
import UserTweetsList from "./../components/UserTweetsList";
import FollowTopList from "./../components/FollowTopList";
import TweetCreateModal from "./../components/TweetCreateModal";
import TweetReplyModal from "./../components/TweetReplyModal";
import { v4 as uuidv4 } from "uuid";

const dummyUser = {
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

const dummyTweets = [
  {
    id: 1,
    UserId: 2,
    description: "ex",
    createdAt: "2020-10-01T08:02:46.000Z",
    updatedAt: "2020-10-01T08:02:46.000Z",
    User: {
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
    },
  },
  {
    id: 2,
    UserId: 2,
    description: "Molestias maxime dolorem culpa reprehenderit.",
    createdAt: "2020-10-01T08:02:46.000Z",
    updatedAt: "2020-10-01T08:02:46.000Z",
    User: {
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
    },
  },
  {
    id: 3,
    UserId: 2,
    description: "sit",
    createdAt: "2020-10-01T08:02:46.000Z",
    updatedAt: "2020-10-01T08:02:46.000Z",
    User: {
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
    },
  },
  {
    id: 4,
    UserId: 2,
    description: "Magnam ea modi est ut unde nemo repellat.\nDolores ",
    createdAt: "2020-10-01T08:02:46.000Z",
    updatedAt: "2020-10-01T08:02:46.000Z",
    User: {
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
    },
  },
  {
    id: 5,
    UserId: 2,
    description: "qui",
    createdAt: "2020-10-01T08:02:46.000Z",
    updatedAt: "2020-10-01T08:02:46.000Z",
    User: {
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
    },
  },
  {
    id: 6,
    UserId: 2,
    description: "Distinctio eos dignissimos nisi voluptas. Quidem i",
    createdAt: "2020-10-01T08:02:46.000Z",
    updatedAt: "2020-10-01T08:02:46.000Z",
    User: {
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
    },
  },
  {
    id: 7,
    UserId: 2,
    description: "Ratione assumenda similique. Id voluptate eveniet ",
    createdAt: "2020-10-01T08:02:46.000Z",
    updatedAt: "2020-10-01T08:02:46.000Z",
    User: {
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
    },
  },
  {
    id: 8,
    UserId: 2,
    description: "Velit pariatur at est accusantium. Harum provident",
    createdAt: "2020-10-01T08:02:46.000Z",
    updatedAt: "2020-10-01T08:02:46.000Z",
    User: {
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
    },
  },
  {
    id: 9,
    UserId: 2,
    description: "quis beatae qui",
    createdAt: "2020-10-01T08:02:46.000Z",
    updatedAt: "2020-10-01T08:02:46.000Z",
    User: {
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
    },
  },
  {
    id: 10,
    UserId: 2,
    description: "facere quas et",
    createdAt: "2020-10-01T08:02:46.000Z",
    updatedAt: "2020-10-01T08:02:46.000Z",
    User: {
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
    },
  },
  {
    id: 11,
    UserId: 3,
    description: "Asperiores quidem ducimus.\nSunt debitis optio accu",
    createdAt: "2020-10-01T08:02:46.000Z",
    updatedAt: "2020-10-01T08:02:46.000Z",
    User: {
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
    },
  },
  {
    id: 12,
    UserId: 3,
    description: "possimus",
    createdAt: "2020-10-01T08:02:46.000Z",
    updatedAt: "2020-10-01T08:02:46.000Z",
    User: {
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
    },
  },
  {
    id: 13,
    UserId: 3,
    description: "non",
    createdAt: "2020-10-01T08:02:46.000Z",
    updatedAt: "2020-10-01T08:02:46.000Z",
    User: {
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
    },
  },
  {
    id: 14,
    UserId: 3,
    description: "Magnam voluptate eveniet corrupti ea qui maiores. ",
    createdAt: "2020-10-01T08:02:46.000Z",
    updatedAt: "2020-10-01T08:02:46.000Z",
    User: {
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
    },
  },
  {
    id: 15,
    UserId: 3,
    description: "Modi sint optio impedit inventore est eius. Reicie",
    createdAt: "2020-10-01T08:02:46.000Z",
    updatedAt: "2020-10-01T08:02:46.000Z",
    User: {
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
    },
  },
  {
    id: 16,
    UserId: 3,
    description: "unde",
    createdAt: "2020-10-01T08:02:46.000Z",
    updatedAt: "2020-10-01T08:02:46.000Z",
    User: {
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
    },
  },
  {
    id: 17,
    UserId: 3,
    description: "Nihil et error dolores. Saepe ab qui tempora quaer",
    createdAt: "2020-10-01T08:02:46.000Z",
    updatedAt: "2020-10-01T08:02:46.000Z",
    User: {
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
    },
  },
  {
    id: 18,
    UserId: 3,
    description: "Et odit laborum reiciendis expedita autem. Eos lab",
    createdAt: "2020-10-01T08:02:46.000Z",
    updatedAt: "2020-10-01T08:02:46.000Z",
    User: {
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
    },
  },
  {
    id: 19,
    UserId: 3,
    description: "Dolores dolore delectus vitae voluptates reiciendi",
    createdAt: "2020-10-01T08:02:46.000Z",
    updatedAt: "2020-10-01T08:02:46.000Z",
    User: {
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
    },
  },
  {
    id: 20,
    UserId: 3,
    description: "cum neque fuga",
    createdAt: "2020-10-01T08:02:46.000Z",
    updatedAt: "2020-10-01T08:02:46.000Z",
    User: {
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
    },
  },
  {
    id: 21,
    UserId: 4,
    description: "porro",
    createdAt: "2020-10-01T08:02:46.000Z",
    updatedAt: "2020-10-01T08:02:46.000Z",
    User: {
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
    },
  },
  {
    id: 22,
    UserId: 4,
    description: "id",
    createdAt: "2020-10-01T08:02:46.000Z",
    updatedAt: "2020-10-01T08:02:46.000Z",
    User: {
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
    },
  },
  {
    id: 23,
    UserId: 4,
    description: "Voluptas at ipsum blanditiis. Iste quia sed unde q",
    createdAt: "2020-10-01T08:02:46.000Z",
    updatedAt: "2020-10-01T08:02:46.000Z",
    User: {
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
    },
  },
  {
    id: 24,
    UserId: 4,
    description: "sed",
    createdAt: "2020-10-01T08:02:46.000Z",
    updatedAt: "2020-10-01T08:02:46.000Z",
    User: {
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
    },
  },
  {
    id: 25,
    UserId: 4,
    description: "Voluptas ipsam sit ipsa. Accusamus aperiam assumen",
    createdAt: "2020-10-01T08:02:46.000Z",
    updatedAt: "2020-10-01T08:02:46.000Z",
    User: {
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
    },
  },
  {
    id: 26,
    UserId: 4,
    description: "Excepturi exercitationem dolor consequatur dolorem",
    createdAt: "2020-10-01T08:02:46.000Z",
    updatedAt: "2020-10-01T08:02:46.000Z",
    User: {
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
    },
  },
  {
    id: 27,
    UserId: 4,
    description: "Suscipit dolore quod sed.\nEa qui laboriosam rem ut",
    createdAt: "2020-10-01T08:02:46.000Z",
    updatedAt: "2020-10-01T08:02:46.000Z",
    User: {
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
    },
  },
  {
    id: 28,
    UserId: 4,
    description: "Et blanditiis molestiae nesciunt dicta veritatis r",
    createdAt: "2020-10-01T08:02:46.000Z",
    updatedAt: "2020-10-01T08:02:46.000Z",
    User: {
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
    },
  },
  {
    id: 29,
    UserId: 4,
    description: "Animi assumenda corporis excepturi necessitatibus ",
    createdAt: "2020-10-01T08:02:46.000Z",
    updatedAt: "2020-10-01T08:02:46.000Z",
    User: {
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
    },
  },
  {
    id: 30,
    UserId: 4,
    description: "Omnis sapiente exercitationem similique ut molesti",
    createdAt: "2020-10-01T08:02:46.000Z",
    updatedAt: "2020-10-01T08:02:46.000Z",
    User: {
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
    },
  },
  {
    id: 31,
    UserId: 5,
    description: "natus repellat est",
    createdAt: "2020-10-01T08:02:46.000Z",
    updatedAt: "2020-10-01T08:02:46.000Z",
    User: {
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
    },
  },
  {
    id: 32,
    UserId: 5,
    description: "Nostrum voluptatum minus nulla commodi.",
    createdAt: "2020-10-01T08:02:46.000Z",
    updatedAt: "2020-10-01T08:02:46.000Z",
    User: {
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
    },
  },
  {
    id: 33,
    UserId: 5,
    description: "Fuga est ad sequi sint ipsa. Excepturi error dolor",
    createdAt: "2020-10-01T08:02:46.000Z",
    updatedAt: "2020-10-01T08:02:46.000Z",
    User: {
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
    },
  },
  {
    id: 34,
    UserId: 5,
    description: "Porro rem laborum nihil eius ad.\nVero laboriosam m",
    createdAt: "2020-10-01T08:02:46.000Z",
    updatedAt: "2020-10-01T08:02:46.000Z",
    User: {
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
    },
  },
  {
    id: 35,
    UserId: 5,
    description: "In autem beatae non excepturi atque nemo ea fuga c",
    createdAt: "2020-10-01T08:02:46.000Z",
    updatedAt: "2020-10-01T08:02:46.000Z",
    User: {
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
    },
  },
  {
    id: 36,
    UserId: 5,
    description: "Voluptate eligendi placeat autem non.\nDoloribus pe",
    createdAt: "2020-10-01T08:02:46.000Z",
    updatedAt: "2020-10-01T08:02:46.000Z",
    User: {
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
    },
  },
  {
    id: 37,
    UserId: 5,
    description: "sit",
    createdAt: "2020-10-01T08:02:46.000Z",
    updatedAt: "2020-10-01T08:02:46.000Z",
    User: {
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
    },
  },
  {
    id: 38,
    UserId: 5,
    description: "Ea quod repudiandae velit ut earum quibusdam accus",
    createdAt: "2020-10-01T08:02:46.000Z",
    updatedAt: "2020-10-01T08:02:46.000Z",
    User: {
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
    },
  },
  {
    id: 39,
    UserId: 5,
    description: "Voluptates explicabo sint suscipit. Repellendus au",
    createdAt: "2020-10-01T08:02:46.000Z",
    updatedAt: "2020-10-01T08:02:46.000Z",
    User: {
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
    },
  },
  {
    id: 40,
    UserId: 5,
    description: "Illo aut debitis est perferendis. Eius veritatis q",
    createdAt: "2020-10-01T08:02:46.000Z",
    updatedAt: "2020-10-01T08:02:46.000Z",
    User: {
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
    },
  },
  {
    id: 41,
    UserId: 6,
    description: "Voluptas odio vero omnis a enim voluptas alias. Qu",
    createdAt: "2020-10-01T08:02:46.000Z",
    updatedAt: "2020-10-01T08:02:46.000Z",
    User: {
      id: 6,
      email: "user5@example.com",
      password: "$2a$10$nEnsh73Oud6gE36AHq6fVug53Fz43N/ohIJiDq0tnc1WArpEC6oW6",
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
  },
  {
    id: 42,
    UserId: 6,
    description: "Velit voluptatibus id est doloremque. Blanditiis e",
    createdAt: "2020-10-01T08:02:46.000Z",
    updatedAt: "2020-10-01T08:02:46.000Z",
    User: {
      id: 6,
      email: "user5@example.com",
      password: "$2a$10$nEnsh73Oud6gE36AHq6fVug53Fz43N/ohIJiDq0tnc1WArpEC6oW6",
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
  },
  {
    id: 43,
    UserId: 6,
    description: "Assumenda quaerat et itaque reiciendis veritatis q",
    createdAt: "2020-10-01T08:02:46.000Z",
    updatedAt: "2020-10-01T08:02:46.000Z",
    User: {
      id: 6,
      email: "user5@example.com",
      password: "$2a$10$nEnsh73Oud6gE36AHq6fVug53Fz43N/ohIJiDq0tnc1WArpEC6oW6",
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
  },
  {
    id: 44,
    UserId: 6,
    description: "nobis",
    createdAt: "2020-10-01T08:02:46.000Z",
    updatedAt: "2020-10-01T08:02:46.000Z",
    User: {
      id: 6,
      email: "user5@example.com",
      password: "$2a$10$nEnsh73Oud6gE36AHq6fVug53Fz43N/ohIJiDq0tnc1WArpEC6oW6",
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
  },
  {
    id: 45,
    UserId: 6,
    description: "Eveniet voluptatum praesentium id neque magnam par",
    createdAt: "2020-10-01T08:02:46.000Z",
    updatedAt: "2020-10-01T08:02:46.000Z",
    User: {
      id: 6,
      email: "user5@example.com",
      password: "$2a$10$nEnsh73Oud6gE36AHq6fVug53Fz43N/ohIJiDq0tnc1WArpEC6oW6",
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
  },
  {
    id: 46,
    UserId: 6,
    description: "Repellat dolorem voluptates deserunt. Explicabo re",
    createdAt: "2020-10-01T08:02:46.000Z",
    updatedAt: "2020-10-01T08:02:46.000Z",
    User: {
      id: 6,
      email: "user5@example.com",
      password: "$2a$10$nEnsh73Oud6gE36AHq6fVug53Fz43N/ohIJiDq0tnc1WArpEC6oW6",
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
  },
  {
    id: 47,
    UserId: 6,
    description: "laborum",
    createdAt: "2020-10-01T08:02:46.000Z",
    updatedAt: "2020-10-01T08:02:46.000Z",
    User: {
      id: 6,
      email: "user5@example.com",
      password: "$2a$10$nEnsh73Oud6gE36AHq6fVug53Fz43N/ohIJiDq0tnc1WArpEC6oW6",
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
  },
  {
    id: 48,
    UserId: 6,
    description: "quae",
    createdAt: "2020-10-01T08:02:46.000Z",
    updatedAt: "2020-10-01T08:02:46.000Z",
    User: {
      id: 6,
      email: "user5@example.com",
      password: "$2a$10$nEnsh73Oud6gE36AHq6fVug53Fz43N/ohIJiDq0tnc1WArpEC6oW6",
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
  },
  {
    id: 49,
    UserId: 6,
    description: "Cumque iure qui. Placeat ex voluptatum. A aut dict",
    createdAt: "2020-10-01T08:02:46.000Z",
    updatedAt: "2020-10-01T08:02:46.000Z",
    User: {
      id: 6,
      email: "user5@example.com",
      password: "$2a$10$nEnsh73Oud6gE36AHq6fVug53Fz43N/ohIJiDq0tnc1WArpEC6oW6",
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
  },
  {
    id: 50,
    UserId: 6,
    description: "Molestias quaerat soluta totam dolorem placeat. Re",
    createdAt: "2020-10-01T08:02:46.000Z",
    updatedAt: "2020-10-01T08:02:46.000Z",
    User: {
      id: 6,
      email: "user5@example.com",
      password: "$2a$10$nEnsh73Oud6gE36AHq6fVug53Fz43N/ohIJiDq0tnc1WArpEC6oW6",
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
  },
];

export default {
  name: "home",
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
      pageMode: "main",
      tweets: [],
      description: "",
      tweet: "",
    };
  },
  created() {
    this.fetchCurrentUser();
    this.fetchUserTweets();
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
    fetchCurrentUser() {
      this.currentUser = {
        ...this.currentUser,
        ...dummyUser.currentUser,
      };
      this.isAuthenticated = dummyUser.isAuthenticated;
    },
    fetchUserTweets() {
      this.tweets = dummyTweets;
    },
    createTweet() {
      this.tweets.push({
        id: uuidv4(),
        userId: this.currentUser.id,
        createdAt: new Date(),
        description: this.description,
        User: {
          name: this.currentUser.name,
          account: this.currentUser.account,
          avatar: this.currentUser.avatar,
        },
      });
      this.description = "";
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
      this.closeCreateModal();
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