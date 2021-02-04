import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'
import Wall from '../views/Wall.vue'
import About from '../views/About.vue'
import Account from '../views/Account.vue'
import store from '../store'

Vue.use(VueRouter)

const ifAuthenticated = (to, from, next) => {
  if (store.state.auth.status.loggedIn) {
    next()
    return
  }
  next('/')
}

const ifNotAuthenticated = (to, from, next) => {
  if (!store.state.auth.status.loggedIn) {
    next()
    return
  }
  next('/wall')
}

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: ifNotAuthenticated
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    beforeEnter: ifNotAuthenticated
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/wall',
    name: 'Wall',
    component: Wall,
    beforeEnter: ifAuthenticated
  },
  {
    path: '/account',
    name: 'Account',
    component: Account,
    beforeEnter: ifAuthenticated
  },
  {
    path: '/about',
    name: 'About',
    component: About
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    //component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
