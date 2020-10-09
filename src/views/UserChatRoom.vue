<template>
  <div class="container">
    <!-- sidebar -->
    <Sidebar :selected-page="selectedPage" />
    <div class="online-users-part">
      <div class="online-users-container">
        <div class="user-list-title">
          <p>上線使用者(0)</p>
        </div>
        <!-- list- -->
        <div class="online-user">
          <router-link to="#" class="user-avatar-link">
            <div class="profile-image online-user-imag">
              <img
                src="https://i.imgur.com/qRezTy6.pnge"
                class="user-img"
                alt=""
              />
            </div>
          </router-link>
          <div class="online-user-info">
            <router-link to="#" class="user-name-link">
              <div class="user-name">username</div>
            </router-link>
            <div class="user-account">@user.account</div>
          </div>
        </div>
        <div class="online-user">
          <router-link to="#" class="user-avatar-link">
            <div class="profile-image online-user-image">
              <img
                src="https://i.imgur.com/qRezTy6.pnge"
                class="user-img"
                alt=""
              />
            </div>
          </router-link>
          <div class="online-user-info">
            <router-link to="#" class="user-name-link">
              <div class="user-name">username</div>
            </router-link>
            <div class="user-account">@user.account</div>
          </div>
        </div>
        <div class="online-user">
          <router-link to="#" class="user-avatar-link">
            <div class="profile-image online-user-imag">
              <img
                src="https://i.imgur.com/qRezTy6.pnge"
                class="user-img"
                alt=""
              />
            </div>
          </router-link>
          <div class="online-user-info">
            <router-link to="#" class="user-name-link">
              <div class="user-name">username</div>
            </router-link>
            <div class="user-account">@user.account</div>
          </div>
        </div>
      </div>
    </div>
    <div class="chat-room-part">
      <div class="chat-room-container">
        <div class="chat-room-title">
          <p>公開聊天室</p>
        </div>
        <!-- chat -->
        <!-- <div class="chat-room"> -->
        <div class="chat-content-container">
          <div class="chat-content">
            <!-- 上線離線訊息 -->
            <div class="system-message">
              <div class="system-massage-container">
                <div class="system-text">apple 上線</div>
              </div>
            </div>
            <div class="system-message">
              <div class="system-massage-container">
                <div class="system-text">apple 上線</div>
              </div>
            </div>
            <!-- 自己的訊息 -->
            <div class="self-message">
              <div class="self-content">
                <div class="self-message-info">
                  <div class="self-message-container">
                    <div class="self-message-text">
                      我的天天天啊3ri2jio ro3232r j3r oi 33j2 rij 32oij2 oirj 2
                      3rj 323 j2ioj ro3232rqe 3r23
                    </div>
                  </div>
                  <div class="self-submit-time">上午11:00</div>
                </div>
              </div>
            </div>
            <div class="self-message">
              <div class="self-content">
                <div class="self-message-info">
                  <div class="self-message-container">
                    <div class="self-message-text">
                      我的天天天啊3ri2jio ro3232r j3r oi 33j2 rij 32oij2 oirj 2
                      3rj 323 j2ioj ro3232rqe 3r23
                    </div>
                  </div>
                  <div class="self-submit-time">上午11:00</div>
                </div>
              </div>
            </div>
            <div class="self-message">
              <div class="self-content">
                <div class="self-message-info">
                  <div class="self-message-container">
                    <div class="self-message-text">
                      我的天天天啊3ri2jio ro3232r j3r oi 33j2 rij 32oij2 oirj 2
                      3rj 323 j2ioj ro3232rqe 3r23
                    </div>
                  </div>
                  <div class="self-submit-time">上午11:00</div>
                </div>
              </div>
            </div>
            <div class="self-message">
              <div class="self-content">
                <div class="self-message-info">
                  <div class="self-message-container">
                    <div class="self-message-text">
                      我的天天天啊3ri2jio ro3232r j3r oi 33j2 rij 32oij2 oirj 2
                      3rj 323 j2ioj ro3232rqe 3r23
                    </div>
                  </div>
                  <div class="self-submit-time">上午11:00</div>
                </div>
              </div>
            </div>
            <div class="self-message">
              <div class="self-content">
                <div class="self-message-info">
                  <div class="self-message-container">
                    <div class="self-message-text">
                      我的天天天啊3ri2jio ro3232r j3r oi 33j2 rij 32oij2 oirj 2
                      3rj 323 j2ioj ro3232rqe 3r23
                    </div>
                  </div>
                  <div class="self-submit-time">上午11:00</div>
                </div>
              </div>
            </div>
            <!-- 別人的訊息 -->
            <div class="other-message">
              <div class="other-content">
                <div class="profile-image other-image">
                  <img
                    src="https://i.imgur.com/qRezTy6.pnge"
                    class="user-img"
                    alt=""
                  />
                </div>
                <div class="other-message-info">
                  <div class="other-message-container">
                    <div class="other-message-text">
                      deiwj iojroi42j ri42io jroj 2o4ijr i4i2iorj i3
                      oirfekdjfidjfidjsfijioefoierjcdiejwfo4ie
                      ioj4oijfoi43jofioijio
                      jijijijijijijijijijijijijijiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii
                    </div>
                  </div>
                  <div class="other-submit-time">下午12:00</div>
                </div>
              </div>
            </div>
            <div class="other-message">
              <div class="other-content">
                <div class="profile-image other-image">
                  <img
                    src="https://i.imgur.com/qRezTy6.pnge"
                    class="user-img"
                    alt=""
                  />
                </div>
                <div class="other-message-info">
                  <div class="other-message-container">
                    <div class="other-message-text">
                      deiwj iojroi42j ri42io jroj 2o4ijr i4i2iorj i3
                      oirfekdjfidjfidjsfijioefoierjcdiejwfo4ie
                      ioj4oijfoi43jofioijio
                      jijijijijijijijijijijijijijiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii
                    </div>
                  </div>
                  <div class="other-submit-time">下午12:00</div>
                </div>
              </div>
            </div>
            <div class="other-message">
              <div class="other-content">
                <div class="profile-image other-image">
                  <img
                    src="https://i.imgur.com/qRezTy6.pnge"
                    class="user-img"
                    alt=""
                  />
                </div>
                <div class="other-message-info">
                  <div class="other-message-container">
                    <div class="other-message-text">
                      deiwj iojroi42j ri42io jroj 2o4ijr i4i2iorj i3
                      oirfekdjfidjfidjsfijioefoierjcdiejwfo4ie
                      ioj4oijfoi43jofioijio
                      jijijijijijijijijijijijijijiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii
                    </div>
                  </div>
                  <div class="other-submit-time">下午12:00</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="chat-input-part">
          <div class="input-container">
            <textarea
              name=""
              id=""
              cols="30"
              class="message-input"
              rows="10"
            ></textarea>
            <button type="submit" class="input-button">
              <img src="#" alt="" />
            </button>
          </div>
        </div>
        <!-- </div> -->
      </div>
    </div>
  </div>
