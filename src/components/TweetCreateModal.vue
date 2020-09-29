<template>
  <div class="tweet-create-modal">
    <div class="modal-container">
      <div class="modal-box">
        <div class="cancel-create">
          <img
            src="https://i.imgur.com/qd4MrVa.png"
            class="cancel-icon"
            alt="cancel"
            @click="clickToClose"
          />
        </div>
        <div class="tweet-create-container">
          <div class="profile-image">
            <img
              src="https://i.imgur.com/W2nxio3.png"
              class="user-img"
              alt=""
            />
          </div>
          <div class="tweet-input">
            <textarea
              name="tweet-input-area"
              class="tweet-input-content"
              id=""
              cols="30"
              rows="10"
              placeholder="有什麼新鮮事？"
            ></textarea>
            <button type="submit" class="tweet-create-btn">推文</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    clickToClose() {
      this.$emit("after-click-close-create", null);
    },
  },
};
</script>

<style scoped>
.tweet-create-modal {
  width: 100%;
  height: 2000px;
  background-color: rgba(0, 0, 0, 0.8);
  position: absolute;
  display: flex;
  justify-content: center;
}
.modal-container {
  margin-top: 30px;
  width: 600px;
  height: 300px;
  background-color: white;
  border-radius: 14px;
}
.cancel-create {
  width: 600px;
  height: 40px;
  border-bottom: 1px solid #e6ecf0;
}
.cancel-icon {
  width: 24px;
  height: 24px;
  line-height: 40px;
  margin-left: 15px;
  margin-top: 15px;
  cursor: pointer;
}
.tweet-create-container {
  display: flex;
  height: 245px;
  /* overflow: auto; */
}
.profile-image {
  width: 80px;
  height: 120px;
  margin-top: 10px;
}
.user-img {
  width: 50px;
  height: 50px;
  margin-left: 15px;
  border-radius: 50%;
}

.tweet-input {
  margin-top: 10px;
  width: 510px;
  height: 150px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
}
.tweet-input-content {
  width: 510px;
  height: 160px;
  resize: none;
  border: none;
  font-size: 18px;
  font-weight: 500;
  color: #9197a3;
  overflow: hidden;
}
.tweet-input-content:focus {
  color: black;
}
.tweet-create-btn {
  width: 64px;
  height: 40px;
  background-color: #ff6000;
  border-radius: 50px;
  color: #f5f8fa;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  margin-top: 15px;
}
</style>
