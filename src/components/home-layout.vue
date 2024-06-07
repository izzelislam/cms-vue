<template>
  
  <header class="sticky top-0 w-full bg-white z-10">
    <div class="container flex justify-between align-middle">
      <router-link to="/">
        <img class="w-[140px] py-2" src="/sinau-dev.png" alt="">
      </router-link>
      <ul class="hidden md:flex items-center">
        <li class="py-2 relative group">
          <router-link to="/" class="text-md text-semibold text-slate-900 mx-4 hover:text-blue-500 group">Home</router-link>
        </li>
        <li class="py-2">
          <router-link to="/article" class="text-md text-semibold text-slate-900 mx-4 hover:text-blue-500">Tutorial</router-link>
        </li>
        <li class="py-2">
          <router-link to="/" class="text-md text-semibold text-slate-900 mx-4 hover:text-blue-500">Kategori</router-link>
        </li>
        <li class="py-2">
          <router-link to="/about" class="text-md text-semibold text-slate-900 mx-4 hover:text-blue-500">About</router-link>
        </li>
        <li class="py-2">
          <router-link to="/login">
            login
          </router-link>
        </li>
      </ul>
    </div>
  </header>

  <!-- <router-view></router-view> -->
  <router-view :key="$route.fullPath"></router-view>

  <footer class="bg-slate-900 py-12">
    <div class="container flex justify-center gap-4text-medium text-slate-100">
      <dir>Home</dir>
      <dir>Tutorial</dir>
      <dir>Kategori</dir>
      <dir>About</dir>
    </div>
  </footer>
  <footer class="bg-[#0c1423] py-2">
    <div class="text-slate-300 text-center text-sm ">
      2024 alright reserved
    </div>
  </footer>

</template>

<style scoped>
@import "auto-typer-vue3/dist/style.css";
</style>

<script setup>
</script>