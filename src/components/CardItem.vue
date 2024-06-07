<script setup>

const proops = defineProps({
  item: {
    type: Object,
    default: () => {}
  }
});

</script>

<template>
  <div class="shadow-lg rounded-lg bg-white">
    <router-link :to="`/article/${item.id}`">
      <div>
        <img class="rounded-lg" :src="item.image_url" :alt="item_slug">
      </div>

      <div class="p-4">
        <h1 class="text-md font-medium text-slate-900 line-clamp-2 leading-6">{{ item.title }}</h1>
      </div>

      <div class="p-4 flex justify-between">
        <div class="flex items-center">
          <div class="mr-3">
            <img class="w-12 h-12 rounded-full object-cover" src="https://upload.wikimedia.org/wikipedia/id/thumb/d/d5/Aang_.jpg/300px-Aang_.jpg" alt="">
          </div>
          <div>
            <div class="text-gray-500">toloc@mail.com</div>
            <div class="text-xs text-gray-400">penulis</div>
          </div>
        </div>
          <div>
            <span class="py-1 px-3 bg-amber-500 text-white rounded-lg text-xs">Flutter</span>
          </div>
      </div>
    </router-link>
  </div>
</template>