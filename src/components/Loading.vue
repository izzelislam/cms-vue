<script setup>

const props = defineProps({
  loading: {
    type: Boolean,
    default: false
  }
});

</script>

<template>
    <div class="fixed top-0 left-0 bottom-0 right-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-40">
        <div class="bg-white w-[140px] h-[100px] rounded-lg flex flex-col justify-center">
          <img class="w-[100px] self-center" src="/sinau-dev.png" alt=""/>
          <div>
            <p class="text-center text-sm text-gray-600 pt-3">Loading...</p>
          </div>
        </div>
    </div>
</template>