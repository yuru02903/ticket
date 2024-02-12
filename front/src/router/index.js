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
          title: 'GoConcert'
        }
      },
      {
        path: 'tickets',
        name: 'Tickets',
        component: () => import('@/views/front/TicketsView.vue'),
        meta: {
          title: 'GoConcert - 票券交流'
        }
      },
      {
        path: 'concerts',
        name: 'Concerts',
        component: () => import('@/views/front/ConcertsView.vue'),
        meta: {
          title: 'GoConcert - 近期演出'
        }
      },
      {
        path: 'seats',
        name: 'Seats',
        component: () => import('@/components/RegisterView.vue'),
        meta: {
          title: 'GoConcert - 座位視野'
        }
      }
      // {
      //   path: 'login',
      //   name: 'Login',
      //   component: () => import('@/views/front/LoginView.vue'),
      //   meta: {
      //     title: 'GoConcert - 登入'
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
