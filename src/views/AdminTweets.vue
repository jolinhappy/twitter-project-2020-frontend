<template>
  <div class="container">
    <Spinner v-if="isLoading" />
    <!-- sidebar -->
    <Sidebar
      :isAdmin="isAdmin"
      :admin-page="adminPage"
      :selected-page="selectedPage"
    />
    <div class="admin-tweets">
      <div class="admin-tweets-container">
        <div class="admin-tweets-title">
          <p>推文清單</p>
        </div>
        <!-- list -->
        <div class="user-tweet" v-for="tweet in adminTweets" :key="tweet.id">
          <div class="tweet-list-container">
            <div class="profile-image">
              <img
                :src="tweet.User.avatar | emptyImage"
                class="user-img"
                alt=""
              />
            </div>
            <div class="tweet">
              <router-link :to="{ name: 'tweet', params: { id: tweet.id } }">
                <div class="tweet-info">
                  <router-link
                    :to="{
                      name: 'user-profile',
                      params: { id: tweet.User.id },
                    }"
                    class="user-name-link"
                  >
                    <div class="user-name">{{ tweet.User.name }}</div>
                  </router-link>
                  <div class="user-account">@{{ tweet.User.account }}</div>
                  <div class="create-time">
                    ．{{ tweet.createdAt | fromNow }}
                  </div>
                </div>
              </router-link>
              <div class="tweet-content">
                {{ tweet.description }}
              </div>
            </div>
            <div class="delete-tweet">
              <div class="delete-container" @click="deleteTweet(tweet.id)">
                <img
                  src="https://i.imgur.com/puB9wJ7.png"
                  class="delete-icon"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import Sidebar from "./../components/Sidebar";
import { fromNowFilter } from "./../utils/mixins";
import { emptyImageFilter } from "./../utils/mixins";
import adminAPI from "./../apis/admin";
import { Toast } from "./../utils/helpers";
import Spinner from "./../components/Spinner";

export default {
  mixins: [fromNowFilter, emptyImageFilter],
  components: {
    Sidebar,
    Spinner,
  },
  data() {
    return {
      isAdmin: true,
      adminTweets: [],
      adminPage: true,
      selectedPage: "adminTweets",
      isLoading: false,
    };
  },
  created() {
    this.fetchAdminTweets();
  },
  methods: {
    async fetchAdminTweets() {
      try {
        this.isLoading = true;
        const { data } = await adminAPI.getTweets();
        this.adminTweets = data;
        this.isLoading = false;
      } catch (error) {
        console.log(error);
        Toast.fire({
          icon: "error",
          title: "無法讀取推文資料，請稍後再試",
        });
        this.isLoading = false;
      }
    },
    async deleteTweet(id) {
      try {
        const { data } = await adminAPI.deletTweet({ tweetId: id });
        if (data.status !== "success") {
          throw new Error(data.message);
        }
        this.adminTweets = this.adminTweets.filter((tweet) => tweet.id !== id);
        Toast.fire({
          icon: "success",
          title: "成功刪除推文",
        });
      } catch (error) {
        console.log(error);
        Toast.fire({
          icon: "error",
          title: "無法刪除推文，請稍後再試",
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
  flex-direction: row;
}
.admin-tweets {
  width: auto;
  height: 100%;
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

/* tweewts */

.user-tweet {
  width: auto;
  height: auto;
}
.tweet-list-container {
  width: auto;
  height: auto;
  border: 1px solid #e6ecf0;
  display: flex;
  padding-top: 10px;
}
.tweet-info {
  display: flex;
  flex-direction: row;
}
.user-name {
  font-size: 15px;
  font-weight: bold;
  margin-right: 10px;
}
.user-name-link:hover {
  text-decoration: underline;
}
.user-account,
.create-time {
  font-size: 15px;
  font-weight: 500;
  color: #657786;
}
.tweet {
  display: flex;
  flex-direction: column;
}
.tweet-content {
  width: 902px;
  height: auto;
  flex: 1;
  font-size: 15px;
  font-weight: 500;
  margin-bottom: 20px;
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
.delete-tweet {
  width: auto;
  flex: 1;
  margin-left: 90px;
  position: relative;
}
.delete-container:hover {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background: rgb(192, 192, 192, 0.3);
}
.delete-icon {
  width: 24px;
  height: 24px;
  position: absolute;
  top: 4.6px;
  left: 6px;
}
</style>