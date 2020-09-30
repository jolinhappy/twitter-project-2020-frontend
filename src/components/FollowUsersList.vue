<template>
  <div class="users-list">
    <router-link to="/tweets/:id" class="user-profile-link">
      <div class="users-list-container">
        <div class="profile-image">
          <img src="https://i.imgur.com/W2nxio3.png" class="user-img" alt="" />
        </div>
        <div class="user">
          <div class="user-info">
            <div class="user-name">
              <router-link to="/users/:id" class="user-name-link">
                <div class="name">username</div>
              </router-link>
              <div class="user-account">@12345</div>
            </div>
            <div class="follow-btn">
              <button type="button" class="followed">正在跟隨</button>
            </div>
          </div>
          <div class="user-description">
            jiejwir2irj 2r ij2oij ri2j roir32ro 23j poj p jpj 24po jri24j
            23rko24k opt42okt; k4;otk;o4 k2;okt;o2 k;t4k2 ;otk;24o k; iowr
            23rko24k opt42okt; k4;otk;o4 k2;okt;o2 k;t4k2 ;otk;24o k; iowr
            23rko24k opt42okt; k4;otk;o4 k2;okt;o2 k;t4k2 ;otk;24o k;
          </div>
        </div>
      </div>
    </router-link>

    <router-link to="/tweets/:id" class="user-profile-link">
      <div class="users-list-container">
        <div class="profile-image">
          <img src="https://i.imgur.com/W2nxio3.png" class="user-img" alt="" />
        </div>
        <div class="user">
          <div class="user-info">
            <div class="user-name">
              <router-link to="/users/:id" class="user-name-link">
                <div class="name">username</div>
              </router-link>
              <div class="user-account">@12345</div>
            </div>
            <div class="follow-btn">
              <button type="button" class="followed">正在跟隨</button>
            </div>
          </div>
          <div class="user-description">
            jiejwir2irj 2r ij2oij ri2j roir32ro 23j poj p jpj 24po jri24j
            23rko24k opt42okt; k4;otk;o4 k2;okt;o2 k;t4k2 ;otk;24o k; iowr
            23rko24k opt42okt; k4;otk;o4 k2;okt;o2 k;t4k2 ;otk;24o k; iowr
            23rko24k opt42okt; k4;otk;o4 k2;okt;o2 k;t4k2 ;otk;24o k;
          </div>
        </div>
      </div>
    </router-link>
    <router-link to="/tweets/:id" class="user-profile-link">
      <div class="users-list-container">
        <div class="profile-image">
          <img src="https://i.imgur.com/W2nxio3.png" class="user-img" alt="" />
        </div>
        <div class="user">
          <div class="user-info">
            <div class="user-name">
              <router-link to="/users/:id" class="user-name-link">
                <div class="name">username</div>
              </router-link>
              <div class="user-account">@12345</div>
            </div>
            <div class="follow-btn">
              <button type="button" class="followed">正在跟隨</button>
            </div>
          </div>
          <div class="user-description">
            jiejwir2irj 2r ij2oij ri2j roir32ro 23j poj p jpj 24po jri24j
            23rko24k opt42okt; k4;otk;o4 k2;okt;o2 k;t4k2 ;otk;24o k; iowr
            23rko24k opt42okt; k4;otk;o4 k2;okt;o2 k;t4k2 ;otk;24o k; iowr
            23rko24k opt42okt; k4;otk;o4 k2;okt;o2 k;t4k2 ;otk;24o k;
          </div>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.user-profile-link {
  width: 600px;
  height: auto;
}
.users-list-container {
  width: 600px;
  height: auto;
  border: 1px solid #e6ecf0;
  display: flex;
  padding: 10px 0;
}
.user-info {
  display: flex;
  justify-content: space-between;
}
.user-name {
  display: flex;
  flex-direction: column;
}
.name {
  font-size: 15px;
  font-weight: bold;
  margin-right: 10px;
}
.user-name-link:hover {
  text-decoration: underline;
}
.user-account {
  font-size: 15px;
  font-weight: 500;
  color: #657786;
}
.user {
  display: flex;
  flex-direction: column;
}
.user-description {
  width: 510px;
  height: auto;
  flex: 1;
  font-size: 15px;
  font-weight: 500;
  margin-top: 5px;
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
</style>