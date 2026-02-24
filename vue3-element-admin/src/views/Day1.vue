<template>
  <div class="day-container">
    <h1>Day 1 - Vue3 计数器示例</h1>

    <!-- ref 计数器 -->
    <div class="counter-section">
      <h2>使用 ref 的计数器</h2>
      <div class="counter-display">
        计数值: {{ refCount }}
      </div>
      <div class="counter-controls">
        <button @click="incrementRef">+1</button>
        <button @click="decrementRef">-1</button>
        <button @click="resetRef">重置</button>
      </div>
    </div>

    <!-- reactive 计数器 -->
    <div class="counter-section">
      <h2>使用 reactive 的计数器</h2>
      <div class="counter-display">
        计数值: {{ reactiveState.count }}
      </div>
      <div class="counter-controls">
        <button @click="incrementReactive">+1</button>
        <button @click="decrementReactive">-1</button>
        <button @click="resetReactive">重置</button>
      </div>
    </div>

    <!-- ref 用户信息表单 -->
    <div class="form-section">
      <h2>使用 ref 的用户信息表单</h2>
      <form @submit.prevent="submitRefForm" class="user-form">
        <div class="form-group">
          <label>姓名:</label>
          <input v-model="refUserInfo.name" type="text" placeholder="请输入姓名" required />
        </div>

        <div class="form-group">
          <label>年龄:</label>
          <input v-model.number="refUserInfo.age" type="number" placeholder="请输入年龄" min="1" max="120" required />
        </div>

        <div class="form-group">
          <label>邮箱:</label>
          <input v-model="refUserInfo.email" type="email" placeholder="请输入邮箱" required />
        </div>

        <div class="form-group">
          <h4>地址信息:</h4>
          <div class="nested-fields">
            <input v-model="refUserInfo.address.province" type="text" placeholder="省份" required />
            <input v-model="refUserInfo.address.city" type="text" placeholder="城市" required />
            <input v-model="refUserInfo.address.detail" type="text" placeholder="详细地址" required />
          </div>
        </div>

        <div class="form-group">
          <h4>兴趣爱好:</h4>
          <div class="checkbox-group">
            <label v-for="hobby in hobbies" :key="hobby.value">
              <input type="checkbox" :value="hobby.value" v-model="refUserInfo.hobbies" />
              {{ hobby.label }}
            </label>
          </div>
        </div>

        <button type="submit" class="submit-btn">提交 ref 表单</button>
      </form>
    </div>

    <!-- reactive 用户信息表单 -->
    <div class="form-section">
      <h2>使用 reactive 的用户信息表单</h2>
      <form @submit.prevent="submitReactiveForm" class="user-form">
        <div class="form-group">
          <label>姓名:</label>
          <input v-model="reactiveUserInfo.name" type="text" placeholder="请输入姓名" required />
        </div>

        <div class="form-group">
          <label>年龄:</label>
          <input v-model.number="reactiveUserInfo.age" type="number" placeholder="请输入年龄" min="1" max="120" required />
        </div>

        <div class="form-group">
          <label>邮箱:</label>
          <input v-model="reactiveUserInfo.email" type="email" placeholder="请输入邮箱" required />
        </div>

        <div class="form-group">
          <h4>地址信息:</h4>
          <div class="nested-fields">
            <input v-model="reactiveUserInfo.address.province" type="text" placeholder="省份" required />
            <input v-model="reactiveUserInfo.address.city" type="text" placeholder="城市" required />
            <input v-model="reactiveUserInfo.address.detail" type="text" placeholder="详细地址" required />
          </div>
        </div>

        <div class="form-group">
          <h4>兴趣爱好:</h4>
          <div class="checkbox-group">
            <label v-for="hobby in hobbies" :key="hobby.value">
              <input type="checkbox" :value="hobby.value" v-model="reactiveUserInfo.hobbies" />
              {{ hobby.label }}
            </label>
          </div>
        </div>

        <button type="submit" class="submit-btn">提交 reactive 表单</button>
      </form>
    </div>

    <!-- 表单数据显示 -->
    <div class="display-section">
      <h2>提交的数据</h2>
      <div class="data-display">
        <div class="data-box">
          <h3>ref 表单数据:</h3>
          <pre>{{ JSON.stringify(refUserInfo, null, 2) }}</pre>
        </div>
        <div class="data-box">
          <h3>reactive 表单数据:</h3>
          <pre>{{ JSON.stringify(reactiveUserInfo, null, 2) }}</pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

