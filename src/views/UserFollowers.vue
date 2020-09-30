<template>
  <div class="container">
    <!-- sidebar -->
    <Sidebar @showCreateModal="showCreateModal" />
    <div class="main-follow-info">
      <div class="info-title">
        <a href="#" class="back-button"
          ><img src="https://i.imgur.com/aPVTDn2.png" class="back-img" alt="" />
        </a>
        <div class="title-content">
          <div class="name">Jolin</div>
          <div class="tweets-count">25推文</div>
        </div>
      </div>
      <div class="follow-tab">
        <UserNavTab :isFollowPage="isFollowPage" />
      </div>
      <!-- USER -->
      <FollowUsersList />
    </div>
    <div class="follow-top">
      <FollowTopList />
    </div>
    <TweetCreateModal
      v-if="createModal"
      @after-click-close-create="closeCreateModal"
    />
  </div>
</template>


<script>
import Sidebar from "./../components/Sidebar";
import FollowUsersList from "./../components/FollowUsersList";
import FollowTopList from "./../components/FollowTopList";
import TweetCreateModal from "./../components/TweetCreateModal";
import UserNavTab from "./../components/UserNavTab";

export default {
  components: {
    Sidebar,
    FollowUsersList,
    FollowTopList,
    TweetCreateModal,
    UserNavTab,
  },
  data() {
    return {
      createModal: false,
      replyModal: false,
      isFollowPage: true,
    };
  },
  methods: {
    showCreateModal() {
      this.createModal = true;
    },
    closeCreateModal() {
      this.createModal = false;
    },
  },
};
</script>
<style scoped>
.container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
}

.main-follow-info {
  width: 600px;
  height: 100%;
  border-left: 1px solid #e6ecf0;
  border-right: 1px solid #e6ecf0;
}
.back-img {
  width: 24px;
  height: 24px;
  display: inline;
  margin: auto 15px;
  margin-top: 15px;
}
.info-title {
  font-size: 18px;
  font-weight: 700;
  width: 600px;
  height: 55px;
  border-left: 1px solid #e6ecf0;
  border-right: 1px solid #e6ecf0;
  display: flex;
}
.title-content {
  margin-left: 25px;
  padding: auto 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.tweets-count {
  font-size: 13px;
  font-weight: 500;
  color: #657786;
}
.follow-tab {
  margin-top: 14px;
}
</style>