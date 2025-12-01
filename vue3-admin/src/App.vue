<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useCounterStore } from '@/stores/counter'
import { onMounted } from 'vue'
import { ElMessage } from 'element-plus'

// 使用 Pinia store
const counterStore = useCounterStore()

onMounted(() => {
  console.log('项目已初始化')
  ElMessage.success('欢迎使用 Vue3 + TypeScript + Pinia + Element Plus 项目模板！')
})
</script>

<template>
  <div id="app">
    <!-- 导航栏 -->
    <el-container>
      <el-header height="60px">
        <div class="nav-container">
          <div class="logo">
            <img src="/vite.svg" alt="Logo" />
            <span>Vue3 项目模板</span>
          </div>
          <el-menu mode="horizontal" :default-active="$route.path" router background-color="#545c64" text-color="#fff"
            active-text-color="#ffd04b">
            <el-menu-item index="/">
              <el-icon>
                <HomeFilled />
              </el-icon>
              <span>首页</span>
            </el-menu-item>
            <el-menu-item index="/about">
              <el-icon>
                <InfoFilled />
              </el-icon>
              <span>关于</span>
            </el-menu-item>
          </el-menu>
        </div>
      </el-header>

      <el-main>
        <RouterView />
      </el-main>
    </el-container>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  position: relative;
  width: 100%;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

.el-container {
  min-height: 100vh;
}

.el-header {
  background-color: #545c64;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  margin: 0 auto;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #fff;
  font-size: 20px;
  font-weight: bold;
}

.logo img {
  height: 32px;
}

.el-menu {
  border-bottom: none;
}

.el-main {
  background-color: #f0f2f5;
  padding: 20px;
  margin: 0 auto;
  width: 100%;
}

.el-footer {
  background-color: #fff;
  text-align: center;
  line-height: 60px;
  border-top: 1px solid #e6e6e6;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
}

.footer-content p {
  color: #666;
  font-size: 14px;
}
</style>
