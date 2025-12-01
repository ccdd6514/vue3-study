import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

// 创建 axios 实例
const request = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
})

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    // 可以在这里添加 token 等认证信息
    console.log('发送请求:', config)
    return config
  },
  (error) => {
    console.error('请求错误:', error)
    return Promise.reject(error)
  }
)

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    console.log('收到响应:', response)
    return response
  },
  (error) => {
    console.error('响应错误:', error)
    // 统一处理错误
    if (error.response) {
      const { status, data } = error.response
      switch (status) {
        case 401:
          console.error('未授权，请登录')
          break
        case 403:
          console.error('拒绝访问')
          break
        case 404:
          console.error('请求的资源不存在')
          break
        case 500:
          console.error('服务器错误')
          break
        default:
          console.error(data?.message || `请求失败 (${status})`)
      }
    } else if (error.request) {
      console.error('网络请求超时，请检查网络连接')
    } else {
      console.error('请求配置错误:', error.message)
    }
    return Promise.reject(error)
  }
)

export default request
