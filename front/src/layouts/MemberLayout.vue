<template>
  <v-navigation-drawer
    v-model="adminDrawer"
    :rail="rail"
    permanent
    @click="rail = false"
    style="position: relative;"
  >
    <v-list-item
      :prepend-avatar
      :title="user.account"
    >
      <template v-slot:append>
        <v-btn
          variant="text"
          icon="mdi-chevron-left"
          @click.stop="rail = !rail"
        ></v-btn>
      </template>
    </v-list-item>

    <v-divider></v-divider>

    <v-list density="compact" nav>
      <v-list-item prepend-icon="mdi-home-city" title="Home" value="home"></v-list-item>
      <v-list-item prepend-icon="mdi-account" title="My Account" value="account"></v-list-item>
      <v-list-item prepend-icon="mdi-account-group-outline" title="Users" value="users"></v-list-item>
    </v-list>
  </v-navigation-drawer>
  <RouterView ></RouterView>
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

</script>
