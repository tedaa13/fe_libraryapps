//import vue router
import { createRouter, createWebHistory } from 'vue-router'

//define a routes
const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import( /* webpackChunkName: "home" */ '@/views/index.vue')
  },
  {
    path: '/posts',
    name: 'posts.index',
    component: () => import( /* webpackChunkName: "post.index" */ '@/views/posts/index.vue')
  },
  {
    path: '/posts/create',
    name: 'posts.create',
    component: () => import( /* webpackChunkName: "post.create" */ '@/views/posts/create.vue')
  },
  {
    path: '/posts/edit/:id',
    name: 'posts.edit',
    component: () => import( /* webpackChunkName: "post.edit" */ '@/views/posts/edit.vue')
  },
  {
    path: '/users',
    name: 'users.index',
    component: () => import( /* webpackChunkName: "post.edit" */ '@/views/users/index.vue')
  },
  {
    path: '/users/create',
    name: 'users.create',
    component: () => import( /* webpackChunkName: "post.create" */ '@/views/users/create.vue')
  },
  {
    path: '/users/edit/:id',
    name: 'users.edit',
    component: () => import( /* webpackChunkName: "post.edit" */ '@/views/users/edit.vue')
  },
  {
    path: '/transactions/create',
    name: 'transactions.create',
    component: () => import( /* webpackChunkName: "post.edit" */ '@/views/transactions/create.vue')
  }
]

//create router
const router = createRouter({
  history: createWebHistory(),
  routes  // config routes
})

export default router;