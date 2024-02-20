<template>
  <v-container class="px-md-8 py-md-12 px-8 py-6" >
    <h1 class="text-mainColor"> 註冊 </h1>
    <v-form :disabled="isSubmitting" @submit.prevent="submit" >
      <v-text-field
        class="mb-sm-0 mb-md-2"
        label="帳號" minlength="4" maxlength="20" counter
        hint="請輸入4 ~ 20個英數字，區分大小寫" variant="underlined"
        prepend-icon="mdi-account-circle-outline"
        v-model="account.value.value"
        :error-messages="account.errorMessage.value">
      </v-text-field>
      <v-text-field
        class="mb-sm-0 mb-md-2"
        label="身分證" minlength="10" maxlength="10" counter
        type="password" variant="underlined"
        prepend-icon="mdi-card-account-details-outline"
        v-model="nationalIdNumber.value.value"
        :error-messages="nationalIdNumber.errorMessage.value">
      </v-text-field>
      <v-text-field
        class="mb-2"
        label="電子信箱" type="email" variant="underlined"
        prepend-icon="mdi-email-outline"
        v-model="email.value.value"
        :error-messages="email.errorMessage.value">
      </v-text-field>
      <v-text-field
        class="mb-2"
        label="密碼" minlength="8" maxlength="20" counter
        hint="請輸入8 ~ 20個英數字，區分大小寫" type="password" variant="underlined"
        prepend-icon="mdi-lock-outline"
        v-model="password.value.value"
        :error-messages="password.errorMessage.value">
      </v-text-field>
      <v-text-field
        class="mb-2"
        label="確認密碼" minlength="8" maxlength="20" counter type="password" variant="underlined"
        prepend-icon="mdi-lock"
        v-model="passwordConfirm.value.value"
        :error-messages="passwordConfirm.errorMessage.value">
      </v-text-field>
      <v-btn type="submit" color="mainColor" width="100%">註冊</v-btn>
    </v-form>
    <h5 v-if="isSmall" class="pt-4" style="color: gray;">已經註冊? 前往 <router-link to="/login" class="text-mainColor">登入</router-link></h5>
  </v-container>
</template>

<script setup>
// 表單驗證套件
import validator from 'validator'
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'
// 身分證驗證套件
import {
  isNationalIdentificationNumberValid // 身分證字號
  // isEInvoiceCellPhoneBarcodeValid, // 手機條碼
  // isCreditCardNumberValid // 信用卡
} from 'taiwan-id-validator'
// { useRoute } => 取得此頁資訊; { useRouter } => 跳頁
// import { useRouter } from 'vue-router'
import { useSnackbar } from 'vuetify-use-dialog'
import { useApi } from '@/composables/axios'
import { useUserStore } from '@/store/user'
import { useRouter } from 'vue-router'
import { computed } from 'vue'
import { useDisplay } from 'vuetify'

const { api } = useApi()

// const router = useRouter()
const createSnackbar = useSnackbar()

const router = useRouter()

const { smAndDown } = useDisplay()
const isSmall = computed(() => smAndDown.value)

// 定義註冊表單的資料格式
const schema = yup.object({
  account: yup
    .string()
    .required('帳號為必填欄位')
    .min(4, '使用者帳號長度不符')
    .max(20, '使用者帳號長度不符'),
  nationalIdNumber: yup
    .string()
    .required('身分證號為必填欄位')
    .test(
      'isNationalIdNumber', '身分證號格式有誤',
      (value) => {
        return isNationalIdentificationNumberValid(value)
      }
    ),
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
    .max(20, '密碼長度不符'),
  passwordConfirm: yup
    .string()
    .required('密碼為必填欄位')
    .min(8, '密碼長度不符')
    .max(20, '密碼長度不符')
    // .oneOf 只允許符合陣列內其中一個值
    // .oneOf(陣列, 錯誤訊息)
    // .ref('password') 代表這個 schema 的 password 欄位值
    .oneOf([yup.ref('password')], '密碼不一致')
})

// 將表單的驗證方式與自訂的 schema 綁定
const { handleSubmit, isSubmitting } = useForm({
  validationSchema: schema
})

const account = useField('account')
const nationalIdNumber = useField('nationalIdNumber')
const email = useField('email')
const password = useField('password')
const passwordConfirm = useField('passwordConfirm')

const user = useUserStore()

const submit = handleSubmit(async (value) => {
  try {
    await api.post('/users', {
      account: value.account,
      nationalIdNumber: value.nationalIdNumber,
      email: value.email,
      password: value.password
    })
    const { data } = await api.post('/users/login', {
      email: value.email,
      password: value.password
    })
    user.login(data.result)
    createSnackbar({
      text: '註冊成功，已登入',
      showCloseButton: false,
      snackbarProps: {
        timeout: 2000,
        color: 'green',
        location: 'top'
      }
    })
    router.push('/')
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
