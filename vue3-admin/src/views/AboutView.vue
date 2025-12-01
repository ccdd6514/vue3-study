<template>
  <div class="about">
    <h1>关于页面</h1>

    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>项目技术栈</span>
        </div>
      </template>

      <div class="tech-stack">
        <el-collapse>
          <el-collapse-item title="前端框架" name="1">
            <div>
              <el-tag type="success">Vue 3.4+</el-tag>
              <el-tag type="success">Composition API</el-tag>
              <el-tag type="info">&lt;script setup&gt; 语法糖</el-tag>
            </div>
          </el-collapse-item>

          <el-collapse-item title="类型系统" name="2">
            <div>
              <el-tag type="success">TypeScript 5.0+</el-tag>
              <el-tag type="info">完整类型支持</el-tag>
            </div>
          </el-collapse-item>

          <el-collapse-item title="状态管理" name="3">
            <div>
              <el-tag type="success">Pinia 2.0+</el-tag>
              <el-tag type="info">Vuex 的继任者</el-tag>
              <el-tag type="info">更轻量、更直观</el-tag>
            </div>
          </el-collapse-item>

          <el-collapse-item title="路由管理" name="4">
            <div>
              <el-tag type="success">Vue Router 4</el-tag>
              <el-tag type="info">声明式路由</el-tag>
              <el-tag type="info">路由守卫</el-tag>
            </div>
          </el-collapse-item>

          <el-collapse-item title="HTTP 客户端" name="5">
            <div>
              <el-tag type="success">Axios</el-tag>
              <el-tag type="info">请求/响应拦截器</el-tag>
              <el-tag type="info">TypeScript 支持</el-tag>
            </div>
          </el-collapse-item>

          <el-collapse-item title="UI 组件库" name="6">
            <div>
              <el-tag type="success">Element Plus</el-tag>
              <el-tag type="info">Vue 3 组件库</el-tag>
              <el-tag type="info">丰富组件</el-tag>
            </div>
          </el-collapse-item>

          <el-collapse-item title="构建工具" name="7">
            <div>
              <el-tag type="success">Vite 5.0+</el-tag>
              <el-tag type="info">极速热更新</el-tag>
              <el-tag type="info">ESBuild 打包</el-tag>
            </div>
          </el-collapse-item>

          <el-collapse-item title="滚动插件" name="8">
            <div>
              <el-tag type="success">Better Scroll</el-tag>
              <el-tag type="info">高性能滚动</el-tag>
              <el-tag type="info">移动端优化</el-tag>
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
    </el-card>

    <el-card class="box-card" style="margin-top: 20px;">
      <template #header>
        <div class="card-header">
          <span>功能特性</span>
        </div>
      </template>

      <el-descriptions :column="2" border>
        <el-descriptions-item label="类型安全">
          <el-tag type="success">完整支持</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="状态管理">
          <el-tag type="success">Pinia</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="路由管理">
          <el-tag type="success">Vue Router</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="HTTP 请求">
          <el-tag type="success">Axios</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="UI 组件">
          <el-tag type="success">Element Plus</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="滚动优化">
          <el-tag type="success">Better Scroll</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="构建工具">
          <el-tag type="success">Vite</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="开发体验">
          <el-tag type="success">极速热更新</el-tag>
        </el-descriptions-item>
      </el-descriptions>
    </el-card>
  </div>
</template>

<script setup lang="ts">
// 关于页面的逻辑
</script>

<style scoped>
.about {
  padding: 20px;
}

.box-card {
  margin-bottom: 20px;
}

.card-header {
  display: flex;
  justify-content: center;
  font-weight: bold;
  font-size: 16px;
}

.tech-stack {
  padding: 10px;
}

.el-collapse {
  border: none;
}

.el-tag {
  margin: 5px;
}
</style>
