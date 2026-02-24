<template>
    <div class="day-container">
        <h1>Day 3 — computed 计算属性</h1>

        <!-- ============ 1. 缓存机制 vs methods ============ -->
        <section>
            <h2>1. 缓存机制 vs methods 性能对比</h2>
            <p>响应式数据 count = {{ count }}</p>
            <p>响应式无关数据 unrelated = {{ unrelated }}</p>
            <p>computed 多次读取（getter 只执行一次，请看控制台）：</p>
            <p>第1次：{{ doubleByComputed }}，第2次：{{ doubleByComputed }}，第3次：{{ doubleByComputed }}</p>
            <p>methods 多次调用（每次都执行，请看控制台）：</p>
            <p>第1次：{{ doubleByMethod() }}，第2次：{{ doubleByMethod() }}</p>
            <button @click="count++">count +1（触发缓存失效）</button>
            <button @click="unrelated++">修改无关数据（computed 不重算）</button>
            <p class="tip">
                打开浏览器控制台查看日志：<br />
                · "[computed] getter 执行" 每次 count 变化只打印 1 次（缓存）<br />
                · "[method] 被调用" 模板中调用几次就打印几次（无缓存）<br />
                · 点击"修改无关数据"：unrelated 变化，computed 不执行（未订阅）
            </p>
        </section>

        <!-- ============ 2. 可写计算属性 ============ -->
        <section>
            <h2>2. 可写计算属性（getter + setter）</h2>
            <p>姓（firstName）：{{ firstName }}</p>
            <p>名（lastName）：{{ lastName }}</p>
            <p>全名 fullName（computed getter）：{{ fullName }}</p>
            <input v-model="fullName" placeholder="直接修改全名，setter 自动拆分" />
            <p class="tip">修改输入框 → setter 把全名拆成姓和名</p>
        </section>

        <!-- ============ 3. 多依赖 + 链式计算 ============ -->
        <section>
            <h2>3. 多依赖计算 & 链式计算</h2>
            <p>单价：<input v-model.number="price" type="number" style="width:80px" /></p>
            <p>数量：<input v-model.number="quantity" type="number" style="width:80px" /></p>
            <p>折扣：<input v-model.number="discount" type="number" min="0" max="10" step="0.1" style="width:80px" /> 折</p>
            <p>小计（price × quantity）= {{ subtotal }}</p>
            <p>折后价（subtotal × discount / 10）= {{ discountedPrice }}</p>
            <p>含税价（discountedPrice × 1.13，链式）= {{ taxIncludedPrice }}</p>
        </section>

        <!-- ============ 4. 待办事项统计（任务2）============ -->
        <section>
            <h2>4. 待办事项统计（总数 / 已完成 / 未完成）</h2>
            <div class="todo-stats">
                <span>总数：{{ todoStats.total }}</span>
                <span>已完成：{{ todoStats.done }}</span>
                <span>未完成：{{ todoStats.pending }}</span>
                <span>完成率：{{ todoStats.rate }}</span>
            </div>
            <ul>
                <li v-for="todo in todos" :key="todo.id">
                    <input type="checkbox" v-model="todo.done" />
                    <span :style="{ textDecoration: todo.done ? 'line-through' : 'none' }">
                        {{ todo.text }}
                    </span>
                </li>
            </ul>
            <div style="margin-top:0.5rem">
                <input v-model="newTodo" placeholder="输入新任务" @keyup.enter="addTodo" />
                <button @click="addTodo">添加</button>
            </div>
        </section>

        <!-- ============ 5. 表单数据格式转换（任务3）============ -->
        <section>
            <h2>5. 价格格式化（可写 computed 做格式转换）</h2>
            <p>原始数值（分）：{{ priceInCents }}</p>
            <p>格式化显示：{{ formattedPrice }}</p>
            <label>
                输入价格（元，支持小数）：
                <input v-model="formattedPrice" placeholder="如 1,299.99" style="width:150px" />
            </label>
            <p class="tip">输入框双向绑定 formattedPrice，getter 显示带千分符，setter 解析为分存储</p>
        </section>

        <!-- ============ 6. 异步计算的处理 ============ -->
        <section>
            <h2>6. 异步计算的处理（watch + ref 模拟）</h2>
            <p>搜索关键词：<input v-model="keyword" placeholder="输入关键词" /></p>
            <p>异步结果（computed 本身不支持 async，用 watch 替代）：</p>
            <p v-if="asyncLoading">加载中...</p>
            <p v-else>{{ asyncResult }}</p>
            <p class="tip">
                computed 的 getter 必须是同步函数；<br />
                异步场景应改用 watch 监听，将结果存入 ref，再在模板中读取该 ref。
            </p>
        </section>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, reactive } from 'vue'
