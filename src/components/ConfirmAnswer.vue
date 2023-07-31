<template>
  <div class="fixed inset-0 flex items-center justify-center z-50">
    <div class="bg-zinc-400 rounded-lg shadow-lg p-6">
      <h2 class="text-lg font-bold mb-4 text-white">Is that your final answer?</h2>
      <!-- <p class="mb-4">Modal content goes here...</p> -->
      <div class="flex justify-end">
        <button
          class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          @click="handleConfirmAnswer(true)"
        >
          Yes
        </button>
        <button
          class="px-4 py-2 bg-gray-300 text-gray-700 rounded ml-2 hover:bg-gray-400 text"
          @click="handleConfirmAnswer(false)"
        >
          No
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(['handle-confirm-answer'])

const handleConfirmAnswer = (confirmation) => {
  emit('handle-confirm-answer', confirmation)
}
</script>