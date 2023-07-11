<template>
  <div>
    You've got {{ props.totalCorrectAnswer }} out of {{ props.quiz.length }}
    <div>
      Summary of your result:
      <div v-for="(quizItem, quizIndex) in props.quiz" :key="quizItem.index" class="my-4">
        <div>Question: {{ quizItem.question }}</div>
        <div>Correct Answer: {{ quizItem.correct_answer }}</div>
        <div>Your Answer: {{ props.userAnswers[quizIndex] }}</div>
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
import {defineProps, defineEmits} from 'vue'


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

</script>