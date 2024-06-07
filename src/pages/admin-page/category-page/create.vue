<template>
  <div v-if="alert" class="w-full px-5 py-3 bg-teal-500 text-white rounded-2xl mb-6 flex justify-between">
    <p>Data berhasil disimpan</p>
    <div @click="toogleAlert" class="cursor-pointer">
      <vue-feather type="x"></vue-feather>
    </div>
  </div>

  <div class="w-full p-5 bg-white rounded-2xl">
    <div class="mb-6 flex justify-between">
      <h1>Daftar Category</h1>
      <router-link to="/admin/category" class="text-white bg-teal-500 px-8 py-2 rounded-lg flex items-center mr-6"> <vue-feather type="arrow-left"></vue-feather> kembali</router-link>
    </div>
    <div>

      <div class="mb-6">
        <label for="" class="text-gray-500">Name</label>
        <div class="mt-3">
          <input v-model="formData" type="text" class="w-full border-2 border-gray-300 rounded-lg p-2">
        </div>
      </div>

      <div>
        <button @click="handleSubmit" class="text-white bg-teal-500 px-8 py-2 rounded-lg">Simpan</button>
      </div>

    </div>
  </div>
</template>

<script setup>
  import axios from "axios";
  import {ref} from "vue"
  import { base_url } from "../../../util";
  import { useRouter } from "vue-router";
  import {useToast} from 'vue-toast-notification';
  import 'vue-toast-notification/dist/theme-sugar.css';

  const config ={
    position: 'top-right',
    dismissible: true,
    duration: 2000,
  }
  const toast = useToast(config);
  const router = useRouter()

  const alert = ref(false)
  const formData = ref('')

  const  toogleAlert = () => {
    alert.value = !alert.value
  }

  const handleSubmit = async () => {
    try {
      let response = await axios.post(`${base_url}/categories`, {
        name: formData.value
      }, {
        headers: {
          'Authorization': `bearer ${localStorage.getItem('token')}`
        }
      })

      if (response.status == 201){
        toast.success(response.data.message);
        router.push('/admin/category')
      }
      
    } catch (error) {
      config.type = 'error'
      toast.success(error.response.data.message);
    }
  }



</script>