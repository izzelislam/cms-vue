<template>
  
  <div class="flex justify-center items-center h-screen p-2 bg-gray-100">
    <div class="w-[400px] rounded-lg shadow-lg p-6 bg-white">

      <div v-if="error" class="w-full px-5 py-3 bg-red-500 text-white rounded-lg mb-6 flex justify-between align-middle">
        <p>{{ error }}</p>
        <div @click="toogleAlert" class="cursor-pointer">
          <vue-feather type="x"></vue-feather>
        </div>
      </div>

      <div class="text-center flex flex-col">
        <img class="w-[180px] self-center  mb-4" src="/sinau-dev.png" alt="">
        <!-- <h1 class="font-medium text-2xl text-slate-900 mb-2">Login</h1> -->
        <p class="mb-6 text-gray-400 text-sm">
          Please enter your  right email and password
        </p>
      </div>
      <div>
        <Input title="Email" v-model="data.email" @change="errors.email = ''" :error="errors?.email" />
        <Input title="Password" v-model="data.password" type="password" @change="errors.password = ''" :error="errors?.password" />
        <div class="flex justify-end">
          <button @click="handleLogin" class="text-sm text-white bg-slate-900 px-6 py-3 rounded-lg hover:bg-slate-600 transition-all duration-200 flex align-middle" :class="{ 'opacity-50': loading }" :disabled="loading">
            <Icon v-if="loading" icon="eos-icons:loading" width="24" height="24"  style="color: #fff" class="mr-2" />
            <span class="pt-[0.5px]">Login</span>
          </button>
        </div>
        <div class="my-1 flex justify-end">
          <router-link to="/" class="text-slate-400 text-sm">back to home</router-link>
        </div>
      </div>
    </div>
    <!-- <Loading v-if="loading"/> -->
  </div>

</template>

<script setup>
  import { computed, reactive } from "vue"
  import { useRouter } from "vue-router";
  import Input from '../../../components/Input.vue';
  import { useAuthStore } from "../../../store/auth";
  import Loading from "../../../components/Loading.vue";
  import { Icon } from '@iconify/vue';
  
  const initState = {
    "email" : "",
    "password" : ""
  };

  const authStore = useAuthStore();
  const route = useRouter()

  const data = reactive({...initState})
  const errors = computed(() => authStore.errors);
  const error  = computed(() => authStore.error);
  const loading = computed(() => authStore.loading);
  // const loading = computed(() => true);

  // console.log(loading.value);

  async function handleLogin() {
    try {
      await authStore.login(data)
      route.push('/admin/dashboard')
    } catch (error) {
    }
  }

  const toogleAlert = () => {
    authStore.error = ''
  };

</script>