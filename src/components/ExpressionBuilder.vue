<script setup>
import { ref, watch } from 'vue'
import LogicType from './LogicType.vue'
import Operation from './Operation.vue'

const expression = defineModel({ default: () => ['', '=', ''] })
const props = defineProps({
  deleteable: {
    type: Boolean,
    default: false,
  },
})
const logicType = ref('simple')
const expanded = ref(true)

if (expression.value.and) logicType.value = 'and'
if (expression.value.or) logicType.value = 'or'
if (expression.value.not) logicType.value = 'not'

watch(logicType, (value) => {
  if (value === 'and' || value === 'or') {
    expression.value = { [value]: [['', '=', '']] }
  } else if (value === 'not') {
    expression.value = { not: ['', '=', ''] }
  } else {
    expression.value = ['', '=', '']
  }
})

const addItem = () => {
  if (logicType.value === 'simple') return
  if (logicType.value === 'not') return
  expression.value[logicType.value].push(['', '=', ''])
}

const removeItem = (index) => {
  if (logicType.value === 'simple') return
  if (logicType.value === 'not') return
  expression.value[logicType.value].splice(index, 1)
}
</script>

<template>
  <div class="flex flex-row items-start gap-2">
    <!-- simple binary -->
    <div class="flex items-start gap-4">
      <div v-if="logicType == 'simple'" class="flex items-center gap-2">
        <LogicType v-model="logicType" class="rounded" />
        <input type="text" class="block h-8 py-2 px-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          v-model="expression[0]" />
        <Operation v-model="expression[1]" class="rounded w-18" />
        <input type="text" class="block h-8 py-2 px-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          v-model="expression[2]" />
      </div>

      <!-- and/or/not -->
      <div v-else-if="['and', 'or'].includes(logicType)" class="flex flex-col gap-2 border p-4 rounded-lg shadow-sm">
        <div class="flex flex-1 justify-between items-center gap-2">
          <div class="flex items-center gap-4">
            <LogicType v-model="logicType" />
            <button @click="expanded = !expanded"
              class="inline-flex items-center text-gray-500 border border-gray-300 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 font-medium rounded text-sm p-1.5 text-center">
              <svg v-if="expanded" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none"
                stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M6 15l6 -6l6 6" />
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round"
                stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M5 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
                <path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
                <path d="M19 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
              </svg>
            </button>
            <div class="text-gray-400 mr-auto">
              <span v-if="logicType == 'and'">All of the following {{ expression[logicType].length }} rules:</span>
              <span v-else-if="logicType == 'or'">Any of the following {{ expression[logicType].length }} rules:</span>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <slot v-if="logicType !== 'simple'"></slot>
          </div>
        </div>

        <div v-show="expanded" class="flex flex-col items-start gap-2 ml-12">
          <ExpressionBuilder v-show="expanded" v-for="(exp, index) in expression[logicType]" v-model="expression[logicType][index]" :key="Date.now() + index">
            <button @click="() => removeItem(index)"
              class="inline-flex items-center text-red-400 border border-red-300 bg-red-100 hover:bg-red-200 focus:ring-4 focus:ring-red-200 font-medium rounded text-sm p-1.5 text-center"
              v-if="index > 0">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round"
                stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path
                  d="M20 6a1 1 0 0 1 .117 1.993l-.117 .007h-.081l-.919 11a3 3 0 0 1 -2.824 2.995l-.176 .005h-8c-1.598 0 -2.904 -1.249 -2.992 -2.75l-.005 -.167l-.923 -11.083h-.08a1 1 0 0 1 -.117 -1.993l.117 -.007h16z"
                  stroke-width="0" fill="currentColor" />
                <path d="M14 2a2 2 0 0 1 2 2a1 1 0 0 1 -1.993 .117l-.007 -.117h-4l-.007 .117a1 1 0 0 1 -1.993 -.117a2 2 0 0 1 1.85 -1.995l.15 -.005h4z" stroke-width="0"
                  fill="currentColor" />
              </svg>
            </button>
          </ExpressionBuilder>
          <button v-if="logicType !== 'simple'" @click="addItem"
            class="inline-flex items-center text-gray-500 border border-gray-300 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded text-sm p-1.5 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round"
              stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M12 5l0 14" />
              <path d="M5 12l14 0" />
            </svg>
          </button>
        </div>
      </div>

      <!-- and/or/not -->
      <div v-else-if="logicType == 'not'" class="flex w-full flex-col items-start gap-4 border p-4 rounded-lg shadow-sm">
        <div class="flex items-center gap-4">
          <LogicType v-model="logicType" />

          <div class="text-gray-400 mr-auto">
            <span>Not the following rule:</span>
          </div>
        </div>
        <!-- <span>-</span> -->
        <ExpressionBuilder v-model="expression[logicType]" class="ml-12" />
      </div>
    </div>
    <slot v-if="logicType == 'simple'"></slot>
  </div>
</template>
