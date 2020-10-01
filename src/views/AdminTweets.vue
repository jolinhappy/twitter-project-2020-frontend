<template>
  <div class="container">
    <!-- sidebar -->
    <Sidebar :isAdmin="isAdmin" />
    <div class="admin-tweets">
      <div class="admin-tweets-container">
        <div class="admin-tweets-title">
          <p>推文清單</p>
        </div>
        <!-- list -->
        <router-link to="/tweets/:id" class="user-tweet">
          <div class="tweet-list-container">
            <div class="profile-image">
              <img
                src="https://i.imgur.com/W2nxio3.png"
                class="user-img"
                alt=""
              />
            </div>
            <div class="tweet">
              <div class="tweet-info">
                <router-link to="/users/:id" class="user-name-link">
                  <div class="user-name">username</div>
                </router-link>
                <div class="user-account">@12345</div>
                <div class="create-time">．3天前</div>
              </div>
              <div class="tweet-content">
                jiejwir2irj 2r ij2oij ri2j roir32ro 23j poj p jpj 24po jri24j
                iowr 23rko24k opt42okt; k4;otk;o4 k2;okt;o2 k;t4k2 ;otk;24o k;
                iowr 23rko24k opt42okt; k4;otk;o4 k2;okt;o2 k;t4k2 ;otk;24o k;
                iowr 23rko24k opt42okt; k4;otk;o4 k2;okt;o2 k;t4k2 ;otk;24o k;
                iowr 23rko24k opt42okt; k4;otk;o4 k2;okt;o2 k;t4k2 ;otk;24o k;
                iowr 23rko24k opt42okt; k4;otk;o4 k2;okt;o2 k;t4k2 ;otk;24o k;
                iowr 23rko24k opt42okt; k4;otk;o4 k2;okt;o2 k;t4k2 ;otk;24o k;
                iowr 23rko24k opt42okt; k4;otk;o4 k2;okt;o2 k;t4k2 ;otk;24o k;
              </div>
            </div>
            <div class="delete-tweet">
              <div class="delete-container">
                <img
                  src="https://i.imgur.com/puB9wJ7.png"
                  class="delete-icon"
                  alt=""
                />
              </div>
            </div>
          </div>
        </router-link>
        <router-link to="/tweets/:id" class="user-tweet">
          <div class="tweet-list-container">
            <div class="profile-image">
              <img
                src="https://i.imgur.com/W2nxio3.png"
                class="user-img"
                alt=""
              />
            </div>
            <div class="tweet">
              <div class="tweet-info">
                <router-link to="/users/:id" class="user-name-link">
                  <div class="user-name">username</div>
                </router-link>
                <div class="user-account">@12345</div>
                <div class="create-time">．3天前</div>
              </div>
              <div class="tweet-content">
                jiejwir2irj 2r ij2oij ri2j roir32ro 23j poj p jpj 24po jri24j
                iowr 23rko24k opt42okt; k4;otk;o4 k2;okt;o2 k;t4k2 ;otk;24o k;
                iowr 23rko24k opt42okt; k4;otk;o4 k2;okt;o2 k;t4k2 ;otk;24o k;
                iowr 23rko24k opt42okt; k4;otk;o4 k2;okt;o2 k;t4k2 ;otk;24o k;
                iowr 23rko24k opt42okt; k4;otk;o4 k2;okt;o2 k;t4k2 ;otk;24o k;
                iowr 23rko24k opt42okt; k4;otk;o4 k2;okt;o2 k;t4k2 ;otk;24o k;
                iowr 23rko24k opt42okt; k4;otk;o4 k2;okt;o2 k;t4k2 ;otk;24o k;
                iowr 23rko24k opt42okt; k4;otk;o4 k2;okt;o2 k;t4k2 ;otk;24o k;
              </div>
            </div>
            <div class="delete-tweet">
              <div class="delete-container">
                <img
                  src="https://i.imgur.com/puB9wJ7.png"
                  class="delete-icon"
                  alt=""
                />
              </div>
            </div>
          </div>
        </router-link>
        <router-link to="/tweets/:id" class="user-tweet">
          <div class="tweet-list-container">
            <div class="profile-image">
              <img
                src="https://i.imgur.com/W2nxio3.png"
                class="user-img"
                alt=""
              />
            </div>
            <div class="tweet">
              <div class="tweet-info">
                <router-link to="/users/:id" class="user-name-link">
                  <div class="user-name">username</div>
                </router-link>
                <div class="user-account">@12345</div>
                <div class="create-time">．3天前</div>
              </div>
              <div class="tweet-content">
                jiejwir2irj 2r ij2oij ri2j roir32ro 23j poj p jpj 24po jri24j
                iowr 23rko24k opt42okt; k4;otk;o4 k2;okt;o2 k;t4k2 ;otk;24o k;
                iowr 23rko24k opt42okt; k4;otk;o4 k2;okt;o2 k;t4k2 ;otk;24o k;
                iowr 23rko24k opt42okt; k4;otk;o4 k2;okt;o2 k;t4k2 ;otk;24o k;
                iowr 23rko24k opt42okt; k4;otk;o4 k2;okt;o2 k;t4k2 ;otk;24o k;
                iowr 23rko24k opt42okt; k4;otk;o4 k2;okt;o2 k;t4k2 ;otk;24o k;
                iowr 23rko24k opt42okt; k4;otk;o4 k2;okt;o2 k;t4k2 ;otk;24o k;
                iowr 23rko24k opt42okt; k4;otk;o4 k2;okt;o2 k;t4k2 ;otk;24o k;
              </div>
            </div>
            <div class="delete-tweet">
              <div class="delete-container">
                <img
                  src="https://i.imgur.com/puB9wJ7.png"
                  class="delete-icon"
                  alt=""
                />
              </div>
            </div>
          </div>
        </router-link>
        <router-link to="/tweets/:id" class="user-tweet">
          <div class="tweet-list-container">
            <div class="profile-image">
              <img
                src="https://i.imgur.com/W2nxio3.png"
                class="user-img"
                alt=""
              />
            </div>
            <div class="tweet">
              <div class="tweet-info">
                <router-link to="/users/:id" class="user-name-link">
                  <div class="user-name">username</div>
                </router-link>
                <div class="user-account">@12345</div>
                <div class="create-time">．3天前</div>
              </div>
              <div class="tweet-content">
                jiejwir2irj 2r ij2oij ri2j roir32ro 23j poj p jpj 24po jri24j
                iowr 23rko24k opt42okt; k4;otk;o4 k2;okt;o2 k;t4k2 ;otk;24o k;
                iowr 23rko24k opt42okt; k4;otk;o4 k2;okt;o2 k;t4k2 ;otk;24o k;
                iowr 23rko24k opt42okt; k4;otk;o4 k2;okt;o2 k;t4k2 ;otk;24o k;
                iowr 23rko24k opt42okt; k4;otk;o4 k2;okt;o2 k;t4k2 ;otk;24o k;
                iowr 23rko24k opt42okt; k4;otk;o4 k2;okt;o2 k;t4k2 ;otk;24o k;
                iowr 23rko24k opt42okt; k4;otk;o4 k2;okt;o2 k;t4k2 ;otk;24o k;
                iowr 23rko24k opt42okt; k4;otk;o4 k2;okt;o2 k;t4k2 ;otk;24o k;
              </div>
            </div>
            <div class="delete-tweet">
              <div class="delete-container">
                <img
                  src="https://i.imgur.com/puB9wJ7.png"
                  class="delete-icon"
                  alt=""
                />
              </div>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>


<script>
import Sidebar from "./../components/Sidebar";
export default {
  components: {
    Sidebar,
  },
  data() {
    return {
      isAdmin: true,
    };
  },
  methods: {},
};
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
}
.admin-tweets {
  width: auto;
  height: 100%;
  flex: 1;
  border-left: 1px solid #e6ecf0;
}

.admin-tweets-title {
  font-size: 18px;
  font-weight: 700;
  width: auto;
  height: 55px;
  border: 1px solid #e6ecf0;
}
.admin-tweets-title p {
  line-height: 55px;
  margin-left: 15px;
}

/* tweewts */

.user-tweet {
  width: auto;
  height: auto;
}
.tweet-list-container {
  width: auto;
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
  width: 902px;
  height: auto;
  flex: 1;
  font-size: 15px;
  font-weight: 500;
  margin-bottom: 20px;
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
.delete-tweet {
  width: auto;
  flex: 1;
  margin-left: 90px;
  position: relative;
}
.delete-container:hover {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background: rgb(192, 192, 192, 0.3);
}
.delete-icon {
  width: 24px;
  height: 24px;
  position: absolute;
  top: 4.6px;
  left: 6px;
}
</style>