</template>


<script>
import Sidebar from "./../components/Sidebar";
import { emptyImageFilter } from "./../utils/mixins";

export default {
  mixins: [emptyImageFilter],
  components: {
    Sidebar,
  },
  data() {
    return {
      selectedPage: "",
    };
  },
};
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  display: flex;
  flex: 1;
  flex-direction: row;
}
.online-users-part {
  width: 45%;
  height: auto;
  border-left: 1px solid #e6ecf0;
}

.chat-room-part {
  width: 55%;
  height: auto;
  flex: 1;
  border-left: 1px solid #e6ecf0;
}

.user-list-title,
.chat-room-title {
  font-size: 18px;
  font-weight: 700;
  width: auto;
  height: 55px;
  border-top: 1px solid #e6ecf0;
  border-bottom: 1px solid #e6ecf0;
}

.user-list-title p,
.chat-room-title p {
  line-height: 55px;
  margin-left: 15px;
}

/* 
onlineUsers-list */
.online-user {
  display: flex;
  align-items: center;
  height: 70px;
  border-bottom: 1px solid #e6ecf0;
}
.online-user:hover {
  background: #e6ece2;
}
.online-user-info {
  width: 150px;
  display: flex;
  margin-left: 10px;
}
.online-user-image {
  height: 70px;
}
.online-user-image .user-img {
  margin-top: 8px;
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
.user-name {
  font-size: 15px;
  font-weight: bold;
  color: #1c1c1c;
}
.user-account {
  font-size: 15px;
  font-weight: bold;
  color: #657786;
  margin-left: 8px;
}
.user-img:hover {
  transform: scale(1.1, 1.1);
}

/* chat-room */
.chat-room-part {
  display: flex;
  flex-direction: column;
}
.chat-content-container {
  overflow: auto;
}
.chat-room-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  height: 800px;
  flex: 1;
}
.chat-content {
  flex: 1;
  margin: 20px;
  overflow: none;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}
.chat-input-part {
  width: 100%;
  height: 55px;
  display: flex;
  border-top: 1px solid #e6ecf0;
}
.input-container {
  display: flex;
  width: 730px;
  height: 35px;
  justify-content: center;
  margin: auto;
}
/* 系統訊息 */
.system-message {
  display: flex;
  justify-content: center;
}
.system-massage-container {
  min-width: 80px;
  height: 30px;
  background: #e0e0e0;
  border-radius: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 8px;
}
.system-text {
  margin: 10px;
  font-size: 15px;
  font-weight: 500;
  color: #6c6c6c;
}
/* 使用者訊息 */
.other-message-info {
  display: flex;
  flex-direction: column;
  height: auto;
  margin-left: 10px;
}
.other-content {
  display: flex;
  flex-direction: row;
}

.other-message-container {
  height: auto;
  max-width: 300px;
  background: #f0f0f0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  border-bottom-right-radius: 30px;
}
.self-message-text,
.other-message-text {
  font-size: 15px;
  line-height: 23px;
  margin: 13px;
  word-break: break-all;
}
.self-message-info {
  display: flex;
  flex-direction: column;
  height: auto;
  margin-right: 10px;
  align-items: flex-end;
}
.self-message-container {
  height: auto;
  max-width: 300px;
  background: #ff6000;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  border-bottom-left-radius: 30px;
}

/* 訊息輸入區 */
.message-input {
  width: 90%;
  resize: none;
  border-radius: 30px;
  min-height: 25px;
  font-style: 15px;
  margin-top: 5px;
  margin-bottom: 5px;
  padding-left: 15px;
  padding-top: 10px;
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