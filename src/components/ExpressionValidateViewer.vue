<script setup lang="ts">
import { ref } from "vue";
import Argument from './Argument.vue';
import BooleanLabel from './BooleanLabel.vue';

const props = defineProps({
  expression: {
    type: Object,
    required: true,
  },
  intendSize: { type: Number, default: 4 },
})

const expanded = ref(true)
const toggle = () => {
  expanded.value = !expanded.value
}

</script>

<template>
  <div class="font-mono flex flex-col gap-1 text-gray-600">
    <div v-if="expression.left">
      <div class="flex items-center space-x-2">
        <div class="text-gray-400">-</div>
        <BooleanLabel :value="expression.value" />
        <Argument :argument='expression.left' />
        <div class="text-pink-500">{{ expression.operation }}</div>
        <Argument :argument='expression.right' />
      </div>
    </div>

    <div v-if="expression.expressions">
      <div class="flex gap-1" :class="{ 'flex-col': expanded }">
        <a class="flex items-center gap-2 cursor-pointer" @click="toggle">
          <BooleanLabel :value="expression.value" />
          <div class="text-pink-500">{{ expression.name }}</div>
          <div class="text-gray-400">({{ expression.expressions.length }}) [</div>
          <div v-if="!expanded" class="text-xs leading-none text-gray-400 bg-gray-50 rounded p-0.5">...</div>
          <div v-else class="text-gray-400 bg-gray-50 rounded p-0.5">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
            </svg>
          </div>
        </a>
        <div class="ml-8 flex flex-col gap-1" v-show="expanded">
          <ExpressionValidateViewer v-for="(subExpression, index) in expression.expressions" :expression="subExpression" :key="index" />
        </div>
        <a @click="toggle" class="text-gray-400">]</a>
      </div>
    </div>

    <div v-if="expression.expression">
      <div class="flex gap-1" :class="{ 'flex-col': expanded }">
        <a class="flex items-center gap-2 cursor-pointer" @click="toggle">
          <div class="text-gray-400">-</div>
          <BooleanLabel :value="expression.value" />
          <div class="text-pink-500">{{ expression.name }}</div>
          <div class="text-gray-400">[</div>
          <div v-if="!expanded" class="text-xs leading-none text-gray-400 bg-gray-50 rounded p-0.5">...</div>
          <div v-else class="text-gray-400 bg-gray-50 rounded p-0.5">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
            </svg>
          </div>
        </a>
        <div class="ml-8 flex flex-col gap-1" v-show="expanded">
          <ExpressionValidateViewer :expression="expression.expression" />
        </div>
        <a @click="toggle" class="text-gray-400">]</a>
      </div>
    </div>
  </div>
</template>./BooleanLabel.vue
