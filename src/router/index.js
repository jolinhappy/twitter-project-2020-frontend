import Vue from 'vue'
import VueRouter from 'vue-router'
import UserLogin from '../views/UserLogin.vue'
import NotFound from '../views/NotFound.vue'
import store from './../store/index'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'root',
    redirect: '/login'
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
    name: 'user-followers',
    component: () => import('../views/UserFollowers.vue')
  },
  {
    path: '/admin/login',
    name: 'admin-login',
    component: () => import('../views/AdminLogin.vue')
  },
  {
    path: '/admin/tweets',
    name: 'admin-tweets',
    component: () => import('../views/AdminTweets.vue')
  },
  {
    path: '/admin/users',
    name: 'admin-users',
    component: () => import('../views/AdminUsers.vue')
  },
  {
    path: '*',
    name: 'not-found',
    component: NotFound
  }
]

const router = new VueRouter({
  linkExactActiveClass: 'active',
  routes
})

router.beforeEach(async (to, from, next) => {
  console.log('from', from)
  const token = localStorage.getItem('token')
  const tokenInStore = store.state.token
  let isAuthenticated = store.state.isAuthenticated
  console.log(isAuthenticated)
  //如果本地token和store裡面的token不同，重新用getCurrentUserAPI驗證身分
  if (token && token !== tokenInStore) {
    isAuthenticated = await store.dispatch('fetchCurrentUser')
  }
  const isAdmin = store.state.currentUser.isAdmin
  const pathWithoutAuthentication = ['user-login', 'user-regist', 'admin-login']
  const pathNeedAdmin = ['admin-users', 'admin-tweets']
  const pathAdminCanReach = ['user-login', 'user-regist', 'admin-login', 'admin-users', 'admin-tweets']


  //未驗證且想要進入登入註冊頁以外的頁面的情況
  if (!isAuthenticated && !pathWithoutAuthentication.includes(to.name)) {
    next('/login')
    return
  }
  //有管理者權限想到前台或非登入口頁面一律導向登入口
  if (isAdmin && !pathAdminCanReach.includes(to.name)) {
    next('/login')
    return
  }
  //沒有管理者權限想前往後台一率導向錯誤頁面
  if (!isAdmin && pathNeedAdmin.includes(to.name)) {
    next('*')
    return
  }

  //已經驗證，且為一般使用者，但又往登入頁及註冊頁移動一率導回首頁
  if (isAuthenticated && !isAdmin && pathWithoutAuthentication.includes(to.name)) {
    next('/tweets')
    return
  }
  //已經驗證，且為管理者，但又往登入頁及註冊頁移動一率導回首頁
  if (isAuthenticated && isAdmin && pathWithoutAuthentication.includes(to.name)) {
    next('/admin/tweets')
    return
  }

  next()
})




export default router
