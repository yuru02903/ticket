<template>
  <v-card color="basil">
    <!-- 手機板 -->
    <template v-if="isMobile">
      <!-- logo + 摺疊按鈕 -->
      <v-card-title class="text-center justify-center align-center py-3 bb d-flex">
        <v-card-actions>
          <v-btn class="font-weight-bold text-h3 text-basil" height="100%" to="/" :active="false">GoConcert</v-btn>
        </v-card-actions>
        <v-spacer></v-spacer>
        <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
      </v-card-title>
      <!-- 導覽列 -->
      <v-navigation-drawer v-model="drawer" location="right">
        <v-list>
          <v-list-item @click="login = true" v-if="!user.isLogin">
            <template #prepend>
              <v-icon icon="mdi-login"></v-icon>
            </template>
              <v-list-item-title> 登入/註冊 </v-list-item-title>
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
          <v-btn class="font-weight-bold text-h3 text-basil" height="100%" to="/" :active="false">GoConcert</v-btn>
        </v-card-actions>
      </v-card-title>
      <!-- 導覽列 -->
      <v-tabs
          v-model="tab"
          bg-color="transparent"
          color="basil"
          grow
          class="align-center"
          :active="false"
        >
        <template
          v-for="item in navItems"
          :key="item.to">
          <v-tab
            :to="item.to"
            :value="item.text"
            :prepend-icon="item.icon"
            :active="false"
          >
            {{ item.text }}
          </v-tab>
        </template>
        <v-tab prepend-icon="mdi-login" @click="login = true" v-if="!user.isLogin"> 登入/註冊 </v-tab>
        <!-- <v-btn prepend-icon="mdi-login" v-if="!user.isLogin" @click="login"></v-btn>
        <v-btn prepend-icon="mdi-logout" v-else @click="logout"></v-btn> -->
      </v-tabs>
    </template>

    <v-window >
      <v-main>
        <RouterView :key="$route.path"></RouterView>
      </v-main>
    </v-window>

    <v-dialog v-model="login" width="35%" min-width="400px" >
      <v-card>
        <LoginView></LoginView>
        <!-- <RegisterView></RegisterView> -->
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script setup>
// 判斷裝置狀態的套件
import { useDisplay } from 'vuetify'
import { ref, computed } from 'vue'
import { useUserStore } from '@/store/user'
import LoginView from '@/components/LoginView.vue'
import RegisterView from '@/components/RegisterView.vue'

const user = useUserStore()

// 手機版狀態判斷
const { mobile } = useDisplay()
const isMobile = computed(() => mobile.value)

// 手機版惻欄開關
const drawer = ref(false)

// 導覽列項目
const navItems = computed(() => {
  return [
    { to: '/concerts', text: '近期演出', icon: 'mdi-music' },
    { to: '/tickets', text: '票券交流', icon: 'mdi-ticket-confirmation' },
    { to: '/seats', text: '座位視野', icon: 'mdi-sofa-single' },
    { to: '/member', text: '會員專區', icon: 'mdi-cog', show: user.isLogin && !user.isAdmin },
    { to: '/admin', text: '管理專區', icon: 'mdi-cog', show: user.isLogin && user.isAdmin }
  ]
})

const tab = ref(false)

const login = ref(false)
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

.bg-basil {
  background-color: #FFFBE6 !important;
}
.text-basil {
  color: #e76813 !important;
}

.bb {
  border-bottom: 2px solid #e0e0e0; /* 调整底线粗细和颜色 */
}
</style>
