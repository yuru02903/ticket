<template>
  <v-row class="py-8 px-4 ma-0">
    <v-col cols="12" class=" ">
      <h1>座位管理</h1>
      <v-divider></v-divider>
    </v-col>
    <v-col cols="12" >
      <v-btn color="green" @click="openDialog">新增座位</v-btn>
    </v-col>
    <v-col cols="12">
      <v-data-table-server></v-data-table-server>
    </v-col>
  </v-row>

  <v-dialog v-model="dialog" width="500px">
    <v-form :disabled="isSubmitting" @submit.prevent="submit">
      <v-card>
        <v-card-title>{{ dialogId === '' ? '新增座位' : '編輯座位' }}</v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12">
              <v-text-field label="場館名稱" clearable v-model="venue.value.value"
                :error-messages="venue.errorMessage.value"></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field label="區域" clearable v-model="area.value.value"
                :error-messages="area.errorMessage.value"></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field label="排數" clearable v-model="row.value.value"
                :error-messages="row.errorMessage.value"></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field label="開始座號" clearable v-model="seat1.value.value"
                :error-messages="seat1.errorMessage.value"></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field label="結束座號" clearable v-model="seat2.value.value"
                :error-messages="seat2.errorMessage.value"></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" :disabled="isSubmitting" @click="closeDialog">取消</v-btn>
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

const closeDialog = () => {
  dialog.value = false
  resetForm()
}

const schema = yup.object({
  venue: yup
    .string()
    .required('缺少場館名稱'),
  area: yup
    .string()
    .required('缺少區域名稱'),
  row: yup
    .number()
    .typeError('格式錯誤，請填寫數字')
    .required('缺少排數'),
  seat1: yup
    .number()
    .typeError('格式錯誤，請填寫數字')
    .required('缺少開始座號'),
  seat2: yup
    .number()
    .typeError('格式錯誤，請填寫數字')
    .required('缺少結束座號')
})

const { handleSubmit, isSubmitting, resetForm } = useForm({
  validationSchema: schema
})

const venue = useField('venue')
const area = useField('area')
const row = useField('row')
const seat1 = useField('seat1')
const seat2 = useField('seat2')

const submit = handleSubmit(async (values) => {
  try {
    for (let i = values.seat1; i <= values.seat2; i++) {
      await apiAuth.post('/seats', {
        venue: values.venue,
        area: values.area,
        row: values.row,
        seat: i
      })
    }
    createSnackbar({
      text: dialogId.value === '' ? '新增成功' : '編輯成功',
      showCloseButton: false,
      snackbarProps: {
        timeout: 2000,
        color: 'green',
        location: 'bottom'
      }
    })
    closeDialog()
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
