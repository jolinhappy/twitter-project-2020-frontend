<template>
  <div id="twitter">
    <main role="main" class="main">
      <router-view />
    </main>
  </div>
</template>

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
  height: 100%;
}
.main {
  width: 100%;
  height: 100%;
  display: flex;
  margin: 0 auto;
}

/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
} */
</style>
