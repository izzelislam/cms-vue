<template>
  <div class="flex">
    <div class="w-64 h-screen bg-white shadow-lg p-4">
      <div class="text-center py-12">
        <h1 class="text-2xl font-bold text-teal-500">NewsQU</h1>
      </div>
      <div class="text-gray-500">
        <ul>
          <li class="mb-3">
            <router-link to="/admin/dashboard" class="flex px-3 py-3 rounded-xl" exact-active-class="bg-teal-400 text-white">
              <vue-feather type="home" class="mr-2"></vue-feather> 
              <span>Home</span>
            </router-link>
          </li>
          <li class="mb-3">
            <router-link to="/admin/category" class="flex px-3 py-3 rounded-xl" exact-active-class="bg-teal-400 text-white">
              <vue-feather type="feather" class="mr-2"></vue-feather> 
              <span>Category</span>
            </router-link>
          </li>
          <li class="mb-3">
            <router-link to="/admin/article" class="flex px-3 py-3 rounded-xl" exact-active-class="bg-teal-400 text-white">
              <vue-feather type="file" class="mr-2"></vue-feather> 
              <span>Artikel</span>
            </router-link>
          </li>

          <li class="mb-3">
            <router-link to="/admin/comment" class="flex px-3 py-3 rounded-xl" exact-active-class="bg-teal-400 text-white">
              <vue-feather type="message-circle" class="mr-2"></vue-feather> 
              <span>Comment</span>
            </router-link>
          </li>
          <li class="mb-3">
            <router-link to="/admin/user" class="flex px-3 py-3 rounded-xl" exact-active-class="bg-teal-400 text-white">
              <vue-feather type="user" class="mr-2"></vue-feather> 
              <span>User</span>
            </router-link>
          </li>
          <li class="mb-3">
            <router-link to="/" class="flex px-3 py-3 text-gray-500 rounded-xl">
              <vue-feather type="settings" class="mr-2"></vue-feather> 
              <span>Pengaturan</span>
            </router-link>
          </li>
        </ul>
      </div>
      <div class="mt-36">
        <button @click="handleLogout" class="flex px-3 py-3 text-white rounded-xl bg-red-400 w-full">
          <vue-feather type="log-out" class="mr-2"></vue-feather> 
          <span>Logout</span>
        </button>
      </div>
    </div>

    <div class="flex-1 bg-gray-100">
      <div class="w-full h-20 bg-white flex flex-row-reverse items-center px-12">
        <div>
          <div class="flex items-center">
            <vue-feather type="user" class="mr-2"></vue-feather> {{ user.email ?? '' }}
          </div>
        </div>
      </div>
      <div class="container my-8">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script setup>

  import { computed, onMounted } from "vue";
  import { useRouter } from "vue-router";
  import axios from "axios";
  import { base_url } from "../util";
  import { useUserStore } from "../store/user";

  // import {useToast} from 'vue-toast-notification';
  // import 'vue-toast-notification/dist/theme-sugar.css';

  const userStore = useUserStore()
  const router = useRouter()
  const user   = computed(() => userStore.user)

  onMounted(() => {
    getMeData()
  })

  const getMeData = async () => {
    try {
      let response = await axios.get(`${base_url}/me`,{
        headers: {
          'Authorization': `bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.status == 200) {
        // set data to pinia userstore
        userStore.setUser( response.data.data )
        // console.log(userStore.user);
      }

    } catch (error) {
      console.log(error);
      if (error.response.status == 401) {
        localStorage.removeItem('token')
        router.push('/login')
      }
    } 
  }

  // const toast = useToast();
  // let instance = toast.success('You did it!');

  // // Force dismiss specific toast
  // instance.dismiss();

  // // Dismiss all opened toast immediately
  // toast.clear();

  const handleLogout = async () => {
    try {
      let res = await axios.post(`${base_url}/logout`,null,{
        headers: {
          'Authorization': `bearer ${localStorage.getItem('token')}`
        }
      })

      if (res.status == 200) {
        localStorage.removeItem('token')
        router.push('/login')
      }

    } catch (error) {
      alert(error.response.data.message)
      if (error.response.data.message == 'Unauthenticated.'){
        localStorage.removeItem('token')
        router.push('/login')
      }
    }
  }

</script>
