<template>
  <div class="container">
    <!-- sidebar -->
    <Sidebar @showCreateModal="showCreateModal" :selected-page="selectedPage" />
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
        <div class="chat-content-container" v-chat-scroll>
          <div class="chat-content">
            <!-- 上線離線訊息 -->
            <!-- <div class="system-message">
              <div class="system-massage-container">
                <div class="system-text">apple 上線</div>
              </div>
            </div>
            <div class="system-message">
              <div class="system-massage-container">
                <div class="system-text">apple 上線</div>
              </div>
            </div> -->
            <!-- <template > -->
            <ChatMessage
              v-for="(user, index) in userMessageData"
              :key="index"
              :user="user"
            />
            <!-- </template> -->
          </div>
        </div>
        <!-- </div> -->
        <div class="chat-input-part">
          <div class="input-container">
            <textarea
              name=""
              id=""
              cols="30"
              class="message-input"
              rows="10"
              placeholder="輸入訊息..."
              @keydown="autoTextAreaHeight"
              v-model="inputMessage"
            ></textarea>
            <button type="submit" class="input-button">
              <font-awesome-icon
                icon="paper-plane"
                class="input"
                @click="sendMessage"
              />
            </button>
          </div>
        </div>
        <!-- </div> -->
      </div>
    </div>
    <TweetCreateModal
      v-if="createModal"
      @after-click-close-create="closeCreateModal"
      :initial-description="description"
      @afterSubmit="creatTweetFromModal"
      :currentUserData="currentUserData"
    />
  </div>
</template>


<script>
import Sidebar from "./../components/Sidebar";
import TweetCreateModal from "./../components/TweetCreateModal";
import tweetsAPI from "./../apis/tweets";
import usersAPI from "./../apis/users";
import { Toast } from "./../utils/helpers";
import ChatMessage from "./../components/ChatMessage";
import { mapState } from "vuex";

export default {
  components: {
    Sidebar,
    TweetCreateModal,
    ChatMessage,
  },
  sockets: {
    history: (data) => {
      console.log("data", data);
    },
  },
  data() {
    return {
      createModal: false,
      selectedPage: "",
      description: "",
      inputMessage: "",
      userMessageData: [],
      currentUserData: {
        id: "",
        name: "",
        account: "",
        avatar: "",
      },
      data: {
        id: "",
        name: "",
        message: "",
        createdAt: "",
      },
    };
  },
  computed: {
    ...mapState(["currentUser"]),
  },

  created() {
    this.fetchCurrentUserData(this.currentUser.id);
    this.$socket.on("chat message", (data) => {
      this.messagePush(data);
    });
  },
  methods: {
    showCreateModal() {
      this.createModal = true;
    },
    closeCreateModal() {
      this.createModal = false;
    },
    CreateFinish() {
      this.$router.push({ name: "tweets-home" });
    },
    async fetchCurrentUserData(id) {
      const { data } = await usersAPI.getUser({ userId: id });
      const { account, name, avatar } = data;
      this.currentUserData.account = account;
      this.currentUserData.name = name;
      this.currentUserData.avatar = avatar;
    },
    async creatTweetFromModal(newDescription) {
      try {
        if (newDescription.length === 0) {
          Toast.fire({
            icon: "warning",
            title: "請輸入推文內容",
          });
          return;
        }
        if (newDescription.length > 140) {
          Toast.fire({
            icon: "warning",
            title: "推文字數限制140字以內，請減少輸入的字數",
          });
          return;
        }
        const { data } = await tweetsAPI.createTweet({
          description: newDescription,
        });
        if (data.status === "error") {
          throw new Error(data.message);
        }
        this.CreateFinish();
      } catch (error) {
        console.log(error);
        Toast.fire({
          icon: "error",
          title: "無法新增推文，請稍後再試看",
        });
      }
    },
    sendMessage() {
      // const message = this.inputMessage;
      const data = {
        userId: this.currentUser.id,
        message: this.inputMessage,
        avatar: this.currentUser.avatar,
        createdAt: new Date(),
      };

      this.$socket.emit("chat message", {
        data,
      });

      this.inputMessage = "";
    },
    messagePush(data) {
      this.userMessageData.push(data);
    },

    //用出現滾輪的欄高判斷是否調整textarea高
    autoTextAreaHeight(e) {
      //如果textarea含滾輪滑動才可看見的欄高大於基本可是的欄高
      if (e.currentTarget.scrollHeight > e.currentTarget.clientHeight) {
        e.currentTarget.style.height = e.currentTarget.scrollHeight + "px";
      }
    },
  },
};
</script>


<style scoped>
.container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
}
.online-users-part {
  width: 500px;
  height: 100%;
  border-left: 1px solid #e6ecf0;
}
.chat-room-part {
  width: 50%;
  height: 100%;
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
.online-users-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
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
  height: 650px;
  overflow: scroll;
}
.chat-room-container {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.chat-content {
  margin: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 750px;
}
.chat-input-part {
  width: 100%;
  height: 55px;
  display: flex;
  border-top: 1px solid #e6ecf0;
}
.input-container {
  display: flex;
  width: 100%;
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

/* 訊息輸入區 */
.message-input {
  width: 85%;
  resize: none;
  border-radius: 30px;
  min-height: 25px;
  font-style: 15px;
  margin-top: 2.5px;
  margin-bottom: 10px;
  padding: 10px 15px 6px;
  font-size: 15px;
  border: none;
  background: #f0f0f0;
}
.input {
  width: 20px;
  height: 20px;
  margin-top: 10px;
  color: #ff6000;
}
.input:hover {
  color: gray;
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


