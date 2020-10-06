<template>
  <div class="users-list user-profile-link">
    <div
      class="users-list-container"
      v-for="follow in follows"
      :key="follow.id"
    >
      <router-link
        :to="{ name: 'user-profile', params: { id: follow.id } }"
        class="profile-image"
      >
        <img :src="follow.avatar | emptyImage" class="user-img" alt="" />
      </router-link>
      <div class="user">
        <div class="user-info">
          <div class="user-name">
            <router-link
              :to="{ name: 'user-profile', params: { id: follow.id } }"
              class="user-name-link"
            >
              <div class="name">{{ follow.name }}</div>
            </router-link>
            <div class="user-account">{{ follow.account }}</div>
          </div>
          <div class="follow-btn">
            <button
              type="button"
              class="followed"
              v-if="follow.isFollowed"
              @click="deleteFollow(follow.id)"
            >
              正在跟隨
            </button>
            <button
              type="button"
              class="follow"
              v-else
              @click="addFollow(follow.id)"
            >
              跟隨
            </button>
          </div>
        </div>
        <div class="user-description">
          {{ follow.introduction }}
        </div>
      </div>
    </div>
    <div class="no-data-container" v-if="initialFollowData.length === 0">
      <div class="no-data">沒有追蹤者或追蹤中的使用者...</div>
    </div>
  </div>
</template>

<script>
import { emptyImageFilter } from "./../utils/mixins";
export default {
  mixins: [emptyImageFilter],
  props: {
    initialFollowData: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      follows: this.initialFollowData,
    };
  },
  methods: {
    addFollow(id) {
      this.follows.map((follow) => {
        if (follow.id === id) {
          follow.isFollowed = true;
        }
        return follow;
      });
    },
    deleteFollow(id) {
      this.follows.map((follow) => {
        if (follow.id === id) {
          follow.isFollowed = false;
        }
        return follow;
      });
    },
  },
};
</script>

<style scoped>
.user-profile-link {
  width: 600px;
  height: auto;
}
.users-list-container {
  width: 600px;
  height: auto;
  border: 1px solid #e6ecf0;
  display: flex;
  padding: 10px 0;
}
.user-info {
  display: flex;
  justify-content: space-between;
}
.user-name {
  display: flex;
  flex-direction: column;
}
.name {
  font-size: 15px;
  font-weight: bold;
  margin-right: 10px;
}
.user-name-link:hover {
  text-decoration: underline;
}
.user-account {
  font-size: 15px;
  font-weight: 500;
  color: #657786;
}
.user {
  display: flex;
  flex-direction: column;
}
.user-description {
  width: 510px;
  height: auto;
  flex: 1;
  font-size: 15px;
  font-weight: 500;
  margin-top: 5px;
}
.profile-image {
  width: 70px;
  height: auto;
  display: flex;
  justify-content: center;
}
.user-img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
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
.followed:hover {
  border: 1px solid #ff6000;
  color: #ff6000;
  background-color: #ffffff;
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
.follow:hover {
  background-color: #ff6000;
  color: #f5f8fa;
}
.user-img:hover {
  transform: scale(1.1, 1.1);
}
.no-data-container {
  display: flex;
  justify-content: center;
}
.no-data {
  font-weight: 700;
  font-size: 20px;
  margin-top: 15px;
  margin-left: 15px;
}
</style>