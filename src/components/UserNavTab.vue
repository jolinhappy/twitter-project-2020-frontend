<template>
  <ul class="tweets-nav-tab">
    <template v-if="!isFollowPage">
      <li class="tab-item">
        <router-link to="/users/:id" class="tab-link user-tweets"
          >推文</router-link
        >
      </li>
      <li class="tab-item">
        <router-link to="/users/:id/replies" class="tab-link user-replies"
          >推文與回覆</router-link
        >
      </li>
      <li class="tab-item">
        <router-link to="/users/:id/likes" class="tab-link user-likes"
          >喜歡的內容</router-link
        >
      </li>
    </template>
    <template v-else>
      <li class="tab-item">
        <router-link to="/users/:id/followers" class="tab-link user-followers"
          >追隨者</router-link
        >
      </li>
      <li class="tab-item">
        <router-link to="/users/:id/followings" class="tab-link user-followings"
          >正在追蹤</router-link
        >
      </li>
    </template>
  </ul>
</template>


<script>
export default {
  props: {
    isFollowPage: {
      type: Boolean,
      require: true,
    },
  },
};
</script>



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

a {
  width: 130px;
  height: 40px;
  display: flex;
  position: relative;
  border-bottom: 2px solid white;
}
.tab-link {
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

.tab-item a:hover {
  border-color: #ff6600;
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
  border-color: #ff6600;
}
</style>