// ref 计数器
const refCount = ref(0)

function incrementRef() {
  refCount.value++
}

function decrementRef() {
  refCount.value--
}

function resetRef() {
  refCount.value = 0
}

// reactive 计数器
const reactiveState = reactive({
  count: 0
})

function incrementReactive() {
  reactiveState.count++
}

function decrementReactive() {
  reactiveState.count--
}

function resetReactive() {
  reactiveState.count = 0
}

// ref 用户信息表单
const refUserInfo = ref({
  name: '',
  age: 0,
  email: '',
  address: {
    province: '',
    city: '',
    detail: ''
  },
  hobbies: [] as string[]
})

// reactive 用户信息表单
const reactiveUserInfo = reactive({
  name: '',
  age: 0,
  email: '',
  address: {
    province: '',
    city: '',
    detail: ''
  },
  hobbies: [] as string[]
})

// 兴趣爱好选项
const hobbies = [
  { label: '阅读', value: 'reading' },
  { label: '运动', value: 'sports' },
  { label: '音乐', value: 'music' },
  { label: '旅行', value: 'travel' },
  { label: '编程', value: 'coding' }
]

// 表单提交函数
function submitRefForm() {
  console.log('ref 表单提交:', refUserInfo.value)
  alert(`ref 表单提交成功！\n姓名: ${refUserInfo.value.name}\n年龄: ${refUserInfo.value.age}`)
}

function submitReactiveForm() {
  console.log('reactive 表单提交:', reactiveUserInfo)
  alert(`reactive 表单提交成功！\n姓名: ${reactiveUserInfo.name}\n年龄: ${reactiveUserInfo.age}`)
}

</script>

<style scoped>
.day-container {
  padding: 2rem;
  text-align: center;
}

h1 {
  color: #42b883;
  font-size: 2rem;
  margin-bottom: 2rem;
}

.counter-section {
  margin: 2rem auto;
  padding: 1.5rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  max-width: 400px;
  background: #f9f9f9;
}

h2 {
  color: #42b883;
  font-size: 1.3rem;
  margin-bottom: 1rem;
}

.counter-display {
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 1rem;
  padding: 0.5rem;
  background: white;
  border-radius: 4px;
  border: 1px solid #ddd;
}

.counter-controls {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
}

.counter-controls button {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.counter-controls button:nth-child(1) {
  background-color: #4caf50;
  color: white;
}

.counter-controls button:nth-child(1):hover {
  background-color: #45a049;
}

.counter-controls button:nth-child(2) {
  background-color: #f44336;
  color: white;
}

.counter-controls button:nth-child(2):hover {
  background-color: #da190b;
}

.counter-controls button:nth-child(3) {
  background-color: #ff9800;
  color: white;
}

.counter-controls button:nth-child(3):hover {
  background-color: #e68900;
}

/* 表单样式 */
.form-section {
  margin: 2rem auto;
  padding: 1.5rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  max-width: 500px;
  background: #f9f9f9;
}

.user-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-weight: bold;
  color: #333;
}

.form-group input[type="text"],
.form-group input[type="email"],
.form-group input[type="number"] {
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.form-group input:focus {
  outline: none;
  border-color: #42b883;
  box-shadow: 0 0 0 2px rgba(66, 184, 131, 0.2);
}

.nested-fields {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-left: 1rem;
}

.checkbox-group {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-left: 1rem;
}

.checkbox-group label {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-weight: normal;
  cursor: pointer;
}

.checkbox-group input[type="checkbox"] {
  width: auto;
}

.submit-btn {
  padding: 0.75rem 1.5rem;
  background-color: #42b883;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.submit-btn:hover {
  background-color: #369870;
}

/* 数据显示样式 */
.display-section {
  margin: 2rem auto;
  padding: 1.5rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  max-width: 800px;
  background: #f9f9f9;
}

.data-display {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.data-box {
  background: white;
  padding: 1rem;
  border-radius: 4px;
  border: 1px solid #ddd;
}

.data-box h3 {
  margin: 0 0 0.5rem 0;
  color: #42b883;
  font-size: 1.1rem;
}

.data-box pre {
  background: #f5f5f5;
  padding: 0.5rem;
  border-radius: 4px;
  font-size: 0.9rem;
  overflow-x: auto;
  margin: 0;
}

@media (max-width: 768px) {
  .data-display {
    grid-template-columns: 1fr;
  }
}
</style>
