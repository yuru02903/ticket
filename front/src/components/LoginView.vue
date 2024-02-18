<template>
  <v-container class="px-8 py-6">
    <v-row>
      <v-col class="text-mainColor" cols="12">
        <h1> 登入 </h1>
      </v-col>
      <v-col cols="12">
        <v-form :disabled="isSubmitting" @submit.prevent="submit" >
          <v-text-field
            class="mb-2"
            label="電子信箱" type="email" variant="underlined"
            prepend-icon="mdi-email-outline"
            v-model="email.value.value"
            :error-messages="email.errorMessage.value">
          </v-text-field>
          <v-text-field
            class="mb-4"
            label="密碼" minlength="8" maxlength="20" counter
            hint="密碼為8 ~ 20個英數字，區分大小寫" type="password" variant="underlined"
            prepend-icon="mdi-lock-outline"
            v-model="password.value.value"
            :error-messages="password.errorMessage.value">
          </v-text-field>
          <v-btn width="100%" type="submit" color="mainColor">登入</v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
// 表單驗證套件
import validator from 'validator'
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'
// { useRoute } => 取得此頁資訊; { useRouter } => 跳頁
// import { useRouter } from 'vue-router'
import { useSnackbar } from 'vuetify-use-dialog'
import { useApi } from '@/composables/axios'
import { useUserStore } from '@/store/user'

const { api } = useApi()
// const router = useRouter()
const createSnackbar = useSnackbar()
const user = useUserStore()

// 定義註冊表單的資料格式
const schema = yup.object({
  email: yup
    .string()
    .required('信箱為必填欄位')
    // .test(自訂驗證名稱, 錯誤訊息, 驗證function)
    .test(
      'isEmail', '信箱格式有誤',
      (value) => {
        return validator.isEmail(value)
      }
    ),
  password: yup
    .string()
    .required('密碼為必填欄位')
    .min(8, '密碼長度不符')
    .max(20, '密碼長度不符')
})

// 將表單的驗證方式與自訂的 schema 綁定
const { handleSubmit, isSubmitting } = useForm({
  validationSchema: schema
})

const email = useField('email')
const password = useField('password')

const submit = handleSubmit(async (value) => {
  try {
    const { data } = await api.post('/users/login', {
      email: value.email,
      password: value.password
    })
    user.login(data.result)
    createSnackbar({
      text: '登入成功',
      showCloseButton: false,
      snackbarProps: {
        timeout: 2000,
        color: 'green',
        location: 'top'
      }
    })
  } catch (error) {
    const text = error?.response?.data?.message || '發生錯誤，請稍後再試'
    createSnackbar({
      text,
      showCloseButton: false,
      snackbarProps: {
        timeout: 2000,
        color: 'red',
        location: 'top'
      }
    })
  }
})

</script>
