<template>
  <div>
    <template v-if="isMyself">
      <div class="self-message">
        <div class="self-content">
          <div class="self-message-info">
            <div class="self-message-container">
              <div class="self-message-text">
                {{ user.msg.data.message }}
              </div>
            </div>
            <div class="self-submit-time">
              {{ user.msg.data.createdAt | formateDate }}&emsp;{{
                user.msg.data.createdAt | formateDateToTime
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
            <img :src="user.msg.data.avatar | emptyImage" class="user-img" alt="" />
          </div>
          <div class="other-message-info">
            <div class="other-message-container">
              <div class="other-message-text">
                {{ user.msg.data.message }}
              </div>
            </div>
            <div class="other-submit-time">
              {{ user.msg.data.createdAt | formateDate }}&emsp;{{
                user.msg.data.createdAt | formateDateToTime
              }}
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import {
  emptyImageFilter,
  formDateNoYearFilter,
  formDateToTimeFilter,
} from "./../utils/mixins";
import { mapState } from "vuex";

export default {
  mixins: [emptyImageFilter, formDateNoYearFilter, formDateToTimeFilter],
  props: {
    user: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    ...mapState(["currentUser"]),
    isMyself() {
      return this.user.msg.data.userId === this.currentUser.id;
    },
  },
};
</script>


<style scoped>
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
  min-height: 40px;
  width: auto;
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
  min-height: 40px;
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
</style>