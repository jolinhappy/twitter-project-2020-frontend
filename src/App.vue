<template>
  <div id="twitter">
    <main role="main" class="main">
      <router-view v-if="isReload" />
    </main>
  </div>
</template>

<script>
export default {
  provide() {
    return {
      reload: this.reload,
    };
  },
  data() {
    return {
      isReload: true,
    };
  },
  methods: {
    reload() {
      this.isReload = false;
      this.$nextTick(() => {
        this.isReload = true;
      });
    },
  },
};
</script>

<style>
html,
body {
  width: 100%;
  height: 100%;
}
body {
  background-color: #ffffff;
  font-family: "Noto Sans TC", sans-serif; /* 設定字型 */
  font-size: 1rem;
  line-height: 1.4;
  margin: 0;
  color: #2a2a2a;
}

h1,
h2,
h3,
h4,
h5,
h6,
p {
  margin: 0px;
  padding: 0px;
}

ul,
ol,
li {
  list-style: none;
  margin: 0px;
  padding: 0px;
}

a,
a:hover,
a:focus {
  text-decoration: none;
  color: unset;
}

img {
  width: 100%;
  height: 100%;
  display: block;
}

.btn,
button,
button:focus,
input:focus,
textarea:focus,
select,
select:focus,
a:focus {
  outline: 0px !important;
}

button {
  background-color: transparent;
  border: 0;
  cursor: pointer;
}

button[disabled] {
  pointer-events: none;
}

input {
  padding: 0;
}

input:required {
  box-shadow: none;
}

input:invalid {
  box-shadow: none;
}

#twitter {
  width: 100%;
  height: auto;
  display: flex;
}

.main {
  width: 100%;
  height: auto;
  margin: 0 auto;
}
.user-img {
  object-fit: cover;
}
</style>
