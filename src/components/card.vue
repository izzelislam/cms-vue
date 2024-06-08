<template>
  <div class="w-full p-5 bg-white rounded-2xl">
    <div class="mb-6 flex justify-between">
      <h1>{{ title }}</h1>
      <slot name="header"></slot>
      <div v-if="url">
        <router-link :to="url" class="btn-primary"> <vue-feather type="plus"></vue-feather> Tambah data</router-link>
      </div>
      <div v-if="back">
        <router-link :to="back" class="btn-primary"> <vue-feather type="arrow-left"></vue-feather> Kembali</router-link>
      </div>
    </div>
    <div>
      <slot/>
    </div>
  </div>
  
</template>

<script setup>

const props = defineProps({
  title: '',
  url  : '',
  back: ''
});

</script>