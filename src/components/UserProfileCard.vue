<template>
  <div class="user-info">
    <div class="info-title">
      <a href="#" class="back-button"
        ><img src="https://i.imgur.com/aPVTDn2.png" class="back-img" alt="" />
      </a>
      <div class="title-content">
        <div class="name">Jolin</div>
        <div class="tweets-count">25推文</div>
      </div>
    </div>
    <div class="profile-content">
      <div class="cover-part">
        <img
          src="https://i.imgur.com/1Gtowr4.png"
          class="cover-img"
          alt="cover"
        />
      </div>
      <div class="user-img-part">
        <img
          src="https://i.imgur.com/rMilpGT.png"
          class="user-main-img"
          alt="user-img"
        />
      </div>
      <div class="detail-info-part">
        <div class="button-part">
          <button type="button" class="message-btn">
            <img
              src="https://i.imgur.com/DTgxxcI.png"
              class="message-icon"
              alt="message"
            />
          </button>
          <button type="button" class="notice-btn">
            <img
              src="https://i.imgur.com/JDdDdr0.png"
              class="notice-icon"
              alt="message"
            />
          </button>
          <button type="button" class="following">正在追蹤</button>
          <button type="button" class="edit-info" @click="showEditModal">
            編輯個人資料
          </button>
        </div>
        <div class="name-info">
          <div class="user-name">Jolin</div>
          <div class="user-account">@jolin</div>
          <div class="discription">唱跳天后蔡依林，怪美的呸姐</div>
        </div>
        <div class="follow-info">
          <router-link to="/users/:id/followings" class="followings-link"
            ><div class="followings">
              <strong>20個</strong>追蹤中
            </div></router-link
          >
          <a href="#" class="followers-link"
            ><div class="followers"><strong>30位</strong>追蹤者</div></a
          >
        </div>
      </div>

      <!-- userNavTab -->
      <UserNavTab />
    </div>
  </div>
</template>

<script>
import UserNavTab from "./../components/UserNavTab";
export default {
  components: {
    UserNavTab,
  },
  methods: {
    showEditModal() {
      this.$emit("showEditModal");
    },
  },
};
</script>

<style scoped>
.back-button {
  height: 55px;
}
.profile-content {
  width: 600px;
  border: 1px solid #e5e5e5;
  position: relative;
}
.back-img {
  width: 24px;
  height: 24px;
  display: inline;
  margin: auto 15px;
  margin-top: 15px;
}
.info-title {
  font-size: 18px;
  font-weight: 700;
  width: 600px;
  height: 55px;
  border: 1px solid #e6ecf0;
  display: flex;
}
.title-content {
  margin-left: 25px;
}

.profile-image {
  width: 70px;
  height: 120px;
}

.name {
  font-size: 19px;
  font-weight: 900;
  margin-top: 5px;
}
.tweets-count {
  font-size: 13px;
  font-weight: 500;
  color: #657786;
}
.cover-part {
  width: 598px;
  display: flex;
  align-items: center;
}
.cover-img {
  width: 600px;
  height: 200px;
}
.user-img-part {
  background: #ffffff;
  width: 150px;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  position: absolute;
  left: 15px;
  bottom: 195px;
}
.user-main-img {
  width: 140px;
  height: 140px;
  object-fit: cover;
  border-radius: 50%;
}

.detail-info-part {
  width: 600px;
  height: 230px;
  display: flex;
  flex-direction: column;
  margin-left: 20px;
}

.button-part {
  width: 600px;
  display: flex;
  margin-left: -35px;
  justify-content: flex-end;
  margin-top: 10px;
}
.edit-info {
  width: 122px;
  height: 40px;
  font-size: 15px;
  font-weight: bold;
  border: 1px solid #ff6600;
  border-radius: 100px;
  color: #ff6600;
}
.message-icon,
.notice-icon {
  width: 40px;
  height: 40px;
}
.following {
  width: 92px;
  height: 40px;
  background: #ff6600;
  font-weight: bold;
  font-size: 15px;
  color: white;
  border-radius: 100px;
}
.name-info {
  margin-top: 30px;
  margin-bottom: 10px;
}
.user-name {
  font-size: 19px;
  font-weight: 900;
}
.user-account {
  font-size: 15px;
  font-weight: 500;
  color: #657786;
}
.discription {
  line-height: 20px;
  font-size: 14px;
  font-weight: normal;
  margin-top: 10px;
}

.follow-info {
  display: flex;
  font-size: 14px;
  font-weight: 500;
}
.followings {
  margin-right: 20px;
}
</style>