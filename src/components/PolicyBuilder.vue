<script setup>
import ExpressionBuilder from "./ExpressionBuilder.vue"
const policy = defineModel({
  default: () => (
    {
      description: "This is a policy",
      effect: "allow",
      filter: [
        "user.id",
        "=",
        1234
      ],
    }
  )
})

const onFilterUpdate = (value) => {
  policy.value = { ...policy.value, filter: value }
}
</script>
<template>
  <div class="grid grid-cols-1 gap-6">
    <label class="block">
      <span class="text-gray-700">Description</span>
      <input type="text" class="block w-full h-8 py-2 px-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        v-model="policy.description" />
    </label>
    <label class="block">
      <span class="text-gray-700">Effect</span>
      <select class="block h-8 text-xs pr-7 leading-none rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        v-model="policy.effect">
        <option value="allow">Allow</option>
        <option value="deny">Deny</option>
      </select>
    </label>
    <label class="block">
      <span class="text-gray-700">Filter</span>
      <ExpressionBuilder :model-value="policy.filter" @update:model-value="onFilterUpdate" />
    </label>
  </div>
</template>
