# Vue 3 + TypeScript + Pinia + Router + Axios + Element Plus + Better Scroll

这是一个基于 Vue 3 生态系统的现代化前端项目模板，集成了最常用的开发工具和库。

## 技术栈

- **Vue 3** - 组合式 API
- **TypeScript** - 类型安全
- **Pinia** - 状态管理
- **Vue Router 4** - 路由管理
- **Axios** - HTTP 客户端
- **Element Plus** - UI 组件库
- **Better Scroll** - 高性能滚动插件
- **Vite** - 快速构建工具

## 项目结构

```
src/
├── api/                # HTTP 请求
│   ├── request.ts      # Axios 实例
│   └── user.ts         # 用户 API
├── components/         # Vue 组件
│   ├── HelloWorld.vue
│   └── BetterScrollDemo.vue  # Better Scroll 示例
├── router/             # 路由配置
│   └── index.ts
├── stores/             # Pinia 状态管理
│   └── counter.ts      # 计数器示例
├── types/              # TypeScript 类型声明
│   └── pinia.d.ts
├── views/              # 页面组件
│   ├── HomeView.vue
│   └── AboutView.vue
├── assets/             # 静态资源
├── App.vue            # 根组件
├── main.ts            # 应用入口
└── style.css          # 全局样式
```

## 快速开始

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

服务器将在 http://localhost:5173/ 启动

### 构建生产版本

```bash
npm run build
```

### 预览生产版本

```bash
npm run preview
```

## Pinia 使用示例

### 创建 Store

```typescript
// src/stores/counter.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)

  function increment() {
    count.value++
  }

  function decrement() {
    count.value--
  }

  function reset() {
    count.value = 0
  }

  return {
    count,
    doubleCount,
    increment,
    decrement,
    reset
  }
})
```

### 在组件中使用

```vue
<script setup lang="ts">
import { useCounterStore } from '@/stores/counter'

const counterStore = useCounterStore()

// 使用 store
counterStore.increment()
</script>

<template>
  <div>
    <p>计数器: {{ counterStore.count }}</p>
    <p>双倍值: {{ counterStore.doubleCount }}</p>
    <button @click="counterStore.increment()">+1</button>
  </div>
</template>
```

## Axios 使用示例

### 创建 API 请求

```typescript
// src/api/request.ts
import axios from 'axios'

const request = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
  timeout: 10000
})

// 请求/响应拦截器已配置

export default request
```

```typescript
// src/api/user.ts
import request from './request'

export function getUserList() {
  return request.get('/users')
}

export function login(data: { username: string; password: string }) {
  return request.post('/login', data)
}
```

## Vue Router 使用示例

```typescript
// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/HomeView.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
```

```vue
<!-- 在组件中使用 -->
<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <RouterLink to="/">首页</RouterLink>
  <RouterView />
</template>
```

## Better Scroll 使用示例

```vue
<!-- src/components/BetterScrollDemo.vue -->
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import BScroll from 'better-scroll'

const scrollContainer = ref<HTMLElement | null>(null)
let scroll: BScroll | null = null

onMounted(() => {
  if (scrollContainer.value) {
    scroll = new BScroll(scrollContainer.value, {
      scrollY: true,
      click: true
    })
  }
})
</script>

<template>
  <div ref="scrollContainer" class="scroll-content">
    <!-- 内容 -->
  </div>
</template>
```

## 环境变量

创建 `.env` 文件（参考 `.env.example`）：

```env
VITE_API_BASE_URL=http://localhost:3000/api
VITE_DEV_MODE=true
```

## 参考资源

- [Vue 3 文档](https://vuejs.org/)
- [TypeScript 文档](https://www.typescriptlang.org/)
- [Pinia 文档](https://pinia.vuejs.org/)
- [Vue Router 文档](https://router.vuejs.org/)
- [Axios 文档](https://axios-http.com/)
- [Element Plus 文档](https://element-plus.org/)
- [Better Scroll 文档](https://better-scroll.github.io/docs/)
- [Vite 文档](https://vitejs.dev/)
