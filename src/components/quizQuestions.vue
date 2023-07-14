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
      <div class="grid gap-4">
        <div
          class="bg-blue-500 rounded-lg py-4 px-6 text-white text-center font-bold cursor-pointer hover:bg-blue-600"
          v-for="answer in quizItem.answers"
          :key="answer.id"
          v-html="answer"
          @click="handleAnswerPicked(quizItem.correct_answer, answer, quizItem.question)"
        ></div>
      </div>
    </div>
    <confirm-answer
      v-if="modalStore.isVisible"
      @handle-confirm-answer="handleConfirmAnswer($event)"
    />
  </div>
</template>
<script setup>
import {useModalStore} from '@/stores/modal.js'
import {reactive} from 'vue'
import ConfirmAnswer from '@/components/ConfirmAnswer.vue'
const modalStore = useModalStore()

const emit = defineEmits(['handle-answer-picked'])
const answers = reactive({
  correctAnswer: '',
  pickedAnswer: '',
  question: ''
})

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
// const userConfirmation = ref()
const handleConfirmAnswer = (confirmation) => {
  if(confirmation) {
    emit('handle-answer-picked', answers )
    modalStore.toggleVisibility();
  } else {
    modalStore.toggleVisibility();
  }
};

const handleAnswerPicked = (correctAnswer, pickedAnswer, question) => {
  modalStore.toggleVisibility();
  answers.correctAnswer = correctAnswer
  answers.pickedAnswer = pickedAnswer
  answers.question = question
}

</script>