<script setup>
defineProps({
  result: Boolean,
})
</script>
<template>
  <label class="rounded px-2 py-1 text-xs leading-tight text-white" :class="{
    'bg-green-500': result, 'bg-red-500': !result
  }">
    {{ result ? 'true' : 'false' }}
  </label>
</template>
