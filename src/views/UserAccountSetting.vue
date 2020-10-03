<template>
  <div class="container">
    <!-- sidebar -->
    <Sidebar @showCreateModal="showCreateModal" />
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
    />
  </div>
</template>


<script>
import Sidebar from "./../components/Sidebar";
import TweetCreateModal from "./../components/TweetCreateModal";

const dummyUser = {
  currentUser: {
    id: 1,
    name: "dummy",
    account: "@dummy",
    email: "123@hhhh.com",
    avatar:
      "https://s3.amazonaws.com/uifaces/faces/twitter/chrisvanderkooi/128.jpg",
  },
  isAuthenticated: true,
};
export default {
  components: {
    Sidebar,
    TweetCreateModal,
  },
  data() {
    return {
      createModal: false,
      currentUser: {
        id: -1,
        name: "",
        account: "",
        email: "",
        avatar: "",
      },
      isAuthenticated: false,
    };
  },
  created() {
    this.fetchCurrentUser();
  },
  methods: {
    showCreateModal() {
      this.createModal = true;
    },
    closeCreateModal() {
      this.createModal = false;
    },
    fetchCurrentUser() {
      const { id, name, account, email, avatar } = dummyUser.currentUser;
      this.currentUser = {
        id,
        name,
        account,
        email,
        avatar,
      };
      this.isAuthenticated = dummyUser.isAuthenticated;
    },
    handleSubmit(e) {
      console.log("s", e);
      const form = e.target;
      console.log("dd", form);
      const formData = new FormData(form);
      // for (let [name] of formData.entries()) {
      //   console.log(name);
      // }
      const a = formData.entries();
      console.log("d", a);
      for (let [name, value] of formData.entries()) {
        console.log(name + ": " + value);
      }
      // console.log("AA", formData);
      const data = JSON.stringify({
        account: this.currentUser.account,
        name: this.currentUser.name,
        email: this.currentUser.email,
        password: this.currentUser.password,
        checkPassword: this.currentUser.checkPassword,
      });
      console.log("data", data);
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

