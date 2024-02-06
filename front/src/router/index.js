// Composables
import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/FrontLayout.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/views/front/HomeView.vue'),
        meta: {
          title: 'Ticket? Take it!'
        }
      },
      {
        path: 'register',
        name: 'Register',
        component: () => import('@/views/front/RegisterView.vue'),
        meta: {
          title: 'Ticket? Take it! - 註冊'
        }
      }
      // {
      //   path: 'login',
      //   name: 'Login',
      //   component: () => import('@/views/front/LoginView.vue'),
      //   meta: {
      //     title: 'Ticket? Take it! - 登入'
      //   }
      // },
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

// 進到每頁後執行 function => 修改瀏覽器標題
router.afterEach((to, from) => {
  document.title = to.meta.title
})

export default router
