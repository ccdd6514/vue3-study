import { createRouter, createWebHistory } from 'vue-router'

// 自动导入 views 目录下所有 Day 开头的 .vue 文件
const modules = import.meta.glob('../views/Day*.vue')

// 生成路由配置
const dayRoutes = Object.keys(modules).map(path => {
  // 从路径中提取文件名,如 '../views/Day1.vue' -> 'Day1'
  const componentName = path.match(/\/Day(\d+)\.vue$/)?.[1] || ''
  const routeName = `Day${componentName}`
  const routePath = `/day${componentName}`

  return {
    path: routePath,
    name: routeName,
    component: modules[path] // 使用动态导入
  }
}).sort((a, b) => {
  // 按 Day 数字排序
  const aNum = parseInt(a.name.replace('Day', ''))
  const bNum = parseInt(b.name.replace('Day', ''))
  return aNum - bNum
})

const routes = [
  {
    path: '/',
    name: 'Home',
    redirect: dayRoutes.length > 0 ? dayRoutes[0].path : '/day1'
  },
  ...dayRoutes
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
