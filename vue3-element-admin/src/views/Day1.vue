<template>
  <div class="day-container">
    <h1>Day 1 组件</h1>
    <p>这是第一天学习内容</p>
    <button @click="increment">
      {{ state.count }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

const state = reactive({ count: 0 })

function increment() {
  state.count++
}

const raw = {}
const proxy = reactive(raw)

// 代理对象和原始对象不是全等的
console.log(proxy === raw) // false

// 在同一个对象上调用 reactive() 会返回相同的代理
console.log(reactive(raw) === proxy) // true

// 在一个代理上调用 reactive() 会返回它自己
console.log(reactive(proxy) === proxy) // true


const books = reactive([ref('Vue 3 Guide')])
// 这里需要 .value
console.log(books[0].value)

const map = reactive(new Map([['count', ref(0)]]))
// 这里需要 .value
console.log(map.get('count')?.value)

</script>

<style scoped>
.day-container {
  padding: 2rem;
  text-align: center;
}

h1 {
  color: #42b883;
  font-size: 2rem;
  margin-bottom: 1rem;
}

p {
  font-size: 1.2rem;
  color: #333;
}
</style>
