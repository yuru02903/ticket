<template>
  <v-row class="pa-0 ma-0">
    <v-col cols="12" class="text-center">
      <h1>座位管理</h1>
    </v-col>
    <v-divider></v-divider>
    <v-col cols="12">
      <v-btn color="green" @click="openDialog">新增座位</v-btn>
    </v-col>
  </v-row>

  <v-dialog v-model="dialog">
    <v-form>
      <v-card>
        <v-card-title>{{ dialogId === '' ? '新增票券' : '編輯票券' }}</v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12" sm="6" md="3">
              <v-text-field label="場館" clearable></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="3">
              <v-text-field label="區域" clearable></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="3">
              <v-text-field label="排數" clearable></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="3">
              <v-text-field label="座號" clearable></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red">取消</v-btn>
          <v-btn color="green">送出</v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script setup>
import { ref } from 'vue'

const dialog = ref(false)
const dialogId = ref('')

const openDialog = () => {
  dialogId.value = ''
  dialog.value = true
}
</script>

<style>

</style>
