<template>
  <div class="sidebar">
    <div class="sidebar-container">
      <router-link to="/">
        <img src="https://i.imgur.com/v5wdZG6.png" class="logo" alt="logo" />
      </router-link>
      <div class="sidebar-options">
        <div class="sidebar-list">
          <template v-if="!adminPage">
            <div class="sidebar-item">
              <router-link to="/tweets" class="sidebar-link sidebar-home">
                <img
                  src="https://i.imgur.com/WnH29Ya.png"
                  class="option"
                  alt="home"
                  v-if="selectedPage === 'home'"
                />
                <img
                  src="https://i.imgur.com/pXjwuqG.png"
                  class="option"
                  alt="home-unselectd"
                  v-else
                />

                <span>首頁</span>
              </router-link>
            </div>
            <div class="sidebar-item">
              <router-link to="#" class="sidebar-link sidebar-info">
                <font-awesome-icon icon="bell" class="option" />
                <span>通知</span>
              </router-link>
            </div>
            <div class="sidebar-item">
              <router-link
                to="/users/chatting"
                class="sidebar-link sidebar-info"
              >
                <font-awesome-icon icon="envelope" class="option" />
                <span>公開聊天室</span>
              </router-link>
            </div>
            <div class="sidebar-item">
              <router-link to="#" class="sidebar-link sidebar-info">
                <font-awesome-icon icon="envelope" class="option" />
                <span>私人訊息</span>
              </router-link>
            </div>
            <div class="sidebar-item">
              <router-link
                :to="{ name: 'user-profile', params: { id: currentUser.id } }"
                class="sidebar-link sidebar-info"
              >
                <img
                  src="https://i.imgur.com/tS096bA.png"
                  class="option"
                  alt="user-info"
                  v-if="
                    selectedPage === 'profile' &&
                    $route.params.id === currentUser.id
                  "
                />
                <img
                  src="https://i.imgur.com/I8IlDOt.png"
                  class="option"
                  alt="user-info-unselected"
                  v-else
                />
                <span>個人資料</span>
              </router-link>
            </div>
            <div class="sidebar-item">
              <router-link to="/setting" class="sidebar-link sidebar-option">
                <img
                  src="https://i.imgur.com/wHeyts0.png"
                  class="option"
                  alt="option"
                  v-if="selectedPage === 'setting'"
                />
                <img
                  src="https://i.imgur.com/64D9EP9.png"
                  class="option"
                  alt="option-unseleted"
                  v-else
                />
                <span>設定</span>
              </router-link>
            </div>
          </template>
          <template v-else>
            <div class="sidebar-item">
              <router-link
                to="/admin/tweets"
                class="sidebar-link sidebar-admin-tweet"
              >
                <img
                  src="https://i.imgur.com/WnH29Ya.png"
                  class="option"
                  alt="tweets"
                  v-if="selectedPage === 'adminTweets'"
                />
                <img
                  src="https://i.imgur.com/pXjwuqG.png"
                  class="option"
                  alt="tweets-unselectd"
                  v-else
                />
                <span>推文清單</span>
              </router-link>
            </div>
            <div class="sidebar-item">
              <router-link
                to="/admin/users"
                class="sidebar-link sidebar-admin-user"
              >
                <img
                  src="https://i.imgur.com/tS096bA.png"
                  class="option"
                  alt="users"
                  v-if="selectedPage === 'adminUsers'"
                />
                <img
                  src="https://i.imgur.com/I8IlDOt.png"
                  class="option"
                  alt="users-unselected"
                  v-else
                />
                <span>使用者列表</span>
              </router-link>
            </div>
          </template>
          <button
            class="show-tweet-modal"
            @click="showCreateModal"
            v-if="!adminPage"
          >
            推文
          </button>
        </div>
        <div class="logout-item">
          <div class="logout-button" @click="logout">
            <img
              src="https://i.imgur.com/uxgzcrv.png"
              class="option"
              alt="logout"
            />
            <span>登出</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  props: {
    adminPage: {
      type: Boolean,
      require: true,
    },
    selectedPage: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapState(["currentUser", "isAuthenticated"]),
  },
  methods: {
    showCreateModal() {
      this.$emit("showCreateModal");
    },
    logout() {
      this.$store.commit("revokeAuthentication");
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
/* sidebar */
.sidebar {
  width: 450px;
  height: 100%;
}
.logo {
  width: 30px;
  height: 30px;
  margin-top: 10px;
  margin-bottom: 30px;
}
.option {
  width: 24px;
  height: 24px;
  display: inline;
  margin: auto 0;
}
.sidebar-container {
  width: 235px;
  margin: 0 auto;
  padding-left: 50px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
.sidebar-options {
  width: auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  flex: 1;
}
.sidebar-list {
  flex: 1;
}
.sidebar-item {
  width: 214px;
  height: 60px;
}
.sidebar-link {
  height: 100%;
  display: flex;
  align-items: center;
}
.show-tweet-modal {
  width: 210px;
  height: 45px;
  background-color: #ff6000;
  border-radius: 50px;
  color: #f5f8fa;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  margin-top: 10px;
  flex: 1;
}
.show-tweet-modal:hover {
  background-color: #f75000;
}
.logout-button {
  display: flex;
  margin-bottom: 15px;
  cursor: pointer;
}
.logout-button:hover {
  color: #657786;
}
span {
  font-size: 18px;
  font-weight: bold;
  line-height: 18px;
  margin: auto 0;
  margin-left: 20px;
}
.active {
  color: #ff6000;
}
</style>