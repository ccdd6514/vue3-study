import request from './request'

// 用户信息接口
export interface UserInfo {
  id: number
  name: string
  email: string
  avatar?: string
}

// API 响应接口
interface ApiResponse<T = any> {
  code: number
  message: string
  data: T
}

// 获取用户列表
export function getUserList(): Promise<ApiResponse<UserInfo[]>> {
  return request.get('/users')
}

// 获取用户详情
export function getUserInfo(id: number): Promise<ApiResponse<UserInfo>> {
  return request.get(`/users/${id}`)
}

// 登录
export function login(data: { username: string; password: string }): Promise<ApiResponse<{ token: string; user: UserInfo }>> {
  return request.post('/login', data)
}
