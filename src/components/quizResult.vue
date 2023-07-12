<template>
  <div>
    <div class="bg-blue-500 text-white py-6 px-4 rounded my-8 text-2xl">
      You've got
      <span class="font-bold">{{ props.totalCorrectAnswer }}</span>
      out of
      <span class="font-bold">{{ props.quiz.length }}!</span>
    </div>

    <div class="font-bold m-4 text-2xl">{{ resultMessage }}</div>

    <div>
      <span class="font-bold m-4">Summary of your result:</span>

      <div v-for="(quizItem, quizIndex) in props.quiz" :key="quizItem.index" class="m-4">
        <div class="mb-2">{{ quizIndex + 1 }}. Question: <span v-html="quizItem.question" /></div>
        <div class="mb-2">Correct Answer: <span v-html="quizItem.correct_answer" /></div>
        <div class="mb-2">
          Your Answer:
          <span
            :class="{
              'text-green-500': props.userAnswers[quizIndex] === quizItem.correct_answer,
              'text-red-500': props.userAnswers[quizIndex] !== quizItem.correct_answer
            }"
            v-html="props.userAnswers[quizIndex]"
          ></span>
        </div>
      </div>
    </div>
    <div class="text-center">
      <button
        class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mb-8"
        @click="resetQuiz"
      >
        Reset the quiz
      </button>
    </div>
  </div>
</template>
<script setup>
import {defineProps, defineEmits, computed} from 'vue'


const emit = defineEmits(['reset-quiz'])

const props = defineProps({
  quiz: {
    type: Array,
    required: true,
    default: () => []
  },
  totalCorrectAnswer: {
    type: Number,
    required: true,
    default: () => 0
  },
  userAnswers: {
    type: Array,
    required: true,
    default: () => []
  }
})

const resetQuiz = () => {
  emit('reset-quiz')
}

const resultMessage = computed(()=>{
  let message = ''
  if (props.totalCorrectAnswer === 0 ) {
    message = 'Anyone there? Hello? Knock Knock.'
  } else if (props.totalCorrectAnswer > 0 && props.totalCorrectAnswer < 5) {
    message = 'Try harder! Dumbass.'
  } else if (props.totalCorrectAnswer > 6 && props.totalCorrectAnswer < 10) {
    message = 'Nice try. Getting there! Nerd.'
  } else if (props.totalCorrectAnswer == 10) {
    message = 'Woah! Goodjob! Nobody likes a know-it-all.'
  }
  return message
})

</script>