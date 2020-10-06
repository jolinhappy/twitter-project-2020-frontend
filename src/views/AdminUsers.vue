<template>
  <div class="container">
    <!-- sidebar -->
    <Sidebar
      :isAdmin="isAdmin"
      :admin-page="adminPage"
      :selected-page="selectedPage"
    />
    <div class="admin-users">
      <div class="admin-tweets-container">
        <div class="admin-tweets-title">
          <p>使用者列表</p>
        </div>
        <!-- list-card -->
        <div class="user-cards-container">
          <router-link
            :to="{ name: 'user-profile', params: { id: user.id } }"
            class="user-profile-link"
            v-for="user in adminUsers"
            :key="user.id"
          >
            <div class="user-profile-card">
              <div class="cover-part">
                <img :src="user.cover" class="cover-img" alt="cover" />
              </div>
              <div class="user-img-part">
                <img
                  :src="user.avatar | emptyImage"
                  class="user-main-img"
                  alt="user-img"
                />
              </div>
              <div class="detail-info-part">
                <div class="user-name">{{ user.name }}</div>
                <div class="user-account">{{ user.account }}</div>
                <div class="user-action">
                  <div class="user-reply" @click="showReplyModal">
                    <img
                      src="https://i.imgur.com/SaR8cz3.png"
                      class="reply"
                      alt="reply"
                    />
                    <span class="reply-count">{{ user.Replies.length }}</span>
                  </div>
                  <div class="user-like">
                    <img
                      src="https://i.imgur.com/qs9Pe3N.png"
                      class="like"
                      alt="like"
                    />
                    <span class="like-count">{{ user.Likes.length }}</span>
                  </div>
                </div>
                <div class="follow-info">
                  <router-link
                    to="/users/:id/followings"
                    class="followings-link"
                    ><div class="followings">
                      <strong>{{ user.Followings.length }}個</strong>追蹤中
                    </div></router-link
                  >
                  <router-link to="/users/:id/followers" class="followers-link"
                    ><div class="followers">
                      <strong>{{ user.Followers.length }}位</strong>追蹤者
                    </div></router-link
                  >
                </div>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import Sidebar from "./../components/Sidebar";
import { emptyImageFilter } from "./../utils/mixins";
import adminAPI from "./../apis/admin";
import { Toast } from "./../utils/helpers";

export default {
  mixins: [emptyImageFilter],
  components: {
    Sidebar,
  },
  data() {
    return {
      isAdmin: true,
      adminUsers: [],
      adminPage: true,
      selectedPage: "adminUsers",
    };
  },
  created() {
    this.fetchAdminUsers();
  },
  methods: {
    async fetchAdminUsers() {
      try {
        const { data } = await adminAPI.getUsers();
        console.log(data);
        this.adminUsers = data;
      } catch (error) {
        console.log(error);
        Toast.fire({
          icon: "error",
          title: "無法讀取使用者資料，請稍後再試",
        });
      }
    },
  },
};
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  display: flex;
  flex: 1;
  flex-direction: row;
}
.admin-users {
  width: auto;
  height: auto;
  flex: 1;
  border-left: 1px solid #e6ecf0;
}

.admin-tweets-title {
  font-size: 18px;
  font-weight: 700;
  width: auto;
  height: 55px;
  border: 1px solid #e6ecf0;
}
.admin-tweets-title p {
  line-height: 55px;
  margin-left: 15px;
}

.user-cards-container {
  width: auto;
  height: auto;
  margin: 10px 10px;
  display: flex;
  flex-wrap: wrap;
}
.user-profile-link {
  width: 245px;
  height: 314px;
  margin-right: 10px;
  margin-top: 10px;
}
.user-profile-card {
  width: 245px;
  height: 314px;
  border-radius: 10%;
  position: relative;
  background: #f6f7f8;
}
.cover-part,
.cover-img {
  width: 245px;
  height: 140px;
}
.cover-img {
  object-fit: cover;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.user-img-part {
  background: #ffffff;
  width: 110px;
  height: 110px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  position: absolute;
  left: 67px;
  top: 70px;
}
.user-main-img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 50%;
}

.reply,
.like {
  width: 19.75px;
  height: 19.75px;
}

.detail-info-part {
  display: flex;
  flex-direction: column;
  margin-top: 45px;
  align-items: center;
}

.user-reply,
.user-like,
.follow-info {
  display: flex;
}
.user-action {
  display: flex;
  justify-content: space-around;
  width: 120px;
  margin: 10px 0;
}
.like-count,
.reply-count {
  color: #1c1c1c;
  font-weight: 500;
  font-size: 15px;
  margin: 0 5px;
}
.user-name {
  font-size: 15px;
  font-weight: 900;
}
.user-account {
  font-size: 15px;
  font-weight: 500;
  color: #657786;
}
.followings,
.followers {
  font-size: 15px;
  margin: 0 5px;
}
</style>