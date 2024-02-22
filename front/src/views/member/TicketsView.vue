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
          <v-select label="表演者國籍" :items="categoryCountry"></v-select>
          <v-select label="表演者性質" :items="categoryGroup"></v-select>
          <v-checkbox label="是否上架"></v-checkbox>
          <v-textarea label="說明"></v-textarea>
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
import * as yup from 'yup'
import { useForm, useField } from 'vee-validate'

const dialog = ref(false)
const dialogId = ref('')

const openDialog = () => {
  dialogId.value = ''
  dialog.value = true
}

const categoryCountry = ['台灣', '韓國', '日本', '歐美', '泰國', '其他']
const categoryGroup = ['團體', '個人']

const schema = yup.object({
  name: yup
    .string()
    .required('缺少票券名稱'),
  original_price: yup
    .number()
    .typeError('票券原價格式錯誤，請填寫數字')
    .required('請填寫票券原價').min(0, '價格不能小於0'),
  price: yup
    .number()
    .typeError('票券售價格式錯誤，請填寫數字')
    .required('請填寫票券售價').min(0, '價格不能小於0'),
  description: yup
    .string()
    .required('缺少商品說明'),
  categoryCountry: yup
    .string()
    .required('請選擇表演者國籍')
    .test('isCategoryCountry', '表演者國籍有誤', value => categoryCountry.includes(value)),
  categoryGroup: yup
    .string()
    .required('請選擇表演者性質')
    .test('isCategoryGroup', '表演者性質有誤', value => categoryGroup.includes(value)),
  sell: yup
    .boolean()
})

const { handleSubmit, isSubmitting, resetForm } = useForm({
  validationSchema: schema,
  initialValues: {
    name: '',
    original_price: 0,
    price: 0,
    description: '',
    categoryCountry: '',
    categoryGroup: '',
    sell: false
  }
})

</script>

<style>

</style>
