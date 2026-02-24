<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 自动提取所有 Day 路由生成导航链接
const navLinks = computed(() => {
  return router.getRoutes()
    .filter(route => route.name?.toString().startsWith('Day'))
    .sort((a, b) => {
      const aNum = parseInt(a.name?.toString().replace('Day', '') || '0')
      const bNum = parseInt(b.name?.toString().replace('Day', '') || '0')
      return aNum - bNum
    })
    .map(route => ({
      name: route.name?.toString() || '',
      path: route.path,
      label: route.name?.toString() || ''
    }))
})
</script>

<template>
  <div id="app">
    <!-- 导航栏 -->
    <nav class="navbar">
      <div class="nav-container">
        <h1 class="nav-title">学习进度</h1>
        <div class="nav-links">
          <router-link
            v-for="link in navLinks"
            :key="link.name"
            :to="link.path"
            class="nav-link"
          >
            {{ link.label }}
          </router-link>
        </div>
      </div>
    </nav>

    <!-- 路由出口 -->
    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<style scoped>
#app {
  width: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: 100vh;
}

.navbar {
  background-color: #2c3e50;
  padding: 1rem 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-title {
  color: white;
  font-size: 1.5rem;
  margin: 0;
}

.nav-links {
  display: flex;
  gap: 1.5rem;
}

.nav-link {
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.nav-link:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.nav-link.router-link-active {
  background-color: #42b883;
}

.main-content {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 2rem;
}
</style>
