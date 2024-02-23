<template>
  <v-row class="pa-0 ma-0">
    <v-col cols="12" class="pa-8">
      <h1>票券管理</h1>
      <v-divider></v-divider>
    </v-col>
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
  </v-row>

  <v-dialog v-model="dialog" width="500px">
    <v-form :disabled="isSubmitting" @submit.prevent="submit">
      <v-card>
        <v-card-title>{{ dialogId === '' ? '新增票券' : '編輯票券' }}</v-card-title>
        <v-card-text>
          <v-text-field label="名稱" v-model="name.value.value"
            :error-messages="name.errorMessage.value"></v-text-field>
          <v-text-field label="原始票價" type="number" min="0" v-model="originalPrice.value.value"
            :error-messages="originalPrice.errorMessage.value"></v-text-field>
          <v-text-field label="售價" type="number" min="0" v-model="price.value.value"
            :error-messages="price.errorMessage.value"></v-text-field>
          <v-select label="表演者國籍" :items="CategoryCountry" v-model="categoryCountry.value.value"
            :error-messages="categoryCountry.errorMessage.value"></v-select>
          <v-select label="表演者性質" :items="CategoryGroup" v-model="categoryGroup.value.value"
            :error-messages="categoryGroup.errorMessage.value"></v-select>
          <v-checkbox label="是否上架" v-model="sell.value.value"
            :error-messages="sell.errorMessage.value"></v-checkbox>
          <v-textarea label="說明" v-model="description.value.value"
            :error-messages="description.errorMessage.value"></v-textarea>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" :disabled="isSubmitting">取消</v-btn>
          <v-btn color="green" type="submit" :loading="isSubmitting">送出</v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script setup>
import { ref } from 'vue'
import * as yup from 'yup'
import { useForm, useField } from 'vee-validate'
import { useApi } from '@/composables/axios'
import { useSnackbar } from 'vuetify-use-dialog'

const { apiAuth } = useApi()
const createSnackbar = useSnackbar()

const dialog = ref(false)
const dialogId = ref('')

const openDialog = () => {
  dialogId.value = ''
  dialog.value = true
}

const CategoryCountry = ['台灣', '韓國', '日本', '歐美', '泰國', '其他']
const CategoryGroup = ['團體', '個人']

const schema = yup.object({
  name: yup
    .string()
    .required('缺少票券名稱'),
  originalPrice: yup
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
    .test('isCategoryCountry', '表演者國籍有誤', value => CategoryCountry.includes(value)),
  categoryGroup: yup
    .string()
    .required('請選擇表演者性質')
    .test('isCategoryGroup', '表演者性質有誤', value => CategoryGroup.includes(value)),
  sell: yup
    .boolean()
})

const { handleSubmit, isSubmitting, resetForm } = useForm({
  validationSchema: schema,
  initialValues: {
    name: '',
    originalPrice: 0,
    price: 0,
    description: '',
    categoryCountry: '',
    categoryGroup: '',
    sell: false
  }
})

const name = useField('name')
const originalPrice = useField('originalPrice')
const price = useField('price')
const description = useField('description')
const categoryCountry = useField('categoryCountry')
const categoryGroup = useField('categoryGroup')
const sell = useField('sell')

const submit = handleSubmit(async (values) => {
  try {
    await apiAuth.post('/tickets', {
      name: values.name,
      originalPrice: values.originalPrice,
      price: values.price,
      description: values.description,
      categoryCountry: values.categoryCountry,
      categoryGroup: values.categoryGroup,
      sell: values.sell
    })
    createSnackbar({
      text: dialogId.value === '' ? '新增成功' : '編輯成功',
      showCloseButton: false,
      snackbarProps: {
        timeout: 2000,
        color: 'green',
        location: 'bottom'
      }
    })
  } catch (error) {
    console.log(error)
    const text = error?.response?.data?.message || '發生錯誤，請稍後再試'
    createSnackbar({
      text,
      showCloseButton: false,
      snackbarProps: {
        timeout: 2000,
        color: 'red',
        location: 'bottom'
      }
    })
  }
})

</script>

<style>

</style>
