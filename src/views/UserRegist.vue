<template>
  <div class="container">
    <img src="https://i.imgur.com/v5wdZG6.png" alt="logo" class="logo" />
    <h2>建立你的帳號</h2>
    <UserInfoForm
      :initialAccount="account"
      :initialName="name"
      :initialEmail="email"
      :initialPassword="password"
      :initialCheckPassword="checkPassword"
      @afterSubmit="submitRegist"
      :isProcessing="isProcessing"
    />
    <div class="cancel">
      <p>
        <router-link to="/login">取消</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import UserInfoForm from "./../components/UserInfoForm";
import authorizationAPI from "./../apis/authorization";
import { Toast } from "./../utils/helpers";

export default {
  name: "UserRegist",
  components: {
    UserInfoForm,
  },
  data() {
    return {
      account: "",
      name: "",
      email: "",
      password: "",
      checkPassword: "",
      isProcessing: false,
    };
  },
  methods: {
    async submitRegist(data) {
      try {
        this.isProcessing = true;
        const { account, name, email, password, checkPassword } = data;
        if (account.length > 50) {
          Toast.fire({
            icon: "warning",
            title: "帳號限定使用50個字",
          });
          return;
        }
        if (name.length > 50) {
          Toast.fire({
            icon: "warning",
            title: "名稱限定使用50個字",
          });
          return;
        }
        if (!account || !name || !email || !password || !checkPassword) {
          Toast.fire({
            icon: "warning",
            title: "請確認是否已填寫所有欄位",
          });
          return;
        }
        if (password !== checkPassword) {
          Toast.fire({
            icon: "warning",
            title: "密碼與確認密碼不符",
          });
          return;
        }
        const response = await authorizationAPI.regist({
          account,
          name,
          email,
          password,
          checkPassword,
        });
        if (response.data.status === "error") {
          if (response.data.message === "Already have the same account.") {
            Toast.fire({
              icon: "error",
              title: "此帳號已被使用！",
            });
            this.isProcessing = false;
            return;
          } else if (response.data.message === "Email has been registered.") {
            Toast.fire({
              icon: "error",
              title: "此信箱已被註冊！",
            });
            this.isProcessing = false;
            return;
          }
          throw new Error(response.data.status);
        }
        Toast.fire({
          icon: "success",
          title: "註冊成功",
        });
        this.$router.push("/login");
      } catch (error) {
        this.isProcessing = false;
        console.log(error);
        Toast.fire({
          icon: "error",
          title: "無法註冊，請稍後再試",
        });
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
.cancel {
  width: 540px;
  margin: 0 auto;
  text-align: center;
  color: #0099ff;
  font-weight: bold;
  font-size: 18px;
  margin-top: 15px;
}
a {
  text-decoration: underline;
}
a:hover {
  color: blue;
}
</style>
