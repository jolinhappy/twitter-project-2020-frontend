<template>
  <div class="container">
    <img src="https://i.imgur.com/v5wdZG6.png" alt="logo" class="logo" />
    <h2>後台登入</h2>
    <UserLoginForm
      :initialAccount="account"
      :initialPassword="password"
      @afterSubmit="submitLogin"
      :is-processing="isProcessing"
    />
    <div class="regist-link">
      <p>
        <router-link to="/login">前台登入</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import UserLoginForm from "./../components/UserLoginForm";
import authorizationAPI from "./../apis/authorization";
import { Toast } from "./../utils/helpers";
export default {
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
        const response = await authorizationAPI.adminLogin({
          account,
          password,
        });
        const { data } = response;
        if (data.status === "error") {
          throw new Error(data.message);
        }
        localStorage.setItem("token", data.token);
        this.$router.push("/admin/tweets");
      } catch (error) {
        console.log(error);
        Toast.fire({
          icon: "error",
          title: "請確認帳號密碼是否正確",
        });
        this.isProcessing = false;
      }
    },
    // submitLogin(data) {
    //   console.log("data", data);
    // },
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
form {
  width: 540px;
  margin: 0 auto;
}
.form-label-group {
  width: 540px;
  position: relative;
  background-color: #f5f8fa;
  margin-bottom: 20px;
  border-radius: 4px;
}
.form-input {
  width: 530px;
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
  width: 540px;
  height: 50px;
  background-color: #ff6000;
  border-radius: 50px;
  color: #f5f8fa;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  margin-top: 10px;
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
