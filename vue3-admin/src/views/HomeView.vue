<template>
  <div class="home">

    <!-- Element Plus 组件示例 -->
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>Element Plus 组件示例</span>
        </div>
      </template>

      <div class="demo-section">
        <h3>计数器 (Pinia + Element Plus)</h3>
        <div class="counter-wrapper">
          <el-button @click="counterStore.decrement()" :disabled="counterStore.count <= 0">-</el-button>
          <span class="count">{{ counterStore.count }}</span>
          <el-button type="primary" @click="counterStore.increment()">+</el-button>
        </div>
        <p>双倍值: {{ counterStore.doubleCount }}</p>
        <el-button type="danger" @click="counterStore.reset()">重置</el-button>
      </div>

      <el-divider />

      <div class="demo-section">
        <h3>消息提示</h3>
        <el-button @click="showMessage">显示消息</el-button>
        <el-button type="success" @click="showSuccess">成功消息</el-button>
        <el-button type="warning" @click="showWarning">警告消息</el-button>
        <el-button type="danger" @click="showError">错误消息</el-button>
      </div>

      <el-divider />

      <div class="demo-section">
        <h3>Element Plus 其他组件</h3>
        <el-tag>标签一</el-tag>
        <el-tag type="success">标签二</el-tag>
        <el-tag type="info">标签三</el-tag>
        <el-tag type="warning">标签四</el-tag>
        <el-tag type="danger">标签五</el-tag>
      </div>

      <el-divider />

      <div class="demo-section">
        <h3>数据展示</h3>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="date" label="日期" width="180" />
          <el-table-column prop="name" label="姓名" width="180" />
          <el-table-column prop="address" label="地址" />
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useCounterStore } from '@/stores/counter'
const counterStore = useCounterStore()

const tableData = ref([
  {
    date: '2016-05-02',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1518 弄'
  },
  {
    date: '2016-05-04',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1517 弄'
  },
  {
    date: '2016-05-01',
    name: '王小虎',
    address: '上海市普陀区金沙江路 1519 弄'
  }
])

const showMessage = () => {
  ElMessage('这是一条普通消息')
}

const showSuccess = () => {
  ElMessage.success('这是一条成功消息')
}

const showWarning = () => {
  ElMessage.warning('这是一条警告消息')
}

const showError = () => {
  ElMessage.error('这是一条错误消息')
}
</script>

<style scoped>
.home {
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

.demo-section {
  margin: 20px 0;
}

.demo-section h3 {
  margin-bottom: 15px;
  color: #409eff;
}

.counter-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  margin: 20px 0;
}

.count {
  font-size: 24px;
  font-weight: bold;
  min-width: 60px;
  text-align: center;
}

.el-tag {
  margin: 5px;
}
</style>
