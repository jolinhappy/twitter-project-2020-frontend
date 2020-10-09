import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import io from 'socket.io-client';
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import vue from 'vue'
import VueChatScroll from 'vue-chat-scroll'

vue.use(VueChatScroll)
// const socket = io('https://simple-twitter-project.herokuapp.com');
// Vue.prototype.$socket = socket;


library.add(fas);
Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
