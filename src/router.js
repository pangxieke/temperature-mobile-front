import Vue from 'vue'
import VueRouter from 'vue-router'
import { Toast } from 'vant'

const Login = () => import(/* webpackChunkName: "login" */ './views/Login')
const Me = () => import(/* webpackChunkName: "me" */ './views/Me')
const NotFound = () => import(/* webpackChunkName: "error" */ './views/NotFound')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/me'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { title: '登 录' }
  },
  {
    path: '/me',
    name: 'Me',
    component: Me,
    meta: {
      requiresAuth: true,
      title: '体温轨迹'
    }
  },
  {
    path: '*',
    name: 'NotFound',
    component: NotFound,
    meta: { title: '404' }
  }
]

const router = new VueRouter({
  routes,
  mode: 'history',
  base: process.env.BASE_URL
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    if (!localStorage.getItem('token')) {
      Toast.fail('用户信息已过期，请重新登录')
      next('/login')
    }
  }

  next()
})

router.afterEach(to => {
  document.title = to.meta.title
})

export default router
