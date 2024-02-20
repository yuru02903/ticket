<template>
  <v-card color="bgPrimary">
    <v-row>
      <v-col cols="12">
        <v-card-title color="textPrimary" class="text-center justify-center align-center py-3 bb d-flex">
          <v-card-actions>
            <v-btn class="font-weight-bold text-h3 text-mainColor" height="100%" to="/" :active="false">GoConcert</v-btn>
          </v-card-actions>
        </v-card-title>
      </v-col>
    </v-row>
    <v-row class="pa-0 ma-0">
        <v-navigation-drawer
          v-model="adminDrawer"
          :rail="rail"
          permanent
          @click="rail = false"
          style="position: relative;"
          color="bgPrimary"
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

</script>
<style>
*,div {
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
