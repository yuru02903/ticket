<template>
  <v-card color="mainColor">
    <!-- 手機板 -->
    <template v-if="isSmall">
      <!-- logo + 摺疊按鈕 -->
      <v-card-title class="text-center justify-center align-center py-3 bb d-flex">
        <v-card-actions>
          <v-btn class="font-weight-bold text-h3 text-mainColor" height="100%" to="/" :active="false">GoConcert</v-btn>
        </v-card-actions>
        <v-spacer></v-spacer>
        <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
      </v-card-title>
      <!-- 導覽列 -->
      <v-navigation-drawer v-model="drawer" location="right">
        <v-list>
          <v-list-item v-if="!user.isLogin" to='/login'>
            <template #prepend>
              <v-icon icon="mdi-login"></v-icon>
            </template>
            <v-list-item-title> 登入/註冊 </v-list-item-title>
          </v-list-item>
          <v-list-item v-if="user.isLogin" @click="logout">
            <template #prepend>
              <v-icon icon="mdi-logout"></v-icon>
            </template>
            <v-list-item-title> 登出 </v-list-item-title>
          </v-list-item>
          <template v-for="item in navItems" :key="item.to">
            <v-list-item :to="item.to">
              <template #prepend>
                <v-icon :icon="item.icon"></v-icon>
              </template>
              <v-list-item-title> {{ item.text }} </v-list-item-title>
            </v-list-item>
          </template>
        </v-list>
      </v-navigation-drawer>
    </template>

    <!-- 電腦版 -->
    <template v-else>
      <!-- logo -->
      <v-card-title class="text-center justify-center py-3 bb d-flex">
        <v-card-actions>
          <v-btn class="font-weight-bold text-h3 text-mainColor" height="100%" to="/" :active="false">GoConcert</v-btn>
        </v-card-actions>
      </v-card-title>
      <!-- 導覽列 -->
      <v-tabs
          v-model="tab"
          bg-color="transparent"
          color="mainColor"
          grow
          :active="false"
        >
        <template
          v-for="item in navItems"
          :key="item.to">
          <v-tab
            :to="item.to"
            :prepend-icon="item.icon"
            :active="false"
            v-if="item.show"
          >
            {{ item.text }}
          </v-tab>
        </template>
        <v-btn width="16%" height="100%" variant="text" prepend-icon="mdi-login" @click="login = true" v-if="!user.isLogin"> 登入/註冊
          <v-dialog v-model="login" scrollable width="40%" min-width="600px" transition="dialog-top-transition">
            <v-card class="rounded-xl" >
              <v-window v-model="step">
                  <v-window-item :value="1" class="bg-white" >
                    <v-row class="ma-0" >
                      <v-col cols="9" class="d-flex" style="justify-content: center ;align-items: center; flex-direction: column;">
                        <LoginView></LoginView>
                      </v-col>
                      <v-col cols="3" class="bg-mainColor d-flex" style="justify-content: center ;align-items: center; flex-direction: column;height: 400px;" >
                        <h2>尚未註冊?</h2>
                        <v-btn @click="step++" variant="outlined"> 註冊 </v-btn>
                      </v-col>
                    </v-row>
                  </v-window-item>

                  <v-window-item :value="2" class="bg-white position-relative">
                    <v-row class="ma-0">
                      <v-col cols="3" class="bg-mainColor d-flex" style="justify-content: center ;align-items: center; flex-direction: column;height: 600px;" >
                        <h2>已經註冊?</h2>
                        <v-btn @click="step--" variant="outlined" >登入</v-btn>
                      </v-col>
                      <v-col cols="9" class="d-flex" style="justify-content: center ;align-items: center; flex-direction: column;height: 600px;">
                        <RegisterView></RegisterView>
                      </v-col>
                    </v-row>
                  </v-window-item>
              </v-window>
            </v-card>
          </v-dialog>
        </v-btn>

        <v-btn width="16%" height="100%" variant="text" prepend-icon="mdi-logout" @click="logout"  v-if="user.isLogin"> 登出
        </v-btn>

      </v-tabs>
    </template>
    <v-divider></v-divider>
    <!-- <v-main > -->
      <RouterView :key="$route.path" ></RouterView>
    <!-- </v-main> -->

  </v-card>
</template>

<script setup>
// 判斷裝置狀態的套件
import { useDisplay } from 'vuetify'
import { ref, computed } from 'vue'
import { useUserStore } from '@/store/user'
import LoginView from '@/components/LoginView.vue'
import RegisterView from '@/components/RegisterView.vue'
import { useApi } from '@/composables/axios'
import { useSnackbar } from 'vuetify-use-dialog'
import { useRouter } from 'vue-router'

const user = useUserStore()

const { apiAuth } = useApi()
const router = useRouter()
const createSnackbar = useSnackbar()

// 手機版狀態判斷
const { smAndDown } = useDisplay()
const isSmall = computed(() => smAndDown.value)

// 手機版惻欄開關
const drawer = ref(false)

// 導覽列項目
const navItems = computed(() => {
  return [
    { to: '/concerts', text: '近期演出', icon: 'mdi-music', show: true },
    { to: '/tickets', text: '票券交流', icon: 'mdi-ticket-confirmation', show: true },
    { to: '/seats', text: '座位視野', icon: 'mdi-sofa-single', show: true },
    { to: '/member', text: '會員專區', icon: 'mdi-cog', show: user.isLogin && !user.isAdmin },
    { to: '/admin', text: '管理專區', icon: 'mdi-cog', show: user.isLogin && user.isAdmin }
  ]
})

const tab = ref(false)

const login = ref(false)
const logout = async () => {
  try {
    await apiAuth.delete('/users/logout')
    user.logout()
    createSnackbar({
      text: '登出成功',
      showCloseButton: false,
      snackbarProps: {
        timeout: 2000,
        color: 'green',
        location: 'top'
      }
    })
    router.push('/')
  } catch (error) {
    const text = error?.response?.data?.message || '發生錯誤，請稍後再試'
    createSnackbar({
      text,
      showCloseButton: false,
      snackbarProps: {
        timeout: 2000,
        color: 'red',
        location: 'top'
      }
    })
  }
}

const step = ref(1)

</script>
<style>
* {
  margin: 0;
  padding: 0;
}
a {
  text-decoration: none;
  color: black;
}

.bg-mainColor {
  background-color: #FFFBE6 !important;
}
.text-mainColor {
  color: #e76813 !important;
}

.bb {
  border-bottom: 2px solid #e0e0e0; /* 调整底线粗细和颜色 */
}
</style>
