<template>
  <v-row class="pa-0 ma-0">
    <v-col cols="12" class="text-center pa-8">
      <h1>座位管理</h1>
      <v-divider></v-divider>
    </v-col>
    <v-col cols="12" >
      <v-btn color="green" @click="openDialog">新增座位</v-btn>
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
            <v-col cols="12">
              <v-text-field label="座號" clearable v-model="seat.value.value"
                :error-messages="seat.errorMessage.value"></v-text-field>
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
    .string()
    .required('缺少排數'),
  seat: yup
    .string()
    .required('缺少座號')
})

const { handleSubmit, isSubmitting, resetForm } = useForm({
  validationSchema: schema
})

const venue = useField('venue')
const area = useField('area')
const row = useField('row')
const seat = useField('seat')

const submit = handleSubmit(async (values) => {
  try {
    await apiAuth.post('/seats', {
      venue: values.venue,
      area: values.area,
      row: values.row,
      seat: values.seat
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
