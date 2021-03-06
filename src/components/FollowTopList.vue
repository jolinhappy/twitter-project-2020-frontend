<template>
  <div class="follow-top-container">
    <div class="follow-top-title">
      <p>跟隨誰</p>
    </div>
    <div class="follow-users-container">
      <div class="follow-top-user" v-for="user in topUsers" :key="user.key">
        <router-link
          :to="{ name: 'user-profile', params: { id: user.id } }"
          class="user-avatar-link"
        >
          <div class="profile-image top-user-image">
            <img
              :src="user.avatar | emptyImage"
              class="user-img top-user"
              alt=""
            />
          </div>
        </router-link>
        <div class="top-user-info">
          <router-link
            :to="{ name: 'user-profile', params: { id: user.id } }"
            class="user-name-link"
          >
            <div class="user-name">{{ user.name }}</div>
          </router-link>
          <div class="user-account">@{{ user.account }}</div>
        </div>
        <div class="follow-btn">
          <button
            type="button"
            class="followed"
            :name="user.id"
            v-if="user.isFollowed"
            @click="deleteFollow(user.id)"
          >
            正在跟隨
          </button>
          <button
            type="button"
            class="follow"
            name="id"
            v-else
            @click="addFollow(user.id)"
          >
            跟隨
          </button>
        </div>
      </div>
    </div>
    <div class="more">
      <a href="#" class="readMore">顯示更多</a>
    </div>
  </div>
</template>

<script>
import usersAPI from "./../apis/users";
import { Toast } from "./../utils/helpers";
import { emptyImageFilter } from "./../utils/mixins";

export default {
  mixins: [emptyImageFilter],
  props: {
    initialIsFollowed: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      topUsers: [],
      isFollowed: this.initialIsFollowed,
    };
  },
  watch: {
    initialIsFollowed(newValue) {
      this.isFollowed = newValue;
    },
  },
  created() {
    this.fetchTopUsers();
  },
  methods: {
    async fetchTopUsers() {
      try {
        const { data } = await usersAPI.getTopUsers();
        this.topUsers = data;
      } catch (error) {
        console.log(error);
        Toast.fire({
          icon: "error",
          title: "無法取得人氣使用者名單",
        });
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
        this.topUsers.map((topUser) => {
          if (topUser.id === id) {
            topUser.isFollowed = true;
            this.isFollowed = true;
          }
          return topUser;
        });
      } catch (error) {
        console.log(error);
        Toast.fire({
          icon: "error",
          title: "無法追蹤，請稍後再試",
        });
      }
    },
    async deleteFollow(id) {
      try {
        const { data } = await usersAPI.deleteFollow({ followingId: id });
        if (data.status !== "success") {
          throw new Error(data.message);
        }
        Toast.fire({
          icon: "success",
          title: "成功取消跟隨",
        });
        this.topUsers.map((topUser) => {
          if (topUser.id === id) {
            topUser.isFollowed = false;
            this.isFollowed = false;
          }
          return topUser;
        });
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
</script>>

<style scoped>
.follow-top-container {
  width: 350px;
  height: 437px;
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
.follow-users-container {
  width: 350px;
  height: 350px;
  overflow: hidden;
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
  border-top: 1px solid #e6ecf0;
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
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.user-account {
  font-size: 15px;
  font-weight: bold;
  color: #657786;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.user-img:hover {
  transform: scale(1.1, 1.1);
}
</style>