<template>
  <div class="sidebar">
    <!-- <TweetCreateModal
      v-if="createModal"
      @after-click-close-create="closeCreateModal"
    /> -->
    <div class="sidebar-container">
      <img src="https://i.imgur.com/v5wdZG6.png" class="logo" alt="logo" />
      <div class="sidebar-list">
        <div class="sidebar-item selected">
          <a href="" class="sidebar-link sidebar-home">
            <img
              src="https://i.imgur.com/WnH29Ya.png"
              class="option"
              alt="home"
            />
            <span>首頁</span>
          </a>
        </div>
        <div class="sidebar-item">
          <a href="" class="sidebar-link sidebar-info">
            <img
              src="https://i.imgur.com/I8IlDOt.png"
              class="option"
              alt="user-info"
            />
            <span>個人資料</span>
          </a>
        </div>
        <div class="sidebar-item">
          <a href="" class="sidebar-link sidebar-option">
            <img
              src="https://i.imgur.com/64D9EP9.png"
              class="option"
              alt="option"
            />
            <span>設定</span>
          </a>
        </div>
        <button class="show-tweet-modal" @click="showCreateModal">推文</button>
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
</template>

<script>
export default {
  methods: {
    showCreateModal() {
      this.$emit("showCreateModal");
    },
  },
};
</script>

<style scoped>
/* sidebar */
.sidebar {
  width: 378px;
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
  height: 1196px;
  margin: 0 auto;
}

.sidebar-list {
  height: 100%;
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

.logout-item {
  margin-bottom: 25px;
}

.logout-link {
  display: flex;
}

span {
  font-size: 18px;
  font-weight: bold;
  line-height: 18px;
  margin: auto 0;
  margin-left: 20px;
}

.selected {
  color: #ff6000;
}
</style>