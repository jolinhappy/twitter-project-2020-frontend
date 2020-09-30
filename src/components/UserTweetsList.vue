<template>
  <div class="tweets-list">
    <router-link to="/tweets/:id" class="user-tweet">
      <div class="tweet-list-container">
        <div class="profile-image">
          <img src="https://i.imgur.com/W2nxio3.png" class="user-img" alt="" />
        </div>
        <div class="tweet">
          <div class="tweet-info">
            <router-link to="/users/:id" class="user-name-link">
              <div class="user-name">username</div>
            </router-link>
            <div class="user-account">@12345</div>
            <div class="create-time">．3天前</div>
          </div>
          <div class="tag-user">
            <div class="tag-text">回覆</div>
            <a href="#" class="tag-user-acount">@jolin</a>
          </div>
          <div class="tweet-content">
            jiejwir2irj 2r ij2oij ri2j roir32ro 23j poj p jpj 24po jri24j iowr
            23rko24k opt42okt; k4;otk;o4 k2;okt;o2 k;t4k2 ;otk;24o k; iowr
            23rko24k opt42okt; k4;otk;o4 k2;okt;o2 k;t4k2 ;otk;24o k; iowr
            23rko24k opt42okt; k4;otk;o4 k2;okt;o2 k;t4k2 ;otk;24o k; iowr
            23rko24k opt42okt; k4;otk;o4 k2;okt;o2 k;t4k2 ;otk;24o k; iowr
            23rko24k opt42okt; k4;otk;o4 k2;okt;o2 k;t4k2 ;otk;24o k; iowr
            23rko24k opt42okt; k4;otk;o4 k2;okt;o2 k;t4k2 ;otk;24o k; iowr
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
    </router-link>

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
            <a href="/users/:id" class="user-name-link">
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
  height: auto;
}
.tweet-list-container {
  width: 600px;
  height: auto;
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
.tweet {
  display: flex;
  flex-direction: column;
}
.tweet-content {
  width: 510px;
  height: auto;
  flex: 1;
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
.tweet-action {
  margin: 8px 0;
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
  margin: auto 0 auto 8px;
}
.tweet-reply {
  margin-right: 30px;
}
.profile-image {
  width: 70px;
  height: auto;
  display: flex;
  justify-content: center;
}
.user-img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.tag-user {
  display: flex;
  margin: 5px 0;
  font-size: 15px;
  font-weight: 500;
}
.tag-text {
  color: #657786;
  margin-right: 5px;
}
.tag-user-acount {
  color: #ff6000;
}
</style>