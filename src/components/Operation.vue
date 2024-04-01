<script setup>
const operation = defineModel({ default: '=' })

const operations = ['=', '!=', '<>', '>', '>=', '<', '<=', 'in', 'not_in']
</script>

<template>
  <select v-model="operation" class="block text-xs h-8 py-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
    <option v-for="op in operations" :key="op" :value="op">{{ op }}</option>
  </select>
</template>
