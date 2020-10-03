<template>
  <div class="follow-top-container">
    <div class="follow-top-title">
      <p>跟隨誰</p>
    </div>
    <div class="follow-top-user" v-for="user in topUsers" :key="user.key">
      <div class="profile-image top-user-image">
        <img :src="user.avatar" class="user-img top-user" alt="" />
      </div>
      <div class="top-user-info">
        <a href="#" class="user-name-link">
          <div class="user-name">{{ user.name }}</div>
        </a>
        <div class="user-account">{{ user.account }}</div>
      </div>
      <div class="follow-btn">
        <button
          type="button"
          class="followed"
          v-if="user.isFollowed"
          @click="deleteFollow(user.id)"
        >
          正在跟隨
        </button>
        <button type="button" class="follow" v-else @click="addFollow(user.id)">
          跟隨
        </button>
      </div>
    </div>

    <div class="more">
      <a href="#" class="readMore">顯示更多</a>
    </div>
  </div>
</template>

<script>
const dummyTopUsers = [
  {
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
        password:
          "$2a$10$midINOLdLpE6CpDpdmu7kuy2zGOg7uEgCUZmjwdNwgzihxqEwou6O",
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
        password:
          "$2a$10$3zsfWwpQrzLjWNEGWt..2OtsMuR84soXOY7ZawiNQzWL9HvUYaGlq",
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
    isFollowed: true,
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
    Followers: [
      {
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
        Followship: {
          followerId: 2,
          followingId: 4,
          createdAt: "2020-09-30T12:56:39.000Z",
          updatedAt: "2020-09-30T12:56:39.000Z",
        },
      },
      {
        id: 5,
        email: "user4@example.com",
        password:
          "$2a$10$3zsfWwpQrzLjWNEGWt..2OtsMuR84soXOY7ZawiNQzWL9HvUYaGlq",
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
          followingId: 4,
          createdAt: "2020-09-30T12:56:39.000Z",
          updatedAt: "2020-09-30T12:56:39.000Z",
        },
      },
    ],
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
    Followers: [
      {
        id: 3,
        email: "user2@example.com",
        password:
          "$2a$10$midINOLdLpE6CpDpdmu7kuy2zGOg7uEgCUZmjwdNwgzihxqEwou6O",
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
          followingId: 5,
          createdAt: "2020-09-30T12:56:39.000Z",
          updatedAt: "2020-09-30T12:56:39.000Z",
        },
      },
      {
        id: 4,
        email: "user3@example.com",
        password:
          "$2a$10$Iw6Dxi0uwEhtv80niOrmbO0TDy02HsfobmxiqnhSJOE/9Ywd0VoAK",
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
          followerId: 4,
          followingId: 5,
          createdAt: "2020-09-30T12:56:39.000Z",
          updatedAt: "2020-09-30T12:56:39.000Z",
        },
      },
    ],
    isFollowed: false,
  },
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
    Followers: [
      {
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
        Followship: {
          followerId: 2,
          followingId: 3,
          createdAt: "2020-09-30T12:56:39.000Z",
          updatedAt: "2020-09-30T12:56:39.000Z",
        },
      },
    ],
    isFollowed: false,
  },
  {
    id: 1,
    email: "root@example.com",
    password: "$2a$10$7ZyFXDomHySoaTos5kGHIeeQz7xEgqnGZDeaotWdeb5WFbJJD5opW",
    name: "root",
    avatar:
      "https://s3.amazonaws.com/uifaces/faces/twitter/sgaurav_baghel/128.jpg",
    introduction: "I am root.",
    role: "admin",
    account: "@root",
    cover: "http://lorempixel.com/640/480/animals",
    createdAt: "2020-10-01T08:02:44.000Z",
    updatedAt: "2020-10-01T08:02:44.000Z",
    Followers: [],
    isFollowed: false,
  },
  {
    id: 6,
    email: "user5@example.com",
    password: "$2a$10$nEnsh73Oud6gE36AHq6fVug53Fz43N/ohIJiDq0tnc1WArpEC6oW6",
    name: "user5",
    avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/hanna_smi/128.jpg",
    introduction: "I am user5",
    role: "user",
    account: "@user5",
    cover: "http://lorempixel.com/640/480/fashion",
    createdAt: "2020-10-01T08:02:46.000Z",
    updatedAt: "2020-10-01T08:02:46.000Z",
    Followers: [],
    isFollowed: true,
  },
];
export default {
  data() {
    return {
      topUsers: [],
    };
  },
  created() {
    this.fetchTopUsers();
  },
  methods: {
    fetchTopUsers() {
      this.topUsers = dummyTopUsers;
    },
    addFollow(id) {
      this.topUsers.map((topUser) => {
        if (topUser.id === id) {
          topUser.isFollowed = true;
        }
        return topUser;
      });
    },
    deleteFollow(id) {
      this.topUsers.map((topUser) => {
        if (topUser.id === id) {
          topUser.isFollowed = false;
        }
        return topUser;
      });
    },
  },
};
</script>>

<style scoped>
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
.follow-top-user:hover {
  background: #e6ece2;
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
  height: 30px;
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
}

.profile-image {
  width: 70px;
}
.user-img {
  width: 50px;
  height: 50px;
  margin-left: 15px;
  border-radius: 50%;
}
.followed:hover {
  border: 1px solid #ff6000;
  color: #ff6000;
  background-color: #ffffff;
}
.follow:hover {
  background-color: #ff6000;
  color: #f5f8fa;
}
.user-name {
  font-size: 15px;
  font-weight: bold;
  color: #1c1c1c;
}
.user-account {
  font-size: 15px;
  font-weight: bold;
  color: #657786;
}
</style>