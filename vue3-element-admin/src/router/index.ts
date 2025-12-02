import { createRouter, createWebHistory } from 'vue-router'

// 引入组件
import Day1 from '../views/Day1.vue'
import Day2 from '../views/Day2.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    redirect: '/day1'
  },
  {
    path: '/day1',
    name: 'Day1',
    component: Day1
  },
  {
    path: '/day2',
    name: 'Day2',
    component: Day2
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
