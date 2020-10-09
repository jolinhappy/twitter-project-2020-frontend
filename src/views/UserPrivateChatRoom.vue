<template>
  <div class="container">
    <!-- sidebar -->
    <Sidebar :selected-page="selectedPage" />
    <div class="history-chat-data-part">
      <div class="history-chat-data-container">
        <div class="history-data-list-title">
          <p>訊息</p>
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
          <div class="chatted-user-info">
            <router-link to="#" class="user-name-link">
              <div class="user-name">username</div>
            </router-link>
            <div class="user-account">@user.account</div>
          </div>
          <div class="history-chat-content">dweofkwofk owo fkeop...</div>
        </div>
        <!-- <div class="online-user">
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
        </div> -->
      </div>
    </div>
    <div class="chat-room-part">
      <div class="chat-room-container">
        <div class="chat-room-title">
          <div class="title">公開聊天室</div>
          <div class="accout">@apple</div>
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
              <template v-if="user.isMyself">
                <div class="self-message">
                  <div class="self-content">
                    <div class="self-message-info">
                      <div class="self-message-container">
                        <div class="self-message-text">
                          {{ user.message }}
                        </div>
                      </div>
                      <div class="self-submit-time">上午11:00</div>
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
                      <div class="other-submit-time">下午12:00</div>
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
            <button type="submit" class="input-button" @click="sendMessage">
              <font-awesome-icon icon="paper-plane" class="input" />
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
import chatAPI from "./../apis/chat";

export default {
  mixins: [emptyImageFilter],
  components: {
    Sidebar,
  },
  data() {
    return {
      selectedPage: "",
      inputMessage: "",
      userMessageData: [
        { id: 1, name: "123", message: "88888", isMyself: false },
        { id: 2, name: "jolin", message: "88888", isMyself: true },
        { id: 3, name: "123", message: "88dd888", isMyself: false },
        { id: 4, name: "jolin", message: "81228888", isMyself: true },
        { id: 5, name: "jolin", message: "8821313888", isMyself: true },
        { id: 6, name: "jolin", message: "81228888", isMyself: true },
        { id: 7, name: "jolin", message: "8fsfefewf8", isMyself: true },
      ],
    };
  },
  created: {
    created() {
      // this.$socket.on("chat", (data) => {
      //   this.messagePush(data);
      //   console.log(data);
      // });
      this.fetchChattingData();
      // this.$socket.on("", (data) => {
      //   this.messagePush(data);
      // });
    },
  },
  methods: {
    async fetchChattingData() {
      try {
        const { data } = await chatAPI.getChatData();
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    },
    // sendMessage() {
    //   const data = {
    //     id: 10,
    //     name: "",
    //     message: this.inputMessage,
    //     isMyself: true,
    //   };
    //   this.messagePush(data);
    //   // this.$socket.emit("chat", {
    //   //   data,
    //   // });
    //   this.inputMessage = "";
    // },
    // messagePush(data) {
    //   console.log(data);
    //   this.userMessageData.push({
    //     ...data,
    //     createdAt: new Date(),
    //   });
    // },

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
  /* flex: 1; */
  flex-direction: row;
}
.history-chat-data-part {
  width: 500px;
  height: auto;
  border-left: 1px solid #e6ecf0;
}
.chat-room-part {
  width: 50%;
  height: auto;
  flex: 1;
  border-left: 1px solid #e6ecf0;
}
.history-data-list-title,
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
.chatted-user-info {
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