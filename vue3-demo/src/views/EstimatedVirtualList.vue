<template>
  <div class="estimated-virtuallist-container" v-loading="loading">
    <div class="estimated-virtuallist-content" ref="contentRef">
      <div class="estimated-virtuallist-list" ref="listRef" :style="scrollStyle">
        <div 
          class="estimated-virtuallist-list-item" 
          v-for="item in renderList" 
          :key="item.id"
          :id="String(item.id)"
        >
          <slot name="item" :item="item"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EstimatedVirtualList',
  
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    estimatedHeight: {
      type: Number,
      required: true
    },
    dataSource: {
      type: Array,
      default: () => []
    }
  },

  data() {
    return {
      positions: [], // 位置信息数组
      state: {
        viewHeight: 0, // 可视区域高度
        listHeight: 0, // 列表总高度
        startIndex: 0, // 起始索引
        maxCount: 0,   // 最大渲染数量
        preLen: 0      // 上一次数据长度
      }
    }
  },

  computed: {
    endIndex() {
      return Math.min(this.dataSource.length, this.state.startIndex + this.state.maxCount)
    },

    renderList() {
      return this.dataSource.slice(this.state.startIndex, this.endIndex)
    },

    offsetDis() {
      return this.state.startIndex > 0 
        ? this.positions[this.state.startIndex - 1].bottom 
        : 0
    },

    scrollStyle() {
      return {
        height: `${this.state.listHeight - this.offsetDis}px`,
        transform: `translate3d(0, ${this.offsetDis}px, 0)`
      }
    }
  },

  watch: {
    'dataSource.length': {
      handler() {
        this.initPosition()
        this.$nextTick(() => {
          this.setPosition()
        })
      }
    },
    'state.startIndex': {
      handler() {
        this.setPosition()
      }
    }
  },

  mounted() {
    this.init()
  },

  beforeUnmount() {
    this.destroy()
  },

  methods: {
    // 初始化位置信息
    initPosition() {
      const pos = []
      const disLen = this.dataSource.length - this.state.preLen
      const currentLen = this.positions.length
      const preBottom = this.positions[currentLen - 1] 
        ? this.positions[currentLen - 1].bottom 
        : 0

      for (let i = 0; i < disLen; i++) {
        const item = this.dataSource[this.state.preLen + i]
        pos.push({
          index: item.id,
          height: this.estimatedHeight,
          top: preBottom 
            ? preBottom + i * this.estimatedHeight 
            : item.id * this.estimatedHeight,
          bottom: preBottom 
            ? preBottom + (i + 1) * this.estimatedHeight 
            : (item.id + 1) * this.estimatedHeight,
          dHeight: 0
        })
      }

      this.positions = [...this.positions, ...pos]
      this.state.preLen = this.dataSource.length
    },

    // 更新位置信息
    setPosition() {
      const nodes = this.$refs.listRef?.children
      if (!nodes || !nodes.length) return

      Array.from(nodes).forEach(node => {
        const rect = node.getBoundingClientRect()
        const item = this.positions[+node.id]
        const dHeight = item.height - rect.height
        
        if (dHeight) {
          item.height = rect.height
          item.bottom = item.bottom - dHeight
          item.dHeight = dHeight
        }
      })

      const startId = +nodes[0].id
      const len = this.positions.length
      let startHeight = this.positions[startId].dHeight
      this.positions[startId].dHeight = 0

      for (let i = startId + 1; i < len; i++) {
        const item = this.positions[i]
        item.top = this.positions[i - 1].bottom
        item.bottom = item.bottom - startHeight
        if (item.dHeight !== 0) {
          startHeight += item.dHeight
          item.dHeight = 0
        }
      }

      this.state.listHeight = this.positions[len - 1].bottom
    },

    // 初始化
    init() {
      this.state.viewHeight = this.$refs.contentRef?.offsetHeight || 0
      this.state.maxCount = Math.ceil(this.state.viewHeight / this.estimatedHeight) + 1
      
      this.$refs.contentRef && 
        this.$refs.contentRef.addEventListener('scroll', this.handleScroll)
    },

    // 销毁
    destroy() {
      this.$refs.contentRef && 
        this.$refs.contentRef.removeEventListener('scroll', this.handleScroll)
    },

    // 滚动处理
    handleScroll: rafThrottle(function() {
      const { scrollTop, clientHeight, scrollHeight } = this.$refs.contentRef
      this.state.startIndex = this.binarySearch(this.positions, scrollTop)
      
      const bottom = scrollHeight - clientHeight - scrollTop
      if (bottom <= 20) {
        !this.loading && this.$emit('getMoreData')
      }
    }),

    // 二分查找
    binarySearch(list, value) {
      let left = 0
      let right = list.length - 1
      let templateIndex = -1

      while (left < right) {
        const midIndex = Math.floor((left + right) / 2)
        const midValue = list[midIndex].bottom

        if (midValue === value) {
          return midIndex + 1
        } else if (midValue < value) {
          left = midIndex + 1
        } else if (midValue > value) {
          if (templateIndex === -1 || templateIndex > midIndex) {
            templateIndex = midIndex
          }
          right = midIndex
        }
      }
      return templateIndex
    }
  }
}

// RAF 节流
function rafThrottle(fn) {
  let lock = false
  return function(...args) {
    if (lock) return
    lock = true
    window.requestAnimationFrame(() => {
      fn.apply(this, args)
      lock = false
    })
  }
}
</script>

<style scoped>
.estimated-virtuallist-container {
  width: 100%;
  height: 100%;
}

.estimated-virtuallist-content {
  width: 100%;
  height: 100%;
  overflow: auto;
}

.estimated-virtuallist-list-item {
  width: 100%;
  box-sizing: border-box;
}
</style>
