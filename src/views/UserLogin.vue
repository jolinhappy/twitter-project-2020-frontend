<template>
  <div class="container">
    <img src="https://i.imgur.com/v5wdZG6.png" alt="logo" class="logo" />
    <h2>登入 Alphitter</h2>
    <form action="" class="login-form">
      <div class="form-label-group">
        <label for="account" class="form-label">帳號</label>
        <input type="text" class="form-input" required />
      </div>
      <div class="form-label-group">
        <label for="password" class="form-label">密碼</label>
        <input type="text" class="form-input" required />
      </div>
      <button type="submit" class="btn login-btn">登入</button>
    </form>
    <div class="regist-link">
      <p>
        <router-link to="/regist">註冊Alphitter</router-link>．
        <a href="#">後台登入</a>
      </p>
    </div>
  </div>
</template>

<script>
export default {};
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
  height: 35px;
  border-bottom: 1px solid #657786;
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
