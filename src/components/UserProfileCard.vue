<template>
  <div class="user-info">
    <div class="info-title">
      <button class="back-button" @click="$router.back()">
        <img src="https://i.imgur.com/aPVTDn2.png" class="back-img" alt="" />
      </button>
      <div class="title-content">
        <div class="name">{{ user.name }}</div>
        <div class="tweets-count">{{ tweets.length }}推文</div>
      </div>
    </div>
    <div class="profile-content">
      <div class="cover-part">
        <img
          :src="user.cover"
          class="cover-img"
          alt="cover"
          v-if="user.cover"
        />
      </div>
      <div class="user-img-part">
        <img
          :src="user.avatar | emptyImage"
          class="user-main-img"
          alt="user-img"
        />
      </div>
      <div class="detail-info-part">
        <div class="button-part">
          <template v-if="!isMyself">
            <button type="button" class="message-btn">
              <img
                src="https://i.imgur.com/DTgxxcI.png"
                class="message-icon"
                alt="message"
              />
            </button>
            <button type="button" class="notice-btn">
              <img
                src="https://i.imgur.com/JDdDdr0.png"
                class="notice-icon"
                alt="message"
              />
            </button>
            <button
              type="button"
              v-if="isFollowed"
              class="following"
              @click="deletFollow(user.id)"
            >
              正在跟隨
            </button>
            <button
              type="button"
              v-else
              class="follow"
              @click="addFollow(user.id)"
            >
              跟隨
            </button>
          </template>
          <template v-else>
            <button type="button" class="edit-info" @click="showEditModal">
              編輯個人資料
            </button>
          </template>
        </div>
        <div class="name-info">
          <div class="user-name">{{ user.name }}</div>
          <div class="user-account">@{{ user.account }}</div>
          <div class="introduction">{{ user.introduction }}</div>
        </div>
        <div class="follow-info">
          <router-link
            :to="{ name: 'user-followings', params: { id: user.id } }"
            class="followings-link"
            ><div class="followings">
              <span class="total-count">{{ followings.length }}個</span
              ><span class="category">追蹤中</span>
            </div></router-link
          >
          <router-link
            :to="{ name: 'user-followers', params: { id: user.id } }"
            class="followers-link"
            ><div class="followers">
              <span class="total-count">{{ followers.length }}位</span
              ><span class="category">追蹤者</span>
            </div></router-link
          >
        </div>
      </div>

      <!-- userNavTab -->
      <UserNavTab />
    </div>
  </div>
</template>

<script>
import UserNavTab from "./../components/UserNavTab";
import { emptyImageFilter } from "./../utils/mixins";
import usersAPI from "./../apis/users";
import { Toast } from "../utils/helpers";

export default {
  mixins: [emptyImageFilter],
  components: {
    UserNavTab,
  },
  props: {
    initialUser: {
      type: Object,
      required: true,
    },
    initialFollowings: {
      type: Array,
      required: true,
    },
    initialFollowers: {
      type: Array,
      required: true,
    },
    isMyself: {
      type: Boolean,
      required: true,
    },
    initialIsFollowed: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      tweets: [],
      followers: this.initialFollowers,
      followings: this.initialFollowings,
      isFollowed: this.initialIsFollowed,
      user: this.initialUser,
    };
  },
  watch: {
    initialFollowers(newValue) {
      this.followers = [...newValue];
    },
    initialFollowings(newValue) {
      this.followings = [...newValue];
    },
    initialUser(newValue) {
      this.user = {
        ...this.user,
        ...newValue,
      };
    },
    initialIsFollowed(newValue) {
      this.isFollowed = newValue;
    },
  },
  created() {
    const { id: userId } = this.$route.params;
    this.fetchUserTweets(userId);
  },
  methods: {
    showEditModal() {
      this.$emit("showEditModal");
    },
    async updateData(userId) {
      try {
        const { data } = await usersAPI.getUser({ userId });
        const { id, name, account, avatar, cover, introduction } = data;
        this.user = {
          ...this.user,
          id,
          name,
          account,
          avatar,
          cover,
          introduction,
        };
      } catch (error) {
        console.log(error);
        Toast.fire({
          icon: "error",
          title: "無法取得使用者資料，請稍後再試",
        });
      }
    },
    async fetchUserTweets(userId) {
      try {
        const { data } = await usersAPI.getUserTweets({ userId });
        this.tweets = data;
      } catch (error) {
        console.log(error);
      }
    },
    async addFollow(id) {
      try {
        const { data } = await usersAPI.addFollow({ id });
        if (data.status !== "success") {
          throw new Error(data.message);
        }
        Toast.fire({
          icon: "success",
          title: "跟隨成功",
        });
        this.isFollowed = true;
        this.followers.push({});
      } catch (error) {
        console.log(error);
        Toast.fire({
          icon: "error",
          title: "無法追蹤，請稍後再試",
        });
      }
    },
    async deletFollow(id) {
      try {
        const { data } = await usersAPI.deleteFollow({ followingId: id });
        if (data.status !== "success") {
          throw new Error(data.message);
        }
        Toast.fire({
          icon: "success",
          title: "成功取消跟隨",
        });
        this.isFollowed = false;
        this.followers.splice(0, 1);
      } catch (error) {
        console.log(error);
        Toast.fire({
          icon: "error",
          title: "無法取消追蹤，請稍後再試",
        });
      }
    },
  },
};
</script>

<style scoped>
.back-button {
  height: 55px;
}
.profile-content {
  width: 600px;
  border: 1px solid #e5e5e5;
  position: relative;
  z-index: 1;
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
  border: 1px solid #e6ecf0;
  display: flex;
}
.title-content {
  margin-left: 25px;
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
  width: 600px;
  height: 200px;
  display: flex;
  align-items: center;
  background: #999999;
}
.cover-img {
  width: 600px;
  height: 200px;
  object-fit: cover;
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
  bottom: 180px;
}
.user-main-img {
  width: 140px;
  height: 140px;
  object-fit: cover;
  border-radius: 50%;
  background: #999999;
}

.detail-info-part {
  width: 550px;
  height: 210px;
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

.follow {
  width: 62px;
  height: 40px;
  border-radius: 100px;
  border: 1px solid #ff6000;
  color: #ff6000;
  font-weight: bold;
  font-size: 15px;
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
.introduction {
  line-height: 20px;
  font-size: 14px;
  font-weight: normal;
  margin-top: 10px;
}

.follow-info {
  display: flex;
  font-size: 14px;
}
.total-count {
  font-weight: bold;
}
.category {
  font-weight: bold;
  color: #657786;
}
.followings {
  margin-right: 20px;
}
.followings:hover,
.followers:hover {
  text-decoration: underline;
}

.followed:hover {
  border: 1px solid #ff6000;
  color: #ff6000;
  background-color: #ffffff;
}
.edit-info:hover,
.follow:hover {
  background-color: #ff6000;
  color: #f5f8fa;
}
</style>