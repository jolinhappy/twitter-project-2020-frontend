<template>
  <ul class="tweets-nav-tab">
    <li class="tab-item">
      <router-link to="/tweets/:id" class="tab-link user-tweets"
        >推文</router-link
      >
    </li>
    <li class="tab-item">
      <router-link to="/tweets/:id/replies" class="tab-link user-replies"
        >推文與回覆</router-link
      >
    </li>
    <li class="tab-item">
      <router-link to="/tweets/:id/likes" class="tab-link user-likes"
        >喜歡的內容</router-link
      >
    </li>
  </ul>
</template>

<style scoped>
.tweets-nav-tab {
  display: flex;
}
.tab-link {
  width: 130px;
  height: 40px;
  display: flex;
  justify-content: center;
}

.tab-item {
  width: 130px;
  height: 40px;
  display: flex;
  position: relative;
}
.user-tweets,
.user-replies,
.user-likes {
  line-height: 40px;
  margin: 0 auto;
  font-size: 15px;
  font-weight: 500;
  color: #657786;
}
.tab-item::after {
  content: "";
  position: absolute;
  top: 100%;
}
.tab-item:hover::after {
  width: 130px;
  height: 2px;
  background-color: #ff6600;
}
.tab-item:active::after {
  width: 130px;
  height: 2px;
  background-color: #ff6600;
}
.tab-item:hover {
  background-color: #ffcbb3;
}
.tab-item:hover a {
  color: #ff6600;
  font-weight: bold;
}
.active {
  color: #ff6600;
  font-weight: bold;
}
</style>