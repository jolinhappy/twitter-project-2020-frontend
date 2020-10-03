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
    };
  },
  methods: {
    submitRegist(data) {
      console.log("data", data);
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