// ================================================================
// 【面试点 1】缓存机制 — 依赖追踪 & 缓存更新时机
// ================================================================
// Vue 用 ReactiveEffect 追踪 computed 的依赖。
// 首次读取时执行 getter，把所有访问过的响应式属性记录为依赖。
// 依赖不变 → 直接返回缓存值（_dirty = false），getter 不重新执行。
// 依赖变化 → 标记 _dirty = true，下次读取时才重新执行 getter（懒求值）。
//
// methods 没有缓存，每次渲染时都会被重新调用。
// 若计算昂贵（如大数组过滤），computed 可显著减少重复计算。
const count = ref(0)
const unrelated = ref(0)

// ⚠️ 关键：computed getter 和 methods 内部绝不能写入响应式数据
// 否则：写入 → 触发重渲染 → 再次执行 → 再次写入 → 死循环
// 用 console.log 演示执行次数，没有副作用，不会触发响应式更新

const doubleByComputed = computed(() => {
    console.log('[computed] getter 执行了，count =', count.value)
    return count.value * 2
})

function doubleByMethod(): number {
    console.log('[method] 被调用了，count =', count.value)
    return count.value * 2
}


// ================================================================
// 【面试点 2】可写计算属性 — getter + setter
// ================================================================
// 场景：需要把一个派生值"写回"源数据时使用。
// 注意：setter 里不要直接修改 computed 自身，要修改其依赖的响应式数据。
// 常见误区：把 setter 写成修改 computed 的"返回值"，这是错误的。

const firstName = ref('ccdd')
const lastName = ref('xy')

const fullName = computed({
    get() {
        return firstName.value + ' ' + lastName.value
    },
    set(val: string) {
        const spaceIndex = val.indexOf(' ')
        if (spaceIndex !== -1) {
            firstName.value = val.slice(0, spaceIndex)
            lastName.value = val.slice(spaceIndex + 1)
        }
    }
})

// ================================================================
// 【面试点 3】多依赖计算 & 链式计算
// ================================================================
// computed 可以依赖多个响应式值，任意一个变化都会触发重新计算。
// 链式计算：computed 依赖另一个 computed，Vue 会正确追踪依赖链。
// 依赖链：price/quantity → subtotal → discountedPrice → taxIncludedPrice

const price = ref(100)
const quantity = ref(3)
const discount = ref(8.5) // 8.5 折

// 第一层：多依赖
const subtotal = computed(() => price.value * quantity.value)
// 第二层：依赖上一个 computed（链式）
const discountedPrice = computed(() => subtotal.value * (discount.value / 10))
// 第三层：继续链式
const taxIncludedPrice = computed(() =>
    (discountedPrice.value * 1.13).toFixed(2)
)


// ================================================================
// 【任务 2】待办事项统计
// ================================================================
// computed 依赖 todos 数组，任意 todo.done 变化都会重新统计。
// 用 reactive 数组让对象属性也是响应式的。

interface Todo {
    id: number
    text: string
    done: boolean
}

const todos = reactive<Todo[]>([
    { id: 1, text: '学习 computed 缓存机制', done: true },
    { id: 2, text: '实现可写计算属性', done: false },
    { id: 3, text: '掌握链式计算', done: false },
])

const newTodo = ref('')

function addTodo() {
    const text = newTodo.value.trim()
    if (!text) return
    todos.push({ id: Date.now(), text, done: false })
    newTodo.value = ''
}

