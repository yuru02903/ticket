<template>
  <v-card color="bgPrimary" style="height: 100%;" class="pb-8">
    <v-row>
      <v-col cols="12">
        <v-card-title color="textPrimary" class="text-center justify-center align-center py-3 bb d-flex">
          <v-card-actions>
            <v-btn class="font-weight-bold text-h3 text-mainColor" height="100%" to="/" :active="false">GoConcert</v-btn>
          </v-card-actions>
        </v-card-title>
      </v-col>
    </v-row>
    <v-row class="pa-0 ma-0" style="height: 100%;">
      <v-navigation-drawer
        v-model="adminDrawer"
        permanent
        style="position: relative;float: left;height: 100%;"
        color="bgPrimary"

      >
        <v-list-item
          :prepend-avatar
          :title="user.account"
          class="py-4"
        >
        </v-list-item>

        <v-divider></v-divider>

        <v-list density="compact" nav >
          <template v-for="item in adminItems" :key="item.to" >
            <v-list-item :to="item.to" :active="false">
              <template #prepend>
                <v-icon :icon="item.icon"></v-icon>
              </template>
              <v-list-item-title> {{ item.text }} </v-list-item-title>
            </v-list-item>
          </template>
        </v-list>
      </v-navigation-drawer>
      <RouterView :key="$route.path" ></RouterView>
    </v-row>

  </v-card>
</template>

<script setup>
import { useDisplay } from 'vuetify'
import { ref, computed } from 'vue'
import { useUserStore } from '@/store/user'

const { smAndDown } = useDisplay()
const isSmall = computed(() => smAndDown.value)

const adminDrawer = ref(true)
const rail = ref(true)

const user = useUserStore()

const prependAvatar = computed(() => {
  return `https://source.boringavatars.com/beam/120/${user.account}?colors=4EB3DE,8DE0A6,FCF09F,F27C7C,DE528C`
})

const adminItems = computed(() => {
  return [
    { to: '/admin', text: '管理專區', icon: 'mdi-account' },
    { to: '/admin/tickets', text: '票券管理', icon: 'mdi-ticket-confirmation' },
    { to: '/admin/seats', text: '座位管理', icon: 'mdi-sofa-single' }
  ]
})

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

body {
  margin: 0;
  padding: 0;
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
