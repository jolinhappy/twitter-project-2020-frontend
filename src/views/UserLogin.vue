<template>
  <div class="container">
    <img src="https://i.imgur.com/v5wdZG6.png" alt="logo" class="logo" />
    <h2>登入 Alphitter</h2>
    <UserLoginForm
      :initialAccount="account"
      :initialPassword="password"
      :isProcessing="isProcessing"
      @afterSubmit="submitLogin"
    />
    <div class="regist-link">
      <p>
        <router-link to="/regist">註冊Alphitter</router-link>．
        <router-link to="/admin/login">後台登入</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import UserLoginForm from "./../components/UserLoginForm";
import authorizationAPI from "./../apis/authorization";
import { Toast } from "./../utils/helpers";
export default {
  name: "UserLogin",
  components: {
    UserLoginForm,
  },
  data() {
    return {
      account: "",
      password: "",
      isProcessing: false,
    };
  },
  methods: {
    async submitLogin(data) {
      const { account, password } = data;
      try {
        this.isProcessing = true;
        if (!account || !password) {
          Toast.fire({
            icon: "warning",
            title: "請填入帳號和密碼",
          });
          return;
        }
        const { data } = await authorizationAPI.login({
          account,
          password,
        });
        if (data.status === "error") {
          Toast.fire({
            icon: "error",
            title: "請確認帳號密碼是否正確",
          });
          throw new Error(data.message);
        }
        localStorage.setItem("token", data.token);
        this.$router.push("/tweets");
      } catch (error) {
        console.log(error);
        Toast.fire({
          icon: "error",
          title: "請確認是否輸入正確的帳號及密碼",
        });
        this.isProcessing = false;
      }
    },
  },
};
</script>

<style scoped>
.container {
  width: 50%;
  height: 100%;
  margin: 5% auto;
}
img {
  margin: 0 auto;
  margin-bottom: 30px;
  width: 50px;
  height: 50px;
}
h2 {
  text-align: center;
  font-size: 23px;
  font-weight: bold;
  margin-bottom: 20px;
}
.regist-link {
  width: 540px;
  margin: 0 auto;
  text-align: right;
  color: #0099ff;
  font-weight: bold;
  font-size: 18px;
  margin-top: 40px;
}
a {
  text-decoration: underline;
}
a:hover {
  color: blue;
}
</style>
