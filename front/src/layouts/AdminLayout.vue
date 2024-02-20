<template>
  <v-card color="mainColor">
    <v-row>
      <v-col cols="12">
        <v-card-title class="text-center justify-center align-center py-3 bb d-flex">
          <v-card-actions>
            <v-btn class="font-weight-bold text-h3 text-mainColor" height="100%" to="/" :active="false">GoConcert</v-btn>
          </v-card-actions>
        </v-card-title>
      </v-col>
    </v-row>
    <v-row>
      <v-col style="position: absolute;">
        <v-navigation-drawer
          v-model="admin_drawer"
          :rail="rail"
          permanent
          @click="rail = false"
          style="position: relative;"
        >
          <v-list-item
            prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg"
            title="John Leider"
            nav
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
      </v-col>
      <v-col>
        <RouterView ></RouterView>
      </v-col>
    </v-row>

  </v-card>
</template>

<script setup>
import { useDisplay } from 'vuetify'
import { ref, computed } from 'vue'

const { smAndDown } = useDisplay()
const isSmall = computed(() => smAndDown.value)

const drawer = ref(false)
const admin_drawer = ref(true)
const rail = ref(true)

const navItems = [
  { to: '/concerts', text: '近期演出', icon: 'mdi-music' },
  { to: '/tickets', text: '票券交流', icon: 'mdi-ticket-confirmation' },
  { to: '/seats', text: '座位視野', icon: 'mdi-sofa-single' },
  { to: '/member', text: '會員專區', icon: 'mdi-cog' },
  { to: '/admin', text: '管理專區', icon: 'mdi-cog' }
]

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
