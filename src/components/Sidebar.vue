<template>
  <div class="sidebar">
    <div class="sidebar-container">
      <router-link to="/">
        <img src="https://i.imgur.com/v5wdZG6.png" class="logo" alt="logo" />
      </router-link>
      <div class="sidebar-options">
        <div class="sidebar-list">
          <template v-if="!currentUser.isAdmin">
            <div class="sidebar-item">
              <router-link to="/tweets" class="sidebar-link sidebar-home">
                <img
                  src="https://i.imgur.com/WnH29Ya.png"
                  class="option"
                  alt="home"
                />
                <span>首頁</span>
              </router-link>
            </div>
            <div class="sidebar-item">
              <router-link
                :to="{ name: 'user-profile', params: { id: currentUser.id } }"
                class="sidebar-link sidebar-info"
              >
                <img
                  src="https://i.imgur.com/I8IlDOt.png"
                  class="option"
                  alt="user-info"
                />
                <span>個人資料</span>
              </router-link>
            </div>
            <div class="sidebar-item">
              <router-link to="/setting" class="sidebar-link sidebar-option">
                <img
                  src="https://i.imgur.com/64D9EP9.png"
                  class="option"
                  alt="option"
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
                  alt="home"
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
                  src="https://i.imgur.com/I8IlDOt.png"
                  class="option"
                  alt="user-info"
                />
                <span>使用者列表</span>
              </router-link>
            </div>
          </template>
          <button
            class="show-tweet-modal"
            @click="showCreateModal"
            v-if="!isAdmin"
          >
            推文
          </button>
        </div>
        <div class="logout-item">
          <router-link to="/login" class="logout-link">
            <img
              src="https://i.imgur.com/uxgzcrv.png"
              class="option"
              alt="logout"
            />
            <span>登出</span>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const dummyUser = {
  currentUser: {
    id: 1,
    name: "dummy",
    email: "123@hhhh.com",
    avatar:
      "https://s3.amazonaws.com/uifaces/faces/twitter/chrisvanderkooi/128.jpg",
  },
  isAuthenticated: true,
};
export default {
  props: {
    isAdmin: {
      type: Boolean,
      require: true,
    },
  },
  data() {
    return {
      currentUser: {
        id: -1,
        name: " ",
        email: "",
        avatar: "",
      },
      isAuthenticated: false,
    };
  },
  created() {
    this.fetchUser();
  },
  methods: {
    fetchUser() {
      this.currentUser = {
        ...this.currentUser,
        ...dummyUser.currentUser,
      };
      this.isAuthenticated = dummyUser.isAuthenticated;
    },
    showCreateModal() {
      this.$emit("showCreateModal");
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
  height: 100%;
  margin: 0 auto;
  padding-left: 50px;
}
.sidebar-options {
  width: auto;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.sidebar-list {
  height: auto;
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

.logout-link {
  display: flex;
  margin-bottom: 15px;
}
.logout-link:hover {
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