<template>
  
  <div class="flex justify-center items-center h-screen p-2 bg-gray-100">
    <div class="w-[350px] rounded-lg shadow-lg p-6 bg-white">

      <div v-if="alert" class="w-full px-5 py-3 bg-red-300 text-white rounded-2xl mb-6 flex justify-between">
        <p>{{ alert }}</p>
        <div @click="toogleAlert" class="cursor-pointer">
          <vue-feather type="x"></vue-feather>
        </div>
      </div>

      <h1 class="font-medium text-xl text-slate-900">Login</h1>
      <p class="mb-6 text-gray-400 text-sm">
        Please enter your  right email and password
      </p>
      <div>
        <Input title="Email" v-model="payload.email.value" @change="payload.email.error = ''" />
        <Input title="Password" v-model="payload.password.value" type="password" @change="payload.password.error = ''" />
        <div class="flex justify-end">
          <button @click="handleLogin" class="text-sm text-white bg-slate-900 px-8 py-2 rounded-lg hover:bg-slate-600 transition-all duration-200">Login</button>
        </div>
        <div class="my-1 flex justify-end">
          <router-link to="/" class="text-slate-400 text-sm">back to home</router-link>
        </div>
      </div>
    </div>
  </div>

</template>

<script setup>
  import { ref } from "vue"
  import axios from "axios";
  import { useRouter } from "vue-router";

  import { base_url } from "../../../util/index.js"
  import Input from '../../../components/Input.vue';
  
  const payload  = ref({
    email : {
      value : '',
      error : ''
    },
    password : {
      value : '',
      error : ''
    }
  })

  const alert  = ref('')

  function toogleAlert(){
    alert.value = ''
  }
  

  const route = useRouter()

  const handleLogin = async () => {
    try {
      let res = await axios.post(`${base_url}/login`, {
        email: payload.value.email.value,
        password: payload.value.password.value
      })

      // console.log(res.data.data.token);

      if (res.status == 200) {
        localStorage.setItem('token', res.data.data.token)
        route.push('/admin/dashboard')
      }

    } catch (error) {
      console.log(error.response.data.message);
      if (typeof(error.response.data.message) == 'object'){
        payload.value.email.error = error.response.data.message.email[0] ?? ''
        payload.value.password.error = error.response.data.message.password[0] ?? ''
      }else {
        alert.value = error.response.data.message
      }

    }
  }

</script>