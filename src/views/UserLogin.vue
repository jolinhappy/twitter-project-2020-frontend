<template>
  <div class="container">
    <img src="https://i.imgur.com/v5wdZG6.png" alt="logo" class="logo" />
    <h2>登入 Alphitter</h2>
    <UserLoginForm />
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
export default {
  components: {
    UserLoginForm,
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
