<template>
  <div class="follow-top-container">
    <div class="follow-top-title">
      <p>跟隨誰</p>
    </div>
    <div class="follow-top-user">
      <div class="profile-image top-user-image">
        <img
          src="https://i.imgur.com/W2nxio3.png"
          class="user-img top-user"
          alt=""
        />
      </div>
      <div class="top-user-info">
        <a href="#" class="user-name-link">
          <div class="user-name">username</div>
        </a>
        <div class="user-account">@12345</div>
      </div>
      <div class="follow-btn">
        <button type="button" class="followed">正在跟隨</button>
      </div>
    </div>

    <div class="follow-top-user">
      <div class="profile-image top-user-image">
        <img src="https://i.imgur.com/W2nxio3.png" class="user-img" alt="" />
      </div>
      <div class="top-user-info">
        <a href="#" class="user-name-link">
          <div class="user-name">username</div>
        </a>
        <div class="user-account">@12345</div>
      </div>
      <div class="follow-btn">
        <button type="button" class="follow">跟隨</button>
      </div>
    </div>

    <div class="follow-top-user">
      <div class="profile-image top-user-image">
        <img src="https://i.imgur.com/W2nxio3.png" class="user-img" alt="" />
      </div>
      <div class="top-user-info">
        <a href="#" class="user-name-link">
          <div class="user-name">username</div>
        </a>
        <div class="user-account">@12345</div>
      </div>
      <div class="follow-btn">
        <button type="button" class="follow">跟隨</button>
      </div>
    </div>

    <div class="follow-top-user">
      <div class="profile-image top-user-image">
        <img src="https://i.imgur.com/W2nxio3.png" class="user-img" alt="" />
      </div>
      <div class="top-user-info">
        <a href="#" class="user-name-link">
          <div class="user-name">username</div>
        </a>
        <div class="user-account">@12345</div>
      </div>
      <div class="follow-btn">
        <button type="button" class="follow">跟隨</button>
      </div>
    </div>
    <div class="follow-top-user">
      <div class="profile-image top-user-image">
        <img src="https://i.imgur.com/W2nxio3.png" class="user-img" alt="" />
      </div>
      <div class="top-user-info">
        <a href="#" class="user-name-link">
          <div class="user-name">username</div>
        </a>
        <div class="user-account">@12345</div>
      </div>
      <div class="follow-btn">
        <button type="button" class="follow">跟隨</button>
      </div>
    </div>
    <div class="follow-top-user">
      <div class="profile-image top-user-image">
        <img src="https://i.imgur.com/W2nxio3.png" class="user-img" alt="" />
      </div>
      <div class="top-user-info">
        <a href="#" class="user-name-link">
          <div class="user-name">username</div>
        </a>
        <div class="user-account">@12345</div>
      </div>
      <div class="follow-btn">
        <button type="button" class="follow">跟隨</button>
      </div>
    </div>

    <div class="more">
      <a href="#" class="readMore">顯示更多</a>
    </div>
  </div>
</template>


<style scoped>
.follow-top-container {
  width: 350px;
  height: 517px;
  background-color: #f5f8fa;
  border-radius: 14px;
  margin-left: 45px;
  margin-right: 85px;
  margin-top: 15px;
}
.follow-top-title {
  height: 45px;
  border-bottom: 1px solid #e6ecf0;
  font-size: 18px;
  font-weight: bold;
}
.follow-top-title p {
  line-height: 45px;
  margin-left: 15px;
}
.follow-top-user {
  display: flex;
  align-items: center;
  height: 70px;
  border-bottom: 1px solid #e6ecf0;
}
.follow-top-user:hover {
  background: #e6ece2;
}
.top-user-info {
  width: 150px;
}
.top-user-image {
  height: 70px;
}
.top-user-image .user-img {
  margin-top: 8px;
}
.follow-btn {
  width: 100px;
  height: 70px;
  display: flex;
  justify-content: flex-end;
}
.followed {
  width: 92px;
  height: 38px;
  background-color: #ff6000;
  border-radius: 100px;
  color: #f5f8fa;
  margin: auto 0;
  font-size: 15px;
  font-weight: bold;
}
.follow {
  width: 62px;
  height: 30px;
  border-radius: 100px;
  border: 1px solid #ff6000;
  color: #ff6000;
  font-size: 15px;
  font-weight: bold;
  margin: auto 0;
}
.more {
  height: 45px;
  font-size: 15px;
  font-weight: bold;
  color: #ff6000;
}
.readMore {
  line-height: 45px;
  margin-left: 15px;
}

.profile-image {
  width: 70px;
}
.user-img {
  width: 50px;
  height: 50px;
  margin-left: 15px;
  border-radius: 50%;
}
</style>