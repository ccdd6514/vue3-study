<template>
  <div class="day-container">
    <h1>Day 2 — toRef & toRefs</h1>

    <!-- ============ 1. toRef 基础演示 ============ -->
    <section>
      <h2>1. toRef：单属性双向绑定</h2>
      <p>state.count = {{ state.count }}</p>
      <p>countRef.value = {{ countRef }}</p>
      <button @click="state.count++">修改源对象</button>
      <button @click="countRef++">修改 ref</button>
      <!-- 两个按钮都能让两个值同步变化，证明双向绑定 -->
    </section>

    <!-- ============ 2. toRefs 解构不丢失响应性 ============ -->
    <section>
      <h2>2. toRefs：解构保持响应性</h2>
      <p>name = {{ name }}</p>
      <p>age = {{ age }}</p>
      <button @click="name = '李四'">修改 name</button>
      <button @click="user.age++">修改源对象 age</button>
      <!-- name/age 是解构出来的 ref，修改源对象也会同步 -->
    </section>

    <!-- ============ 3. 组合式函数场景 ============ -->
    <section>
      <h2>3. 组合式函数中的 toRefs</h2>
      <p>x={{ position.x }}, y={{ position.y }}</p>
      <button @click="move">移动</button>
    </section>

    <!-- ============ 4. ref 与 toRef 的区别 ============ -->
    <section>
      <h2>4. ref vs toRef 区别演示</h2>
      <p>独立 ref（不影响源）：{{ standalone }}</p>
      <p>toRef（与源同步）：{{ linked }}</p>
      <p>源对象 original.val = {{ original.val }}</p>
      <button @click="standalone++">修改独立 ref</button>
      <button @click="linked++">修改 toRef</button>
    </section>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, toRef, toRefs } from 'vue'

// ================================================================
// 【面试点 1】toRef 的本质
// ================================================================
// toRef(object, key) 创建一个 ref，其 get/set 都直接操作源对象
// 底层原理（简化版）：
// class ObjectRefImpl {
//   get value() { return this._object[this._key] }
//   set value(val) { this._object[this._key] = val }
// }
// 没有自己的存储，只是源对象属性的"代理指针"

const state = reactive({ count: 0 })
const countRef = toRef(state, 'count')
// countRef.value++ → state.count++（同一个值）
// state.count++    → countRef.value 也变（同一个值）


// ================================================================
// 【面试点 2】toRefs 解决解构丢失响应性问题
// ================================================================
// 问题根源：reactive 对象的响应性依赖 Proxy，解构后得到的是普通值
// const { name } = user  →  name 是 string，失去响应性 ❌
// toRefs 把每个属性都变成 ref，解构的是 ref 对象（引用类型），不丢失 ✅

const user = reactive({ name: '张三', age: 25 })
const { name, age } = toRefs(user)
// 解构后仍是 Ref，可访问 .value —— 证明响应性没有丢失
console.log(name.value, age.value) // '张三', 25


// ================================================================
// 【面试点 3】组合式函数中必须用 toRefs 返回
// ================================================================
function usePosition() {
  const position = reactive({ x: 0, y: 0 })

  function move() {
    position.x += 10
    position.y += 10
  }

  // ❌ 错误写法：return position → 调用方解构会丢失响应性
  // ✅ 正确写法：return { ...toRefs(position), move }
  return { ...toRefs(position), move }
}

const { x, y, move } = usePosition() // x、y 仍是响应式 ref
const position = reactive({ x: x, y: y }) // 仅用于模板展示，实际可直接用 x/y


// ================================================================
// 【面试点 4】ref 和 toRef 的核心区别
// ================================================================
const original = reactive({ val: 100 })

// ref：创建独立的响应式容器，与源对象完全无关
const standalone = ref(original.val) // 复制了值，快照，不同步

// toRef：创建与源对象属性的"活链接"
const linked = toRef(original, 'val') // 代理指针，始终同步


// ================================================================
// 【面试高频总结 — 脑子里要有这张表】
// ================================================================
//
// | 特性               | ref(obj.key)   | toRef(obj, key) | toRefs(obj)      |
// |--------------------|----------------|-----------------|------------------|
// | 与源对象同步       | ❌ 独立快照    | ✅ 双向同步     | ✅ 双向同步      |
// | 适用场景           | 独立响应式值   | 单个属性代理    | 批量属性解构     |
// | 组合式函数返回     | 不适用         | 单个属性场景    | 推荐方式 ✅      |
// | 模板中使用         | 自动解包       | 自动解包        | 解构后自动解包   |
//
// ================================================================
// 【面试必背结论】
// ================================================================
// 1. toRef/toRefs 不创建新的响应式数据，只是源属性的"视图/代理"
// 2. 解构 reactive 对象前，必须先 toRefs，否则丢失响应性
// 3. 组合式函数（useXxx）返回值的标准做法：return { ...toRefs(state), methods }
// 4. ref(obj.key) 是"拍快照"，toRef(obj, 'key') 是"建连接"
</script>

<style scoped>
.day-container {
  padding: 2rem;
  max-width: 700px;
  margin: 0 auto;
}

h1 {
  color: #42b883;
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
}

h2 {
  color: #35495e;
  font-size: 1.2rem;
  margin: 1.5rem 0 0.5rem;
  border-left: 4px solid #42b883;
  padding-left: 0.5rem;
}

section {
  background: #f8f8f8;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
}

p {
  font-size: 1rem;
  color: #333;
  margin: 0.3rem 0;
}

button {
  margin: 0.5rem 0.5rem 0 0;
  padding: 0.3rem 0.8rem;
  background: #42b883;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background: #35495e;
}
</style>
