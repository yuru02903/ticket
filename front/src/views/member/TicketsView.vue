<template>
  <v-row class="pa-0 ma-0">
    <v-col cols="12" class="pa-8">
      <h1>票券管理</h1>
      <v-divider></v-divider>
      <v-card class="mx-auto" width="80%">
        <v-list>
          <v-list-group value="MyTickets">
            <template v-slot:activator="{ props }">
              <v-list-item v-bind="props" title="我的票券"></v-list-item>
            </template>
            <v-list-item>
              <v-row>
                <v-col cols="12">
                  <v-btn color="green" @click="openDialog">新增票券</v-btn>
                </v-col>
              </v-row>
            </v-list-item>
          </v-list-group>
          <v-list-group value="Admin">
            <template v-slot:activator="{ props }">
              <v-list-item v-bind="props" title="轉讓紀錄">
              </v-list-item>
            </template>
          </v-list-group>
        </v-list>
      </v-card>
    </v-col>
  </v-row>

  <v-dialog v-model="dialog">
    <v-form>
      <v-card>
        <v-card-title>{{ dialogId === '' ? '新增票券' : '編輯票券' }}</v-card-title>
        <v-card-text>
          <v-text-field label="名稱"></v-text-field>
          <v-text-field label="原始票價" type="number" min="0"></v-text-field>
          <v-text-field label="售價" type="number" min="0"></v-text-field>
          <v-select></v-select>
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
