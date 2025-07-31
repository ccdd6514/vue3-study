<template>
  <div class="container">
    <estimated-virtual-list
      :data-source="list"
      :estimated-height="100"
      :loading="loading"
      @getMoreData="loadMore"
    >
      <template #item="{ item }">
        <div class="item">
          <div class="title">{{ item.title }}</div>
          <div class="content">{{ item.content }}</div>
        </div>
      </template>
    </estimated-virtual-list>
  </div>
</template>

<script>
import EstimatedVirtualList from './EstimatedVirtualList.vue'

export default {
  components: {
    EstimatedVirtualList
  },
  
  data() {
    return {
      list: [],
      loading: false,
      page: 1
    }
  },

  created() {
    this.loadMore()
  },

  methods: {
    async loadMore() {
      this.loading = true
      try {
        const res = await this.fetchData(this.page)
        this.list = [...this.list, ...res]
        this.page++
      } finally {
        this.loading = false
      }
    },

    fetchData(page) {
      return new Promise(resolve => {
        setTimeout(() => {
          const data = Array(20).fill(0).map((_, index) => ({
            id: page * 20 + index,
            title: `Title ${page * 20 + index}`,
            content: 'Content...'
          }))
          resolve(data)
        }, 1000)
      })
    }
  }
}
</script>

<style scoped>
.container {
  height: 500px;
}

.item {
  padding: 16px;
  border-bottom: 1px solid #eee;
}

.title {
  font-size: 16px;
  font-weight: bold;
}

.content {
  margin-top: 8px;
  color: #666;
}
</style>
