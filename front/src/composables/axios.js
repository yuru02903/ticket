import { useUserStore } from '@/store/user'
import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API
})

const apiAuth = axios.create({
  baseURL: import.meta.env.VITE_API
})

// 請求過程
// 1. 呼叫 axios.get / axios.post..... 等請求時
// 2. interceptors.request 請求攔截器 (執行config => 在請求的JWT 的 headers加上驗證token)
// 3. 送出請求，取得回應
// 4. interceptors.response 回應攔截器
// 5. 呼叫的地方的 .then() .catch()

// 請求攔截器 apiAuth.interceptors.request
// config => 這次請求的設定：代那些參數、請求網址、路徑、請求方式
// 用請求攔截器，在請求設定的headers加上JWT
apiAuth.interceptors.request.use(config => {
  const user = useUserStore()
  config.headers.Authorization = 'Bearer ' + user.token
  return config
})

// 回應攔截器 apiAuth.interceptors.response(成功時執行, 失敗時執行)
// 1. 執行 getProfile 指令 => 送出 apiAuth.get('/users/me') 請求
// 2-1. 如果不是 JWT 過期錯誤，將 apiAuth.get('/users/me') 的錯誤回傳
// 2-2. 如果發生 JWT 過期錯誤，進到 3
// 3. 傳送舊換新請求
// 3-1. 如果舊換新成功，修改 apiAuth.get('/users/me') 的 jwt 為新的後送出
// 3-2. 如果舊換新失敗，將 apiAuth.get('/users/me') 的錯誤回傳
apiAuth.interceptors.response.use((res) => {
  return res
}, (error) => {
  // 如果失敗有收到回應
  if (error.response) {
    // 如果回應是 jwt 過期，且不是舊換新請求
    if (error.response.data.message === 'JWT 過期' && error.config.url !== '/users/extend') {
      const user = useUserStore()
      // 傳送舊換新請求
      return apiAuth.patch('/users/extend')
        .then(({ data }) => {
          // 更新 pinia 保存的 token
          user.token = data.result
          // 修改發生錯誤的原請求設定的 jwt
          error.config.headers.Authorization = 'Bearer ' + user.token
          // 重新傳送原請求
          return axios(error.config)
        })
        .catch(() => {
          // 如果舊換新失敗，登出
          user.logout()
          // 回傳原錯誤到呼叫的地方
          return Promise.reject(error)
        })
    }
  }
  // 如果請求沒回應，或不是過期的錯誤，回傳原錯誤到呼叫的地方
  return Promise.reject(error)
})

export const useApi = () => {
  return { api, apiAuth }
}
