import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/views/Home.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { path: '/404', component: () => import('@/views/NotFound.vue') },
    { path: '*', redirect: '/404' },
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/views/About.vue')
    },
    {
      path: '/github',
      name: 'github',
      component: () => import('@/views/GitHub.vue')
    },
    {
      path: '/blog',
      name: 'blog',
      component: () => import('@/views/Blog.vue')
    }
  ]
})

export default router
