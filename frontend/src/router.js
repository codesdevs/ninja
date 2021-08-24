const Index = () => import('@/views/index.vue')
const Login = () => import('@/views/login.vue')
import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: Index
  },
  {
    path: '/login',
    component: Login
  },
]

// const router = createRouter({
//   mode: 'history',
//   routes,
// })

// const router = new VueRouter({
//   mode:'history',
//   history: createWebHashHistory(process.env.BASE_URL),
//   routes
// })



const router = new createRouter({
  mode: 'history',
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

// router.beforeEach((to, from, next) => {
//   if (!localStorage.getItem('eid') && to.path !== '/login')
//     next({ path: '/login' })
//   else next()
// })

export default router
