<template>
  <div class="text-white">
    <div class="bg-zinc-600 p-4 rounded-lg my-4">
      <div class="text-lg font-bold mb-2">Sorry. Try again next time!</div>
      <slot name="prize"></slot>
      <!-- <div class="text-lg font-bold mb-2">You get to take home {{ props.lastQuestionDetails.prize }}</div> -->
      <div class="mb-2">Question: <span v-html="props.lastQuestionDetails.question"></span></div>
      <div class="mb-2">
        Correct Answer: <span v-html="props.lastQuestionDetails.correctAnswer"></span>
      </div>
      <div>
        Your Answer:
        <span class="text-red-500" v-html="props.lastQuestionDetails.pickedAnswer"></span>
      </div>
    </div>

    <div class="text-center">
      <button
        class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mb-8 mx-2"
        @click="resetQuiz"
      >
        Try again!
      </button>
      <button
        class="bg-neutral-500 hover:bg-neutral-700 text-white font-bold py-2 px-4 rounded mb-8 mx-2"
        @click="exitQuiz"
      >
        Exit to Main Menu
      </button>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  lastQuestionDetails: {
    type: Object,
    default: ()=> {}
  }
})
const emit = defineEmits(['reset-quiz', 'exit-quiz'])
const resetQuiz = () => {
  // console.log('reset called');
  emit('reset-quiz')
}

const exitQuiz = () => {
  emit('exit-quiz')
}
</script>
<style lang="scss"></style>