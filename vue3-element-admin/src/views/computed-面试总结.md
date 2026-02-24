# Vue 3 computed 面试总结

## 一、缓存机制

### 依赖追踪原理

Vue 3 的 `computed` 底层基于 `ReactiveEffect`。

**执行流程：**

1. 首次读取 computed 属性时，创建 `ReactiveEffect`，执行 getter
2. getter 执行期间，所有被访问的响应式属性（`ref`/`reactive`）自动将该 effect 注册为订阅者
3. 依赖属性变化时，通知 effect 将 `_dirty` 标记为 `true`
4. 下次读取 computed 时检查 `_dirty`：为 `true` 则重新执行 getter，为 `false` 直接返回缓存值

```
首次读取 → 执行 getter → 收集依赖 → 缓存结果（_dirty = false）
依赖变化 → 标记 _dirty = true（不立即重算，懒求值）
再次读取 → _dirty 为 true → 重新执行 getter → 缓存新结果
```

### 缓存更新时机

| 场景 | 是否重新计算 |
|------|------------|
| 依赖的响应式数据发生变化 | ✅ 是（标记 dirty，下次读取时重算） |
| 读取多次，依赖未变 | ❌ 否（直接返回缓存） |
| 修改与 computed 无关的响应式数据 | ❌ 否（未订阅该依赖） |
| 组件重新渲染 | ❌ 否（缓存机制独立于渲染） |

### 与 methods 的性能对比

```ts
// computed：依赖不变时只执行一次
const double = computed(() => expensiveCalc(list.value))

// template 中多次读取，只计算一次
// {{ double }} {{ double }} {{ double }}  → expensiveCalc 只执行 1 次

// methods：每次调用都执行
function doubleMethod() { return expensiveCalc(list.value) }

// template 中多次调用，执行多次
// {{ doubleMethod() }} {{ doubleMethod() }}  → expensiveCalc 执行 2 次
```

**结论：** 计算开销大（大数组过滤、复杂字符串处理等）时，优先用 `computed` 而非 `methods`。

---

## 二、可写计算属性

### getter 和 setter 的定义

```ts
const fullName = computed({
  get(): string {
    return firstName.value + ' ' + lastName.value
  },
  set(val: string) {
    ;[firstName.value, lastName.value] = val.split(' ')
  }
})
```

### 使用场景

**1. 双向绑定中的格式转换**

```ts
// 存储：分（整数），显示：带千分符的元字符串
const formattedPrice = computed({
  get: () => (priceInCents.value / 100).toLocaleString(),
  set: (val: string) => {
    priceInCents.value = Math.round(parseFloat(val.replace(/,/g, '')) * 100)
  }
})
```

**2. 组合多个字段为单一输入**

```ts
// 将姓名拆分为 firstName / lastName
const fullName = computed({
  get: () => `${firstName.value}${lastName.value}`,
  set: (val: string) => {
    firstName.value = val.slice(0, 1)
    lastName.value = val.slice(1)
  }
})
```

### 注意事项

- ❌ **不要在 setter 中修改 computed 自身**，只能修改其依赖的源数据
- ❌ **不要在 setter 中产生副作用**（如异步请求），setter 应保持纯粹的数据转换
- ❌ **不要在 getter 中修改数据**，getter 必须是纯函数（无副作用）

---

## 三、复杂计算场景

### 多依赖计算

computed 可以依赖任意多个响应式值，任意一个变化都会触发重新计算：

```ts
const summary = computed(() => {
  // 同时依赖 price、quantity、discount 三个 ref
  return (price.value * quantity.value * discount.value / 10).toFixed(2)
})
```

### 链式计算

computed 可以依赖另一个 computed，Vue 会正确追踪完整的依赖链：

```ts
// 依赖链：price/quantity → subtotal → discountedPrice → taxPrice
const subtotal = computed(() => price.value * quantity.value)
const discountedPrice = computed(() => subtotal.value * (discount.value / 10))
const taxPrice = computed(() => (discountedPrice.value * 1.13).toFixed(2))
```

当 `price` 变化时，三个 computed 会按依赖顺序依次更新。

### 异步计算的处理

**computed 的 getter 必须是同步函数：**

```ts
// ❌ 错误：async getter 返回 Promise，模板拿到的是 Promise 对象
const result = computed(async () => {
  return await fetch('/api/data').then(r => r.json()) // 返回 Promise，不是数据！
})
```

**正确做法：watch + ref**

```ts
// ✅ 正确：watch 监听依赖，回调中处理异步，结果存入 ref
const keyword = ref('')
const result = ref('')
const loading = ref(false)

watch(keyword, async (kw) => {
  loading.value = true
  result.value = await fetchData(kw)
  loading.value = false
})
```

---

## 四、高频面试题

### Q1：computed 和 watch 的区别？

| 对比项 | computed | watch |
|--------|----------|-------|
| 目的 | 派生新数据（有返回值） | 响应数据变化执行副作用（无返回值） |
| 缓存 | ✅ 有缓存 | ❌ 无缓存 |
| 异步 | ❌ getter 必须同步 | ✅ 回调可以是 async |
| 使用场景 | 模板中的计算值、格式转换 | 异步请求、手动 DOM 操作、打日志 |

### Q2：computed 和 methods 的区别？

- **computed**：有缓存，依赖不变时不重新计算，适合在模板中频繁读取的计算值
- **methods**：无缓存，每次调用都执行，适合事件处理或每次都需要新结果的场景

### Q3：computed 的依赖是如何被追踪的？

Vue 3 使用 **响应式效果（ReactiveEffect）+ 依赖收集（track）+ 触发更新（trigger）** 机制：

1. computed 内部创建一个 `ReactiveEffect`
2. 执行 getter 时，访问响应式数据会调用 `track()`，把当前 effect 加入该数据的订阅列表
3. 响应式数据变化时调用 `trigger()`，通知所有订阅的 effect
4. computed 的 effect 收到通知后，将 `_dirty` 置为 `true`（不立即重算，懒求值）
5. 下次读取 computed 时，发现 `_dirty=true`，重新执行 getter 并更新缓存

### Q4：为什么 computed 不能是 async？

`computed` 的 getter 执行是同步的，Vue 需要在执行 getter 的**同步过程中**完成依赖收集。`async` 函数在 `await` 之后的代码会在微任务中执行，此时依赖收集上下文已经清除，导致依赖追踪失效，且返回值是 `Promise`，模板无法直接渲染。

### Q5：链式 computed 的更新顺序是什么？

Vue 3 使用 **调度器（scheduler）** 确保 computed 按依赖拓扑顺序更新，避免"脏读"（读到中间状态）。当 `price` 变化时：

```
price 变化 → subtotal 标记 dirty → discountedPrice 标记 dirty → taxPrice 标记 dirty
读取 taxPrice → 执行 taxPrice.getter → 读取 discountedPrice → 执行 discountedPrice.getter
→ 读取 subtotal → 执行 subtotal.getter → 得到最新值 → 层层返回
```

---

## 五、速记总结

```
computed 三大特性：
1. 缓存      → 依赖不变，getter 不重新执行（_dirty 机制）
2. 懒求值    → 依赖变化不立即重算，等下次读取时才执行
3. 响应式    → 返回值本身是 ref，可被模板/watch 追踪

可写 computed：
- getter：派生数据（纯函数，无副作用）
- setter：写回源数据（不改 computed 自身）

异步场景：computed → watch + ref
性能场景：methods → computed（依赖稳定时）
```
