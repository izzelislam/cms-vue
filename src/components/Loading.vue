<script setup>

import { Icon } from '@iconify/vue';

const props = defineProps({
  loading: {
    type: Boolean,
    default: false
  }
});

</script>

<template>
    <div class="fixed top-0 left-0 bottom-0 right-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-40">
        <div class="bg-white w-[130px] h-[130px] rounded-lg flex flex-col justify-center">
          <img class="w-[80px] self-center" src="/sinau-dev.png" alt=""/>
          <Icon icon="eos-icons:three-dots-loading" width="50" height="50"  style="color: #1f1f1f" class="self-center" />
        </div>
    </div>
</template>