<!-- ChildComponent.vue -->
<template>
  <div class="login-form">
    <input 
      type="email" 
      v-model="email" 
      placeholder="请输入邮箱"
      @click="handleClick"
    >
    <input 
      type="password" 
      v-model="password" 
      placeholder="请输入密码"
    >
    <button @click="submitForm">提交</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// 定义发射事件
const emit = defineEmits({
  // 简单的点击事件，无需验证
  click: null,

  // 带验证的提交事件
  submit: ({ email, password }) => {
    if (email && password) {
      // 可以添加更多验证逻辑
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        console.warn('Invalid email format!')
        return false
      }
      if (password.length < 6) {
        console.warn('Password too short!')
        return false
      }
      return true
    } else {
      console.warn('Invalid submit event payload!')
      return false
    }
  }
})

// 表单数据
const email = ref('')
const password = ref('')

// 点击事件处理
function handleClick() {
  emit('click')
}

// 表单提交处理
function submitForm() {
  emit('submit', { 
    email: email.value, 
    password: password.value 
  })
}
</script>

<style scoped>
.login-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 300px;
  margin: 20px;
}

input {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

button {
  padding: 8px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}
</style>
