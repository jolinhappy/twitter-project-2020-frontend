<template>
  <div class="tweet-reply-modal">
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
        <div class="reply-section">
          <div class="user-tweet-container">
            <div class="profile-image">
              <img
                src="https://i.imgur.com/W2nxio3.png"
                class="user-img"
                alt=""
              />
              <div class="line"></div>
            </div>
            <div class="tweet-part">
              <div class="tweet-info">
                <div class="user-name">username</div>
                <div class="user-account">@12345</div>
                <div class="create-time">．3天前</div>
              </div>
              <div class="tweet-content">
                jiejwir2irj 2r ij2oij ri2j roir32ro 23j poj p jpj 24po jri24j
                iowr 23rko24k opt42okt; k4;otk;o4 k2;okt;o2 k;t4k2 ;otk;24o
                jiejwir2irj 2r ij2oij ri2j roir32ro 23j poj p jpj 24po jri24j
                iowr 23rko24k opt42okt; k4;otk;o4 k2;okt;o2 k;t4k2 ;otk;24o 2r
                ij2oij ri2j roir32ro 23j poj p jpj 24po jri24j iowr 23rko24k
                opt42okt; k4;otk;o4 k2;okt;o2 k;t4k2 ;otk;24o 2r ij2oij ri2j
                roir32ro 23j poj p jpj 24po jri24j iowr 23rko24k opt42okt;
                k4;otk;o4 k2;okt;o2 k;t4k2 ;otk;24o 4 k2;okt;o2 k;t4k2 ;otk;24o
                2r ij2oij ri2j roir32ro 23j poj p jpj 24po jri24j iowr 23rko24k
                opt42okt; k4;otk;o4 k2;okt;o2 k;t4k2 ;otk 2r ij2oij ri2j
                roir32ro 23j poj p jpj 24po jri24j iowr 23rko24k opt42okt;
                k4;otk;o4 k2;okt;o2 k;t4k2 ;otk;24o
              </div>
              <div class="reply-for">
                <p>回覆</p>
                <a href="#" class="reply-user-account">@username</a>
              </div>
            </div>
          </div>
          <div class="tweet-reply-container">
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
                placeholder="推你的回覆"
              ></textarea>
              <button type="submit" class="tweet-reply-btn">回覆</button>
            </div>
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
      this.$emit("after-click-close-reply", null);
    },
  },
};
</script>

<style scoped>
.tweet-reply-modal {
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
  height: 450px;
  background-color: white;
  border-radius: 14px;
}
.reply-section {
  width: 600px;
  height: 395px;
  overflow-y: auto;
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
.tweet-reply-container {
  display: flex;
}
.profile-image {
  width: 70px;
  height: 120px;
}
.user-img {
  width: 50px;
  height: 50px;
  margin-left: 15px;
  border-radius: 50%;
}

.tweet-input {
  width: 500px;
  height: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  font-size: 18px;
}
.tweet-input-content {
  width: 500px;
  height: 100%;
  resize: none;
  border: none;
  margin-top: 10px;
  font-size: 18px;
  font-weight: 500;
  color: #9197a3;
  overflow: hidden;
}
.tweet-input-content:focus {
  color: black;
}

.tweet-reply-btn {
  width: 64px;
  height: 40px;
  margin-bottom: 15px;
  margin-top: 10px;
  background-color: #ff6000;
  border-radius: 50px;
  color: #f5f8fa;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
}

.user-tweet-container {
  width: 560px;
  height: auto;
  display: flex;
  margin-top: 10px;
}

.tweet-part {
  width: 450px;
  display: flex;
  flex-direction: column;
}
.tweet-content {
  font-size: 15px;
}
.line {
  background: gray;
  position: relative;
  height: auto;
  flex-grow: 1;
}

.line::after {
  content: "";
  width: 2px;
  height: 80px;
  background: #ccd6cc;
  position: absolute;
  left: 50%;
}

.tweet-info {
  display: flex;
  flex-direction: row;
}
.user-name {
  font-size: 15px;
  font-weight: bold;
  margin-right: 10px;
}

.user-account,
.create-time {
  font-size: 15px;
  font-weight: 500;
  color: #657786;
}

.reply-for {
  width: 300px;
  height: 50px;
  margin-top: 15px;
}

.reply-for p {
  font-size: 13px;
  color: #657786;
  display: inline;
  margin-right: 5px;
}
.reply-user-account {
  color: #ff6000;
  font-size: 13px;
}
::-webkit-scrollbar {
  width: 10px;
  height: 5px;
}
::-webkit-scrollbar-thumb {
  width: 10px;
  height: 5px;
  background: gray;
  border-radius: 50px;
}
</style>