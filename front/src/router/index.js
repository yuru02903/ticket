// Composables
import { createRouter, createWebHashHistory, START_LOCATION } from 'vue-router'
import { useUserStore } from '@/store/user'
import Swal from 'sweetalert2'

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
          title: 'GoConcert',
          login: false,
          admin: false
        }
      },
      {
        path: 'concerts',
        name: 'Concerts',
        component: () => import('@/views/front/ConcertsView.vue'),
        meta: {
          title: 'GoConcert - 近期演出',
          login: false,
          admin: false
        }
      },
      {
        path: 'tickets',
        name: 'Tickets',
        component: () => import('@/views/front/TicketsView.vue'),
        meta: {
          title: 'GoConcert - 票券交流',
          login: false,
          admin: false
        }
      },
      {
        path: 'seats',
        name: 'Seats',
        component: () => import('@/components/SeatsView.vue'),
        meta: {
          title: 'GoConcert - 座位視野',
          login: false,
          admin: false
        }
      },
      {
        path: 'articles',
        name: 'Articles',
        component: () => import('@/components/ArticlesView.vue'),
        meta: {
          title: 'GoConcert - 討論專區',
          login: false,
          admin: false
        }
      },
      {
        path: 'login',
        name: 'Login',
        component: () => import('@/components/LoginView.vue'),
        meta: {
          title: 'GoConcert - 登入',
          login: false,
          admin: false
        }
      },
      {
        path: 'register',
        name: 'Register',
        component: () => import('@/components/RegisterView.vue'),
        meta: {
          title: 'GoConcert - 註冊',
          login: false,
          admin: false
        }
      }
    ]
  },
  {
    path: '/member',
    component: () => import('@/layouts/MemberLayout.vue'),
    children: [
      {
        path: 'home',
        name: 'MemberHome',
        component: () => import('@/views/member/HomeView.vue'),
        meta: {
          title: 'GoConcert - 會員專區',
          login: true,
          admin: false
        }
      }
    ]
  },
  {
    path: '/admin',
    component: () => import('@/layouts/AdminLayout.vue'),
    children: [
      {
        path: '',
        name: 'AdminHome',
        component: () => import('@/views/admin/HomeView.vue'),
        meta: {
          title: 'GoConcert - 管理專區',
          login: true,
          admin: true
        }
      }
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

router.beforeEach(async (to, from, next) => {
  const user = useUserStore()

  if (from === START_LOCATION) {
    await user.getProfile()
    // next('/ticket')
  }

  // 如果沒有登入，要去會員專區，重新導向回首頁
  if (!user.isLogin && ['/member'].includes(to.path)) {
    next('/')
  } else if (to.meta.admin && !user.isAdmin) {
    // 如果要去的頁面要管理員，但是不是管理員，重新導向回首頁
    next('/')
  } else {
    // 不重新導向
    next()
  }
})

export default router
