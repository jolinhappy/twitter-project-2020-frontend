<template>
  <div class="tweets-list">
    <!-- <TweetReplyModal
      v-if="replyModal"
      @after-click-close-reply="closeReplyModal"
    /> -->
    <a href="#" class="user-tweet">
      <div class="tweet-list-container">
        <div class="profile-image">
          <img src="https://i.imgur.com/W2nxio3.png" class="user-img" alt="" />
        </div>
        <div class="tweet">
          <div class="tweet-info">
            <a href="#" class="user-name-link">
              <div class="user-name">username</div>
            </a>
            <div class="user-account">@12345</div>
            <div class="create-time">．3天前</div>
          </div>
          <div class="tweet-content">
            jiejwir2irj 2r ij2oij ri2j roir32ro 23j poj p jpj 24po jri24j iowr
            23rko24k opt42okt; k4;otk;o4 k2;okt;o2 k;t4k2 ;otk;24o k;
          </div>
          <div class="tweet-action">
            <div class="tweet-reply" @click="showReplyModal">
              <img
                src="https://i.imgur.com/SaR8cz3.png"
                class="reply"
                alt="reply"
              />
              <span class="reply-count">20</span>
            </div>
            <div class="tweet-like">
              <img
                src="https://i.imgur.com/qs9Pe3N.png"
                class="like isliked"
                alt="like"
              />
              <span class="like-count">20</span>
            </div>
          </div>
        </div>
      </div>
    </a>

    <a href="#" class="user-tweet">
      <div class="tweet-list-container">
        <div class="profile-image">
          <img src="https://i.imgur.com/W2nxio3.png" class="user-img" alt="" />
        </div>
        <div class="tweet">
          <div class="tweet-info">
            <a href="#" class="user-name-link">
              <div class="user-name">username</div>
            </a>
            <div class="user-account">@12345</div>
            <div class="create-time">．3天前</div>
          </div>
          <div class="tweet-content">
            jiejwir2irj 2r ij2oij ri2j roir32ro 23j poj p jpj 24po jri24j iowr
            23rko24k opt42okt; k4;otk;o4 k2;okt;o2 k;t4k2 ;otk;24o k;
          </div>
          <div class="tweet-action">
            <div class="tweet-reply" @click="showReplyModal">
              <img
                src="https://i.imgur.com/SaR8cz3.png"
                class="reply"
                alt="reply"
              />
              <span class="reply-count">20</span>
            </div>
            <div class="tweet-like">
              <img
                src="https://i.imgur.com/qs9Pe3N.png"
                class="like isliked"
                alt="like"
              />
              <span class="like-count">20</span>
            </div>
          </div>
        </div>
      </div>
    </a>

    <a href="#" class="user-tweet">
      <div class="tweet-list-container">
        <div class="profile-image">
          <img src="https://i.imgur.com/W2nxio3.png" class="user-img" alt="" />
        </div>
        <div class="tweet">
          <div class="tweet-info">
            <a href="#" class="user-name-link">
              <div class="user-name">username</div>
            </a>
            <div class="user-account">@12345</div>
            <div class="create-time">．3天前</div>
          </div>
          <div class="tweet-content">
            jiejwir2irj 2r ij2oij ri2j roir32ro 23j poj p jpj 24po jri24j iowr
            23rko24k opt42okt; k4;otk;o4 k2;okt;o2 k;t4k2 ;otk;24o k;
          </div>
          <div class="tweet-action">
            <div class="tweet-reply" @click="showReplyModal">
              <img
                src="https://i.imgur.com/SaR8cz3.png"
                class="reply"
                alt="reply"
              />
              <span class="reply-count">20</span>
            </div>
            <div class="tweet-like">
              <img
                src="https://i.imgur.com/qs9Pe3N.png"
                class="like isliked"
                alt="like"
              />
              <span class="like-count">20</span>
            </div>
          </div>
        </div>
      </div>
    </a>

    <a href="#" class="user-tweet">
      <div class="tweet-list-container">
        <div class="profile-image">
          <img src="https://i.imgur.com/W2nxio3.png" class="user-img" alt="" />
        </div>
        <div class="tweet">
          <div class="tweet-info">
            <a href="#" class="user-name-link">
              <div class="user-name">username</div>
            </a>
            <div class="user-account">@12345</div>
            <div class="create-time">．3天前</div>
          </div>
          <div class="tweet-content">
            jiejwir2irj 2r ij2oij ri2j roir32ro 23j poj p jpj 24po jri24j iowr
            23rko24k opt42okt; k4;otk;o4 k2;okt;o2 k;t4k2 ;otk;24o k;
          </div>
          <div class="tweet-action">
            <div class="tweet-reply" @click="showReplyModal">
              <img
                src="https://i.imgur.com/SaR8cz3.png"
                class="reply"
                alt="reply"
              />
              <span class="reply-count">20</span>
            </div>
            <div class="tweet-like">
              <img
                src="https://i.imgur.com/qs9Pe3N.png"
                class="like isliked"
                alt="like"
              />
              <span class="like-count">20</span>
            </div>
          </div>
        </div>
      </div>
    </a>
  </div>
</template>

<script>
export default {
  methods: {
    showReplyModal() {
      this.$emit("showReplyModal", null);
    },
  },
};
</script>

<style scoped>
.user-tweet {
  width: 600px;
  height: 136px;
}
.tweet-list-container {
  width: 600px;
  border: 1px solid #e6ecf0;
  display: flex;
  padding-top: 10px;
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
.user-name-link:hover {
  text-decoration: underline;
}
.user-account,
.create-time {
  font-size: 15px;
  font-weight: 500;
  color: #657786;
}
.tweet-content {
  width: 510px;
  height: 66px;
  font-size: 15px;
  font-weight: 500;
}
.tweet-action,
.tweet-reply,
.tweet-like {
  display: flex;
  width: 130px;
  height: 21px;
}
.reply,
.like {
  width: 12.34px;
  height: 12.34px;
  line-height: 21px;
  margin: auto 0;
}
.like-count,
.reply-count {
  font-size: 13px;
  font-weight: 500;
  color: #657786;
  margin-left: 8px;
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
</style>