const todoStats = computed(() => {
    const total = todos.length
    const done = todos.filter(t => t.done).length
    const pending = total - done
    const rate = total === 0 ? '0%' : ((done / total) * 100).toFixed(0) + '%'
    return { total, done, pending, rate }
})

// ================================================================
// 【任务 3】价格格式化 — 可写 computed 做格式转换
// ================================================================
// 存储用"分"（整数，避免浮点精度问题），显示用"元"带千分符。
// getter：分 → 带千分符的元字符串
// setter：解析用户输入（去掉逗号）→ 转为分存储

const priceInCents = ref(129999) // 单位：分

const formattedPrice = computed({
    get(): string {
        const yuan = priceInCents.value / 100
        // toLocaleString 添加千分符
        return yuan.toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    },
    set(val: string) {
        // 去掉千分符、空格，解析为浮点数，转为分
        const num = parseFloat(val.replace(/,/g, ''))
        if (!isNaN(num)) {
            priceInCents.value = Math.round(num * 100)
        }
    }
})



// ================================================================
// 【面试点 4】异步计算的处理
// ================================================================
// computed 的 getter 必须是同步的：
//   - async getter 返回 Promise，模板拿到的是 Promise 对象，而非真实值
//   - Vue 不等待 Promise resolve，直接用返回值渲染
//
// 正确做法：用 watch 监听依赖变化，在回调里做异步操作，结果存入 ref
const keyword = ref('')
const asyncResult = ref('（等待输入）')
const asyncLoading = ref(false)
// 模拟异步请求
function mockFetch(kw: string): Promise<string> {
    return new Promise(resolve =>
        setTimeout(() => resolve(kw ? `「${kw}」的搜索结果：共 ${kw.length * 42} 条` : '（无结果）'), 600)
    )
}

// Vue 3 的 watch 没有 debounce 选项，用手动 debounce 实现防抖
let debounceTimer: ReturnType<typeof setTimeout> | null = null

watch(keyword, (kw) => {
    if (debounceTimer) clearTimeout(debounceTimer)
    debounceTimer = setTimeout(async () => {
        asyncLoading.value = true
        asyncResult.value = await mockFetch(kw)
        asyncLoading.value = false
    }, 500)
})
// ================================================================
// 【面试高频总结 — 脑子里要有这张表】
// ================================================================
//
// | 特性                  | computed                  | methods              | watch               |
// |-----------------------|---------------------------|----------------------|---------------------|
// | 缓存                  | ✅ 依赖不变时缓存          | ❌ 每次调用都执行    | ❌ 无缓存           |
// | 返回值                | 有（响应式 ref）           | 有                   | 无（副作用）        |
// | 支持 async            | ❌ getter 必须同步         | ✅                   | ✅                  |
// | 适合场景              | 派生数据、模板渲染         | 事件处理、有副作用   | 异步操作、副作用    |
// | 可写                  | ✅ getter + setter         | —                    | —                   |
//
// 【面试必背结论】
// 1. computed 依赖追踪：ReactiveEffect 在 getter 执行期间收集所有被访问的响应式属性
// 2. 缓存失效时机：依赖变化时标记 _dirty=true，下次读取才重新执行（懒求值）
// 3. computed 不能是 async，异步场景改用 watch + ref
// 4. 可写 computed：setter 只能修改依赖的源数据，不能直接赋值给 computed 本身
// 5. 链式 computed 是合法的，Vue 会自动追踪完整依赖链
</script>

<style scoped>
.day-container {
    padding: 2rem;
    max-width: 760px;
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

.tip {
    font-size: 0.85rem;
    color: #888;
    margin-top: 0.5rem;
    line-height: 1.6;
}

input[type='text'],
input[type='number'],
input:not([type]) {
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 0.2rem 0.5rem;
    font-size: 1rem;
    outline: none;
}

input:focus {
    border-color: #42b883;
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

.todo-stats {
    display: flex;
    gap: 1.5rem;
    font-weight: bold;
    color: #42b883;
    margin-bottom: 0.5rem;
}

ul {
    list-style: none;
    padding: 0;
    margin: 0.5rem 0;
}

li {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.3rem 0;
}
</style>