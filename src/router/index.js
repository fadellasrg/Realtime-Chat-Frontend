import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
// import Friend from '../views/Friend.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
    meta: { auth: false }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: { auth: false }
  },
  // {
  //   path: '/friend',
  //   name: 'Friend',
  //   component: Friend,
  //   meta: { auth: false }
  // },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: { auth: true }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched[0].meta.auth === true) {
    if (store.getters['auth/getToken']) {
      next()
    } else {
      alert('Login required')
      next({
        path: '/'
      })
    }
  } else {
    next()
  }
})

export default router
