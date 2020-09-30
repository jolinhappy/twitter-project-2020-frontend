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
    component: () => import('../views/Home.vue')
  },
  {
    path: '/tweets/:id',
    name: 'tweet',
    component: () => import('../views/Tweet.vue')
  },
  {
    path: '/setting',
    name: 'account-setting',
    component: () => import('../views/UserAccountSetting.vue')
  },
  {
    path: '/users/:id/replies',
    name: 'user-replies',
    component: () => import('../views/UserProfileReply')
  },
  {
    path: '/users/:id/likes',
    name: 'user-likes',
    component: () => import('../views/UserProfileLike.vue')
  },
  {
    path: '/users/:id',
    name: 'user-profile',
    component: () => import('../views/UserProfile.vue')
  },
  {
    path: '/users/:id/followings',
    name: 'user-followings',
    component: () => import('../views/UserFollowings.vue')
  },
  {
    path: '/users/:id/followers',
    name: 'user-followings',
    component: () => import('../views/UserFollowers.vue')
  },
  {
    path: '/users/admin/login',
    name: 'admin-login',
    component: () => import('../views/AdminLogin.vue')
  },
]

const router = new VueRouter({
  linkExactActiveClass: 'active',
  routes
})

export default router
