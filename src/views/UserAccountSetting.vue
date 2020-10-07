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
                name="account"
                v-model="account"
                required
              />
            </div>
            <div class="form-label-group">
              <label for="name" class="form-label">名稱</label>
              <input
                type="text"
                class="form-input"
                name="name"
                v-model="name"
                required
              />
            </div>
            <div class="form-label-group">
              <label for="account" class="form-label">Email</label>
              <input
                type="email"
                class="form-input"
                name="email"
                v-model="email"
                required
              />
            </div>
            <div class="form-label-group">
              <label for="password" class="form-label">密碼</label>
              <input
                type="password"
                class="form-input"
                name="password"
                v-model="password"
              />
            </div>
            <div class="form-label-group">
              <label for="password-check" class="form-label">密碼確認</label>
              <input
                type="password"
                class="form-input"
                name="checkPassword"
                v-model="checkPassword"
              />
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
import tweetsAPI from "./../apis/tweets";
import userAPI from "./../apis/users";
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
      id: "",
      account: "",
      name: "",
      email: "",
      password: "",
      checkPassword: "",
    };
  },
  created() {
    this.fetchUserData();
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
    fetchUserData() {
      this.id = this.currentUser.id;
      this.account = this.currentUser.account;
      this.name = this.currentUser.name;
      this.email = this.currentUser.email;
    },
    async handleSubmit() {
      try {
        if (!this.account || !this.name || !this.email) {
          Toast.fire({
            icon: "warning",
            title: "您有漏填的欄位喔！",
          });
          return;
        }
        if (this.password !== this.checkPassword) {
          Toast.fire({
            icon: "warning",
            title: "密碼與確認密碼不符",
          });
          return;
        }
        // const form = e.target;
        // const formData = new FormData(form);
        const userId = this.id;
        // for (let [name, value] of formData.entries()) {
        //   console.log(name + ": " + value);
        const formData = {
          account: this.account,
          name: this.name,
          email: this.email,
          password: this.password,
          checkPassword: this.checkPassword,
        };
        const { data } = await userAPI.updateInfo({ userId, formData });
        console.log(data);
      } catch (error) {
        console.log(error);
        Toast.fire({
          icon: "error",
          title: "無法儲存資料，請稍後再試",
        });
      }
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

