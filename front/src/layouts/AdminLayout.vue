<template>
  <v-card color="mainColor">
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

    <template v-else>
      <v-card-title class="text-center justify-center py-3 bb d-flex">
        <v-card-actions>
          <v-btn class="font-weight-bold text-h3 text-mainColor" height="100%" to="/" :active="false">GoConcert</v-btn>
        </v-card-actions>
      </v-card-title>
    </template>
    <v-main>
      <RouterView ></RouterView>
    </v-main>
  </v-card>
</template>

<script setup>

const navItems = [
  { to: '/concerts', text: '近期演出', icon: 'mdi-music' },
  { to: '/tickets', text: '票券交流', icon: 'mdi-ticket-confirmation' },
  { to: '/seats', text: '座位視野', icon: 'mdi-sofa-single' },
  { to: '/member', text: '會員專區', icon: 'mdi-cog' },
  { to: '/admin', text: '管理專區', icon: 'mdi-cog' }
]

</script>
