<template>
  <form action="" class="login-form" @submit.prevent.stop="handleSubmit">
    <div class="form-label-group">
      <label for="account" class="form-label">帳號</label>
      <input type="text" class="form-input" v-model="account" required />
    </div>
    <div class="form-label-group">
      <label for="password" class="form-label">密碼</label>
      <input type="password" class="form-input" v-model="password" required />
    </div>
    <button type="submit" class="btn login-btn" :disabled="isProcessing">
      {{ isProcessing ? "登入中..." : "登入" }}
    </button>
  </form>
</template>


<script>
export default {
  props: {
    initialAccount: {
      type: String,
      required: true,
    },
    initialPassword: {
      type: String,
      required: true,
    },
    isProcessing: {
      type: Boolean,
      require: true,
    },
  },
  data() {
    return {
      account: this.initialAccount,
      password: this.initialPassword,
    };
  },
  methods: {
    handleSubmit() {
      const data = {
        account: this.account,
        password: this.password,
      };
      this.$emit("afterSubmit", data);
    },
  },
};
</script>


<style scoped>
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
.btn:hover {
  background-color: #f75000;
}
</style>