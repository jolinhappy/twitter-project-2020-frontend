<template>
  <div class="container">
    <!-- sidebar -->
    <Sidebar @showCreateModal="showCreateModal" :selectedPage="selectedPage" />
    <div class="account-setting">
      <div class="account-setting-container">
        <div class="setting-title">
          <p>帳號設定</p>
        </div>
        <div class="form-part">
          <form
            action=""
            class="login-form"
            @submit.stop.prevent="handleSubmit"
          >
            <div class="form-label-group">
              <label for="account" class="form-label">帳號</label>
              <input
                type="text"
                class="form-input"
                v-model="currentUser.account"
                required
              />
            </div>
            <div class="form-label-group">
              <label for="name" class="form-label">名稱</label>
              <input
                type="text"
                class="form-input"
                v-model="currentUser.name"
                required
              />
            </div>
            <div class="form-label-group">
              <label for="account" class="form-label">Email</label>
              <input
                type="email"
                class="form-input"
                v-model="currentUser.email"
                required
              />
            </div>
            <div class="form-label-group">
              <label for="password" class="form-label">密碼</label>
              <input
                type="text"
                class="form-input"
                v-model="currentUser.password"
                required
              />
            </div>
            <div class="form-label-group">
              <label for="password-check" class="form-label">密碼確認</label>
              <input type="text" class="form-input" required />
            </div>
            <button type="submit" class="btn login-btn">儲存</button>
          </form>
        </div>
      </div>
    </div>

    <TweetCreateModal
      v-if="createModal"
      @after-click-close-create="closeCreateModal"
      :initial-description="description"
      @afterSubmit="creatTweetFromModal"
    />
  </div>
</template>


<script>
import Sidebar from "./../components/Sidebar";
import TweetCreateModal from "./../components/TweetCreateModal";
// import { v4 as uuidv4 } from "uuid";
import tweetsAPI from "./../apis/tweets";
import { Toast } from "./../utils/helpers";
import { mapState } from "vuex";

export default {
  components: {
    Sidebar,
    TweetCreateModal,
  },
  computed: {
    ...mapState(["currentUser"]),
  },
  data() {
    return {
      createModal: false,
      selectedPage: "setting",
      description: "",
    };
  },
  methods: {
    showCreateModal() {
      this.createModal = true;
    },
    closeCreateModal() {
      this.createModal = false;
    },
    CreateFinish() {
      this.$router.push({ name: "tweets-home" });
    },
    handleSubmit() {
      const data = JSON.stringify({
        account: this.currentUser.account,
        name: this.currentUser.name,
        email: this.currentUser.email,
        password: this.currentUser.password,
        checkPassword: this.currentUser.checkPassword,
      });
      console.log("data", data);
    },
    async creatTweetFromModal(newDescription) {
      try {
        if (newDescription.length === 0) {
          Toast.fire({
            icon: "warning",
            title: "請輸入推文內容",
          });
          return;
        }
        if (newDescription.length > 140) {
          Toast.fire({
            icon: "warning",
            title: "推文字數限制140字以內，請減少輸入的字數",
          });
          return;
        }
        const { data } = await tweetsAPI.createTweet({
          description: newDescription,
        });
        if (data.status === "error") {
          throw new Error(data.message);
        }
        this.CreateFinish();
      } catch (error) {
        console.log(error);
        Toast.fire({
          icon: "error",
          title: "無法新增推文，請稍後再試看",
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
.account-setting {
  width: auto;
  height: 100%;
  flex: 1;
}

.setting-title {
  font-size: 18px;
  font-weight: 700;
  width: auto;
  height: 55px;
  border: 1px solid #e6ecf0;
}
.setting-title p {
  line-height: 55px;
  margin-left: 15px;
}

.form-part {
  height: 100%;
  flex: 1;
  border-left: 1px solid #e6ecf0;
  padding-top: 20px;
}
form {
  width: 540px;
  margin-left: 10px;
}
.form-label-group {
  width: 652px;
  position: relative;
  background-color: #f5f8fa;
  margin-bottom: 32px;
  border-radius: 4px;
}
.form-input {
  width: 642px;
  height: 50px;
  border-bottom: 2px solid #657786;
  border-top: 0px;
  border-left: 0px;
  border-right: 0px;
  margin-top: 20px;
  padding-left: 10px;
  background-color: transparent;
  font-size: 20px;
}
.form-label {
  width: 60px;
  height: 15px;
  font-size: 15px;
  color: #657786;
  position: absolute;
  top: 6%;
  left: 2%;
}
.btn {
  width: 122px;
  height: 50px;
  background-color: #ff6000;
  border-radius: 50px;
  color: #f5f8fa;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  margin-top: 10px;
  margin-left: 530px;
}

.btn:hover {
  background-color: #f75000;
}
</style>

