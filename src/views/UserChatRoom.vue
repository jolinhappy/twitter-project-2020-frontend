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
        <div
          class="chat-content-container"
          v-chat-scroll="{ always: false, smooth: true }"
        >
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
            <div v-for="user in userMessageData" :key="user.id">
              <template v-if="currentUser.id === user.userId">
                <div class="self-message">
                  <div class="self-content">
                    <div class="self-message-info">
                      <div class="self-message-container">
                        <div class="self-message-text">
                          {{ user.message }}
                        </div>
                      </div>
                      <div class="self-submit-time">
                        {{ user.createdAt | formateDate }}&emsp;{{
                          user.createdAt | formateDateToTime
                        }}
                      </div>
                    </div>
                  </div>
                </div>
              </template>
              <!-- 別人的訊息 -->
              <template v-else>
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
                          {{ user.message }}
                        </div>
                      </div>
                      <div class="other-submit-time">
                        {{ user.createdAt | formateDate }}&emsp;{{
                          user.createdAt | formateDateToTime
                        }}
                      </div>
                    </div>
                  </div>
                </div>
              </template>
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
// import chatAPI from "./../apis/chat";
import { mapState } from "vuex";
import {
  emptyImageFilter,
  formDateNoYearFilter,
  formDateToTimeFilter,
} from "./../utils/mixins";
import { v4 as uuidv4 } from "uuid";

export default {
  mixins: [emptyImageFilter, formDateNoYearFilter, formDateToTimeFilter],
  components: {
    Sidebar,
    TweetCreateModal,
  },
  // sockets: {
  //   connection() {
  //     console.log("connected");
  //   },
  // },
  data() {
    return {
      createModal: false,
      selectedPage: "",
      description: "",
      inputMessage: "",
      userMessageData: [
        // { id: 1, name: "123", message: "88888", isMyself: false },
        // { id: 2, name: "jolin", message: "88888", isMyself: true },
        // { id: 3, name: "123", message: "88dd888", isMyself: false },
        // { id: 4, name: "jolin", message: "81228888", isMyself: true },
        // { id: 5, name: "jolin", message: "8821313888", isMyself: true },
        // { id: 6, name: "jolin", message: "81228888", isMyself: true },
        // { id: 7, name: "jolin", message: "8fsfefewf8", isMyself: true },
      ],
      currentUserData: {
        id: "",
        name: "",
        account: "",
        avatar: "",
      },
      nowChattingUserId: "",
      data: {
        id: "",
        name: "",
        message: "",
        createdAt: "",
      },
    };
  },
  computed: {
    //從vuex拿取現在登入者的資料
    ...mapState(["currentUser"]),
  },

  created() {
    // this.login();
    // this.sockets.connection();
    // this.fetchChattingData();
    this.fetchCurrentUserData(this.currentUser.id);
    // this.$socket.on("connection", (id) => {
    //   console.log("id", id);
    // });
    // this.$socket.on("login", (userId) => {
    //   console.log("user", userId);
    // });
    this.$socket.on("chat message", (data) => {
      console.log("dd", data);
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
    // async fetchChattingData() {
    //   try {
    //     const { data } = await chatAPI.getChatData();
    //     console.log(data);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },
    // login() {
    //   this.$socket.emit("login");
    // },
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
        // id: uuidv4(),
        userId: this.currentUser.id,
        message: this.inputMessage,
        // createdAt: new Date(),
      };
      this.$socket.emit("chat message", {
        data,
      });
      this.inputMessage = "";
    },
    messagePush(data) {
      // console.log(data);
      // console.log(this.currentUser.id);
      // const ddd = this.currentUser.id;
      // console.log("ddd1", ddd);
      this.userMessageData.push({
        ...data,
        id: uuidv4(),
        // userId: res.data.id,
        // chatId: data.id,
        // message: data.msg.message,
        createdAt: new Date(),
      });
    },
    //參考而已
    //     socket.on('message', async () => {
    //   const some1 = await fun1()
    //   const some2 = await fun2()
    //   socket.emit('reply', some1, some2)

    // })

    // io.on("connection", (socket) => {
    //     socket.on("greeting", async () => {
    //         let { data } = await Axios.get(/* something remote */);
    //         socket.emit("greeting-back", data);
    //     });
    // });

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
  /* min-height: 100vh; */
  height: 100%;
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
  overflow: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  flex: 1;
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
.other-submit-time,
.self-submit-time {
  font-size: 8px;
  color: #6c6c6c;
  margin-top: 3px;
}

/* 訊息輸入區 */
.message-input {
  width: 90%;
  resize: none;
  border-radius: 30px;
  min-height: 25px;
  font-style: 15px;
  margin-top: 5px;
  margin-bottom: 10px;
  padding: 10px 15px 6px;
  font-size: 15px;
  border: none;
  background: #f0f0f0;
}
.input {
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


