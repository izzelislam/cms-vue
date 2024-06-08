<script setup>
  defineProps({
    title: '',
    type: 'text',
    modelValue: '',
    error: ''
  });
</script>

<template>
  <div class="mb-6">
    <label for="" class="text-gray-500 text-xs">{{ title }}</label>
    <div class="mt-1">
      <input 
        :type="type" 
        :value="modelValue" @input="$emit('update:modelValue', $event.target.value)"
        class="w-full border-2 border-gray-200 rounded-xl p-2 outline-none focus:outline-none focus:border-slate-500 transition-all duration-200" :class="{ 'border-red-300': error}"/>
    </div>
    <div v-if="error" class="text-red-500 text-sm mt-2">
      {{ error[0] }}
    </div>
  </div>
</template>