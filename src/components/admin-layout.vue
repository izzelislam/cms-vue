<template>
  <div class="flex relative">
    <div class="w-64 h-screen bg-white shadow-lg p-4 sticky top-0">
      <div class="text-center py-12 ">
        <router-link to="/" class="flex justify-center">
          <img src="/sinau-dev.png" class="w-[160px]" alt="">
        </router-link>
      </div>
      <div class="text-gray-500">
        <ul>
          <li class="mb-3">
            <router-link to="/admin/dashboard" class="flex px-3 py-3 rounded-lg text-md" exact-active-class="bg-slate-900 text-slate-50">
              <vue-feather type="home" class="mr-2"></vue-feather> 
              <span>Home</span>
            </router-link>
          </li>
          <li class="mb-3">
            <router-link to="/admin/category" class="flex px-3 py-3 rounded-lg text-md" exact-active-class="bg-slate-900 text-slate-50">
              <vue-feather type="feather" class="mr-2"></vue-feather> 
              <span>Category</span>
            </router-link>
          </li>
          <li class="mb-3">
            <router-link to="/admin/article" class="flex px-3 py-3 rounded-lg text-md" exact-active-class="bg-slate-900 text-slate-50">
              <vue-feather type="file" class="mr-2"></vue-feather> 
              <span>Artikel</span>
            </router-link>
          </li>

          <!-- <li class="mb-3">
            <router-link to="/admin/comment" class="flex px-3 py-3 rounded-lg text-md" exact-active-class="bg-slate-900 text-slate-50">
              <vue-feather type="message-circle" class="mr-2"></vue-feather> 
              <span>Comment</span>
            </router-link>
          </li> -->
          <li class="mb-3">
            <router-link to="/admin/user" class="flex px-3 py-3 rounded-lg text-md" exact-active-class="bg-slate-900 text-slate-50">
              <vue-feather type="user" class="mr-2"></vue-feather> 
              <span>User</span>
            </router-link>
          </li>
          <li class="mb-3">
            <router-link to="/admin/setting" class="flex px-3 py-3 text-gray-500 rounded-xl" exact-active-class="bg-slate-900 text-slate-50">
              <vue-feather type="settings" class="mr-2"></vue-feather> 
              <span>Pengaturan</span>
            </router-link>
          </li>
        </ul>
      </div>
      <div class="mt-36 relative">
        <button @click="handleLogout" class="flex px-3 py-3 text-white rounded-lg text-md bg-red-500 w-full fixed bottom-0 right-2">
          <vue-feather type="log-out" class="mr-2"></vue-feather> 
          <span>Logout</span>
        </button>
      </div>
    </div>

    <div class="flex-1 bg-gray-100 relative">
      <div class="w-full h-20 bg-white flex flex-row-reverse items-center px-12 sticky top-0">
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
    <Loading v-if="loading" />
  </div>
</template>

<script setup>

  import { computed, onMounted } from "vue";
  import { useAuthStore } from "../store/auth";
import Loading from "./Loading.vue";

  const authStore = useAuthStore();
  const user   = computed(() => authStore.me)
  const loading = computed(() => authStore.loading);

  onMounted(() => {
    authStore.getMe()
  })

  const handleLogout = async () => {
    authStore.logout()
  };

</script>
