<script setup>
import { computed } from "vue"

const props = defineProps({
  argument: Object,
})

const displayValue = computed(() => {
  return JSON.stringify(props.argument.value)
})
</script>

<template>
  <div v-if="typeof argument == 'object' && argument['name']" class="inline-flex items-center gap-1">
    <span class="">{{ argument.name }}</span>
    <span class="rounded text-xs bg-gray-100 px-1 py-0.5">{{ displayValue }}</span>
  </div>
  <div v-else>{{ displayValue }}</div>
</template>
