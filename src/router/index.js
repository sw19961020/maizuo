import Vue from 'vue'
import VueRouter from 'vue-router'
import Center from '../views/Center.vue'
import Cinema from '../views/Cinema.vue'
import Search from '../views/Search.vue'
import Film from '../views/Film.vue'
import Login from '../views/Login.vue'
import Detail from '../views/Detail.vue'
import City from '../views/City.vue'
import Comingsoon from '../views/film/Comingsoon.vue'
import Nowplaying from '../views/film/Nowplaying.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/center',
    component: Center
  },
  {
    path: '/detail:id',
    component: Detail
  },
  {
    path: '/city',
    component: City
  },
  {
    path: '/film',
    component: Film,
    children: [
      {
        path: '/film/comingsoon',
        component: Comingsoon
      },
      {
        path: '/film/nowplaying',
        component: Nowplaying
      },
      {
        path: '',
        redirect: '/film/nowplaying'
      }
    ]
  },
  {
    path: '/cinema',
    component: Cinema
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/cinema/search',
    component: Search
  },
  {
    path: '*',
    redirect: '/film'
  }
]

const router = new VueRouter({
  mode: 'history', // 一种模式另一种是hash
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => { // 全局守卫
  const aupath = ['/center']
  if (aupath.includes(to.fullPath)) {
    if (!localStorage.getItem('username')) {
      next('/login')
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
