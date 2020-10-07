<template>
  <div class="profile-edit-modal">
    <div class="modal-container">
      <div class="modal-box">
        <form
          action=""
          class="profile-edit-form"
          @submit.stop.prevent="handleSubmit"
        >
          <div class="cancel-edit">
            <img
              src="https://i.imgur.com/qd4MrVa.png"
              class="cancel-icon"
              alt="cancel"
              @click="clickToClose"
            />
            <div class="edit-title">編輯個人資料</div>
            <button type="submit" class="btn save-btn">儲存</button>
          </div>
          <div class="profile-content">
            <div class="edit-icons">
              <label for="cover-upload-input"
                ><img
                  src="https://i.imgur.com/1svGcJ4.png"
                  class="photo-icon"
                  alt=""
                />
                <input
                  type="file"
                  id="cover-upload-input"
                  name="cover"
                  accept="image/*"
                  @change="handleCoverChange"
                />
              </label>

              <label for="cover-delete-input" @click="deleteCover">
                <img
                  src="https://i.imgur.com/VElvsCz.png"
                  class="delete-icon"
                  alt=""
                />
              </label>
            </div>
            <div class="cover-part">
              <img
                :src="user.cover"
                class="cover-img"
                alt="cover"
                v-if="user.cover"
              />
            </div>
            <div class="user-img-part">
              <div class="upload-photo">
                <label for="photo-upload-input">
                  <img
                    src="https://i.imgur.com/1svGcJ4.png"
                    class="upload-photo-icon"
                    alt=""
                  />
                  <input
                    type="file"
                    id="photo-upload-input"
                    accept="image/*"
                    name="avatar"
                    @change="handleAvatarChange"
                  />
                </label>
              </div>
              <img
                :src="user.avatar | emptyImage"
                class="user-main-img"
                alt="user-img"
              />
            </div>
            <div class="detail-edit">
              <div class="form-label-group">
                <label for="name" class="name-label form-label">名稱</label>
                <input
                  type="text"
                  class="form-input name-input"
                  v-model="user.name"
                  name="name"
                  @input="calculateNameInput"
                  required
                />
              </div>
              <div class="name-word-count">{{ nameLength }}/50</div>
              <div class="form-label-group">
                <label for="discription" class="discpription-label form-label"
                  >自我介紹</label
                >
                <input
                  type="text"
                  class="form-input description-input"
                  name="introduction"
                  v-model="user.introduction"
                  @input="calculateIntroductionInput"
                />
              </div>
              <div class="description-word-count">
                {{ introductionLength }}/160
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { emptyImageFilter } from "./../utils/mixins";
export default {
  mixins: [emptyImageFilter],
  props: {
    initialUser: {
      type: Object,
      default: () => {
        return {
          id: -1,
          name: "",
          account: "",
          avatar: "",
          cover: "",
          introduction: "",
        };
      },
    },
  },
  created() {
    this.user = {
      ...this.user,
      ...this.initialUser,
    };
    this.calculateNameInput();
    this.calculateIntroductionInput();
  },
  data() {
    return {
      user: {
        id: -1,
        name: "",
        account: "",
        avatar: "",
        cover: "",
        introduction: "",
      },
      nameLength: 0,
      introductionLength: 0,
    };
  },
  methods: {
    clickToClose() {
      this.$emit("after-click-close-edit");
    },
    handleCoverChange(e) {
      const { files } = e.target;
      if (files === 0) {
        this.user.cover = "";
      } else {
        const coverURL = window.URL.createObjectURL(files[0]);
        this.user.cover = coverURL;
      }
    },
    handleAvatarChange(e) {
      const { files } = e.target;
      if (files === 0) {
        this.user.avatar = "";
      } else {
        const avatarURL = window.URL.createObjectURL(files[0]);
        this.user.avatar = avatarURL;
      }
    },
    deleteCover() {
      this.user.cover = "";
    },
    handleSubmit(e) {
      const form = e.target;
      const formData = new FormData(form);
      this.$emit("after-submit", formData);
    },
    calculateNameInput() {
      const nameLength = this.user.name.length;
      this.nameLength = nameLength;
    },
    calculateIntroductionInput() {
      const introductionLength = this.user.introduction.length;
      this.introductionLength = introductionLength;
    },
  },
};
</script>

<style scoped>
.profile-edit-modal {
  width: 100%;
  height: 2000px;
  background-color: rgba(0, 0, 0, 0.8);
  position: fixed;
  display: flex;
  justify-content: center;
}
.modal-container {
  margin-top: 30px;
  width: 600px;
  height: 654px;
  background-color: white;
  border-radius: 14px;
}
.cancel-edit {
  width: 600px;
  height: 55px;
  border-bottom: 1px solid #e6ecf0;
  display: flex;
}
.cancel-icon {
  width: 24px;
  height: 24px;
  line-height: 40px;
  cursor: pointer;
  margin: auto 15px;
}
.edit-title {
  margin: auto 0;
  font-size: 19px;
  font-weight: bold;
}
.save-btn {
  width: 64px;
  height: 30px;
  background-color: #ff6600;
  border-radius: 100px;
  margin: auto 0;
  margin-left: 350px;
  font-size: 18px;
  font-weight: 500;
  color: #ffffff;
}

.cover-part {
  width: 600px;
  height: 200px;
  display: flex;
  align-items: center;
  position: relative;
  background: #999999;
}
.cover-img {
  width: 600px;
  height: 200px;
  object-fit: cover;
}
.cover-part::after {
  content: "";
  position: absolute;
  width: 600px;
  height: 200px;
  background: rgba(196, 196, 196, 0.4);
}

.user-img-part {
  background: #ffffff;
  width: 130px;
  height: 130px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  position: absolute;
  left: 550px;
  top: 220px;
}
.user-main-img {
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 50%;
  position: relative;
}
.edit-icons {
  display: flex;
  align-items: betwee;
  width: 70px;
  position: absolute;
  top: 180px;
  right: 48%;
  z-index: 50;
}

.photo-icon,
.delete-icon,
.upload-photo-icon {
  width: 20px;
  height: 20px;
  cursor: pointer;
}

.upload-photo-icon:hover {
  transform: scale(1.2, 1.2);
}

.delete-icon:hover {
  transform: scale(1.4, 1.4);
}

.photo-icon:hover {
  transform: scale(1.4, 1.4);
}
.delete-icon {
  margin-left: 30px;
}
.user-img-part::after {
  content: "";
  position: absolute;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: rgba(196, 196, 2196, 0.4);
  z-index: 30;
}
.upload-photo {
  position: absolute;
  top: 45%;
  z-index: 80;
}

.detail-edit {
  width: 570px;
  height: 220px;
  margin: 100px auto 0 auto;
}
.form-label-group {
  width: 570px;
  position: relative;
  background-color: #f5f8fa;
  margin-bottom: 20px;
  border-radius: 4px;
}
.form-input {
  width: 560px;
  height: 35px;
  border-bottom: 1px solid #657786;
  border-top: 0px;
  border-left: 0px;
  border-right: 0px;
  margin-top: 20px;
  padding-left: 10px;
  background-color: transparent;
  font-size: 20px;
}
.form-label {
  width: 60px;
  height: 15px;
  font-size: 15px;
  color: #657786;
  position: absolute;
  top: 6%;
  left: 2%;
}
.name-label {
  margin-top: 5px;
}
.description-input {
  height: 150px;
}
.name-word-count {
  margin-top: -18px;
  margin-left: 540px;
}
.description-word-count {
  margin-top: -18px;
  margin-left: 530px;
}
#cover-upload-input,
#photo-upload-input {
  display: none;
}
</style>
