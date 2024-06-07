<script setup>
</script>

<template>
  <button @click="emmit('click')" class="text-sm text-white bg-slate-900 px-8 py-2 rounded-lg hover:bg-slate-600 transition-all duration-200">{{ props.title }}</button>
</template>