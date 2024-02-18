// Utilities
import { createPinia } from 'pinia'
// 將資訊儲存在localstorage的套件
import persistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(persistedstate)

export default pinia
