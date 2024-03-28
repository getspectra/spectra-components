<script setup>
import { computed, ref } from "vue"
import SpectraExpressionDebugger from "./SpectraExpressionDebugger.vue"

const expand = ref(true)

const props = defineProps({
  policy: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(["toggle", "clickPermission"])

const toggle = () => {
  expand.value = !expand.value
  emit('toggle', props.policy)
}

const textColor = computed(() => {
  return props.policy.applied ? 'text-green-600' : 'text-orange-600'
})

const borderColor = computed(() => {
  return props.policy.applied ? 'border-green-500' : 'border-orange-500'
})

const backgroundColor = computed(() => {
  return props.policy.applied ? 'bg-green-100' : 'bg-orange-100'
})
</script>

<template>
  <div class="border flex flex-col rounded w-full overflow-hidden" :class="[borderColor, backgroundColor]">
    <a class="flex items-center justify-between p-4 cursor-pointer" @click="toggle">
      <div class="flex items-center text-gray-400">
        <div class="text-gray-800">{{ policy.description }}</div>
        <div>・</div>
        <div v-if="policy.applied">
          Applied + Permissions {{ policy.effect == 'allow' ? 'Allowed' : 'Denied' }}
        </div>
        <div v-else>Ignored</div>
      </div>
      <div>
        <div class="text-sm font-semibold flex items-center gap-2" :class="[textColor]">
          <span>{{ policy.effect.toUpperCase() }}</span>
          <div v-if="policy.applied" class="text-green-500">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"
              stroke-width="2">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M5 12l5 5l10 -10" />
            </svg>
          </div>
        </div>
      </div>
    </a>

    <div class="bg-white p-4 border-t flex flex-col divide-y" v-if="policy.applied && expand" :class="[borderColor]">
      <div class="py-4">
        <slot name="prepend-expressions"></slot>
        <SpectraExpressionDebugger :expression="policy.filter" />
        <slot name="append-expressions"></slot>
      </div>
      <slot>
        <section class="py-4">
          <h3 class="text-gray-800">{{ policy.effect == 'allow' ? 'Allowed' : 'Denied' }} permissions: </h3>
          <div class="flex flex-col gap-1 mt-2">
            <div v-for="permission in policy.permissions" :key="permission" class="text-gray-800">
              - <a class="cursor-pointer text-blue-500" @click="() => emit('clickPermission', permission)">{{ permission }}</a>
            </div>
          </div>
        </section>
      </slot>
    </div>
  </div>
</template>
