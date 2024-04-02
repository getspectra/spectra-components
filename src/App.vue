<script setup lang="ts">
import { ref, watch } from 'vue';
import PolicyBuilder from './components/PolicyBuilder.vue';
import PolicyValidateViewer from './components/PolicyValidateViewer.vue';

const inputText = ref('')
const policy = ref()
const error = ref(null)

watch(inputText, (newVal) => {
  policy.value = null
  error.value = null

  try {
    policy.value = JSON.parse(newVal)
  } catch (e) {
    error.value = e
  }
})

const policyBuilderTest = ref({
  "description": "Allow if the user is an admin",
  "effect": "allow",
  "filter": ["user.id", '<>', 1],
  "permissions": [
    {
      "description": "Allow if the user is an admin",
      "effect": "allow",
      "applied": true
    }
  ]
})
</script>

<template>
  <header class="border-b">
    <nav class="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
      <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
        <a href="/" class="flex items-center">
          <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Spectra Debugger</span>
        </a>

        <div class="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1" id="mobile-menu-2">
          <ul class="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
            <li>
              <a href="https://github.com/overtrue/spectra" target="_blank"
                class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">GitHub</a>
            </li>
            <li>
              <a href="https://github.com/overtrue" target="_blank"
                class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Author</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>

  <section class="my-8 mx-auto max-w-screen-xl flex flex-col gap-4">
    <h2 class="text-xl font-semibold text-gray-900 dark:text-white">Policy debug report:</h2>
    <textarea id="description" v-model="inputText" rows="8"
      class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      placeholder="Paste the policy debug report here..."></textarea>

    <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
      <div class="font-bold">JSON 格式错误!</div>
      <span class="block sm:inline">{{ error }}</span>
      <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
        <svg class="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <title>Close</title>
          <path
            d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
        </svg>
      </span>
    </div>

    <div v-if="policy">
      <h2 class="text-xl font-semibold text-gray-900 dark:text-white">Results</h2>
      <div class="flex items-center justify-between mt-8">
        <PolicyValidateViewer :policy="policy" />
      </div>
    </div>
  </section>

  <section class="my-8 mx-auto max-w-screen-xl flex flex-col gap-4">
    <PolicyBuilder v-model="policyBuilderTest" />
  </section>
</template>
