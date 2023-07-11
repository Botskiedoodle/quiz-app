<template>
  <div class="mt-8">
    <div
      class="bg-white rounded-lg p-8 shadow-md"
      v-for="(quizItem, questionIndex) in props.quiz"
      :key="quizItem.question"
      v-show="questionsAnswered == questionIndex"
    >
      <!-- <div class="category">The Category is {{ quizItem.category }}</div> -->
      <div class="mb-4">
        <div class="text-2xl font-bold" v-html="quizItem.question"></div>
      </div>
      <div class="grid grid-cols-2 gap-4">
        <div
          class="bg-blue-500 rounded-lg py-4 px-6 text-white text-center font-bold cursor-pointer hover:bg-blue-600"
          v-for="answer in quizItem.answers"
          :key="answer.id"
          v-html="answer"
          @click="handleAnswerPicked(quizItem.correct_answer, answer)"
        ></div>
      </div>
    </div>
  </div>
</template>
<script setup>
import {defineProps, defineEmits} from 'vue'

const emit = defineEmits(['handle-answer-picked'])

const props = defineProps({
  quiz: {
    type: Array,
    required: true,
    default: () => []
  },
  questionsAnswered: {
    type: Number,
    required: true,
    default: () => 0
  }
})

const handleAnswerPicked = (correctAnswer, pickedAnswer) => {
  emit('handle-answer-picked',{
    correctAnswer,
    pickedAnswer
  })
}


</script>