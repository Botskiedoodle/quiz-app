<template>
  <div class="mx-auto max-w-4xl px-4 mt-8">
    <div v-if="isLoading">Loading the quiz...</div>
    <div v-else>
      <!-- Progress -->
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
      <div>
        <quiz-questions
          v-if="questionsAnswered < quiz.length"
          :quiz="quiz"
          @handle-answer-picked="handleAnswerPicked($event)"
          :questions-answered="questionsAnswered"
        />

        <quiz-result
          v-else
          :quiz="quiz"
          :total-correct-answer="totalCorrectAnswer"
          :user-answers="userAnswers"
          @reset-quiz="resetQuiz"
        />
      </div>
    </div>
  </div>
</template>
<script setup>
import QuizQuestions from './components/quizQuestions.vue'
import QuizResult from './components/quizResult.vue'
import axios from 'axios'
import {ref} from 'vue'
const questionsAnswered = ref(0)
const totalCorrectAnswer = ref(0)
const userAnswers = ref([])
const isLoading = ref(false)

const handleAnswerPicked = ({correctAnswer, pickedAnswer}) => {
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
 isLoading.value = true
 try {
  await axios.get('https://opentdb.com/api.php?amount=10&type=multiple')
  .then((res) => {
    let quizResponse = res.data.results
    quizResponse.forEach((question) => {
      question.answers = randomizeAnswers(question.correct_answer, question.incorrect_answers)
    })
    quiz.value = [...quizResponse]
    isLoading.value = false
  })
 } 
 catch (error ) { 
  isLoading.value = false
 }

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
  userAnswers.value = []
  getQuiz()
}


getQuiz()
</script>
<style scoped>
</style>
