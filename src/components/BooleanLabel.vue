<script setup lang="ts">
defineProps<{ value: boolean }>()
</script>
<template>
  <label class="rounded px-2 py-1 text-xs leading-tight text-white" :class="{
    'bg-green-500': value, 'bg-red-500': !value
  }">
    {{ value ? 'true' : 'false' }}
  </label>
</template>
