<template>
  <div class="mx-auto max-w-4xl px-4 mt-8">
    <div class="w-full bg-blue-500 h-4" v-if="questionsAnswered < quiz.length">
      <div
        :class="[
          'bg-blue-700',
          'h-full',
          'transition-width',
          'duration-300',
          'ease-in-out',
          'w-0',
          'sm:w-full'
        ]"
        :style="{ width: `${(questionsAnswered / quiz.length) * 100}%` }"
      ></div>
    </div>

    <!-- <div>{{ questionsAnswered }} out of {{ quiz.length }} questions answered</div> -->
    <div v-if="questionsAnswered < quiz.length" class="mx-auto max-w-4xl px-4 mt-8">
      <div
        class="bg-white rounded-lg p-8 shadow-md"
        v-for="(quizItem, questionIndex) in quiz"
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
    <div class="result" v-else>
      You've got {{ totalCorrectAnswer }} out of {{ quiz.length }}
      <div>
        Summary of your result:
        <div v-for="(quizItem, quizIndex) in quiz" :key="quizItem.index" class="my-4">
          <div>Question: {{ quizItem.question }}</div>
          <div>Correct Answer: {{ quizItem.correct_answer }}</div>
          <div>Your Answer: {{ userAnswers[quizIndex] }}</div>
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
  </div>
</template>
<script setup>
import axios from 'axios'
import {ref} from 'vue'
const questionsAnswered = ref(0)
const totalCorrectAnswer = ref(0)
const userAnswers = ref([])

const handleAnswerPicked = (correctAnswer, pickedAnswer) => {
  if(pickedAnswer == correctAnswer)
  {
    totalCorrectAnswer.value++
  }
  questionsAnswered.value++
  userAnswers.value.push(pickedAnswer)
}

// main quiz
const quiz = ref([])
const getQuiz = async () => {
 await axios.get('https://opentdb.com/api.php?amount=10&type=multiple')
  .then((res) => {
    let quizResponse = res.data.results
    quizResponse.forEach((question) => {
      question.answers = randomizeAnswers(question.correct_answer, question.incorrect_answers)
    })
    quiz.value = [...quizResponse]
  })
  // create a new array with all the answers
  // compare the answer to the correct answer
}

const randomizeAnswers = (correctAnswer, incorrectAnswers) => {
  let incorrect_answers = incorrectAnswers
  let correct_answer = correctAnswer
  let randomIndex = Math.floor(Math.random() * (incorrect_answers.length + 1));
  incorrect_answers.splice(randomIndex, 0, correct_answer)
  return incorrect_answers
}


const resetQuiz = () => {
  questionsAnswered.value = 0
  totalCorrectAnswer.value = 0
}


getQuiz()
</script>
<style scoped>
</style>
