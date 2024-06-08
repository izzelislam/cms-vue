import { createRouter, createWebHistory } from 'vue-router'

import Home from '../pages/front-page/home.vue'
import LoginPage from '../pages/admin-page/login-page/login-page.vue'
import DashboardPage from '../pages/admin-page/dashboard-page/index.vue'

import userRoute from './user.js'
import categoryRoute from './category.js'
import articleRoute from './article.js'
import commentRoute from './comment.js'
import { auth, gues } from '../midleware/auth.js'


const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../components/home-layout.vue'),
    beforeEnter : gues,
    children: [
      {
        path: '',
        name: 'Home',
        component: Home
      },
      {
        path: 'article',
        name: 'Article',
        component: () => import('../pages/front-page/article.vue')
      },
      {
        path: 'about',
        name: 'About',
        component: () => import('../pages/front-page/about.vue')
      },
      // article with parameter
      {
        path: 'article/:id',
        name: 'ArticleDetail',
        component: () => import('../pages/front-page/detail.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage,
    beforeEnter : gues
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('../components/admin-layout.vue'),
    beforeEnter : auth
    ,
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: DashboardPage
      },
      {
        path: 'setting',
        name: 'setting',
        component: () => import('../pages/admin-page/setting-page/index.vue')
      },
      userRoute,
      categoryRoute,
      articleRoute,
      commentRoute
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router