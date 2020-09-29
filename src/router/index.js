import Vue from 'vue'
import VueRouter from 'vue-router'
import UserLogin from '../views/UserLogin.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'user-login',
    component: UserLogin
  },
  {
    path: '/login',
    name: 'user-login',
    component: UserLogin
  },
  {
    path: '/regist',
    name: 'user-regist',
    component: () => import('../views/UserRegist.vue')

  },
  {
    path: '/tweets',
    name: 'tweets-home',
    component: () => import('../views/home.vue')
  },
  {
    path: '/tweets/:id',
    name: 'user-profile',
    component: () => import('../views/UserProfile.vue')
  },
  {
    path: '/tweets/:id/replies',
    name: 'user-replies',
    component: () => import('../views/UserProfileReply')
  },
  {
    path: '/tweets/:id/likes',
    name: 'user-likes',
    component: () => import('../views/UserProfileLike.vue')
  },
]

const router = new VueRouter({
  linkExactActiveClass: 'active',
  routes
})

export default router
