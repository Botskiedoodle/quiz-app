v<template>
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
        <button
          class="rounded-lg py-4 px-6 text-white text-center font-bold select-none"
          :class="
            !isAnswered
              ? 'bg-blue-500 hover:bg-blue-600 active:bg-blue-70'
              : isAnswered && answer === answers.correctAnswer
              ? 'bg-green-500'
              : answer === answers.pickedAnswer
              ? 'bg-red-500'
              : 'bg-gray-500'
          "
          v-for="answer in quizItem.answers"
          :key="answer"
          :disabled="isAnswered"
          v-html="answer"
          @click="handleAnswerPicked(quizItem.correct_answer, answer, quizItem.question)"
        ></button>
        <div
          v-show="isAnswered"
          class="bg-blue-400 rounded-lg py-4 px-6 text-white text-center font-bold cursor-pointer active:bg-blue-700 hover:bg-blue-600 select-none"
          @click="nextQuestion"
        >
          Next
        </div>
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
import {reactive, computed} from 'vue'
import ConfirmAnswer from '@/components/ConfirmAnswer.vue'
const modalStore = useModalStore()
const emit = defineEmits(['handle-answer-picked', 'next-question'])

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
  },
  isAnswered: {
    type: Boolean,
    default: () => false
  }
})

// const userConfirmation = ref()
const handleConfirmAnswer = (confirmation) => {
  if(confirmation) {
    emit('handle-answer-picked', answers)
    modalStore.toggleVisibility();
  } else {
    modalStore.toggleVisibility();
  }
};


// change styling of correct answer
const handleCorrectAnswerStyle = computed(()=>{
  return 'bg-green-500'
})
// const handleCorrectAnswerStyle = () => {
//   if (answers.correctAnswer === answers.pickedAnswer) {
//     return 'bg-green-500'
//   } else {
//     return 'bg-red-500'
//   }
// }

const handleAnswerPicked = (correctAnswer, pickedAnswer, question) => {
  modalStore.toggleVisibility();
  answers.correctAnswer = correctAnswer
  answers.pickedAnswer = pickedAnswer
  answers.question = question
}

const nextQuestion = () => {
  emit('next-question')
}
</script>