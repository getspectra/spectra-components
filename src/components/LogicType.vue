<script setup>
const logic = defineModel({ default: 'simple' })

const logicTypes = ['simple', 'and', 'or', 'not']
</script>

<template>
  <select v-model="logic" class="h-8 text-xs pr-7 leading-none rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
    <option v-for="type in logicTypes" :key="type" :value="type">{{ type }}</option>
  </select>
</template>
