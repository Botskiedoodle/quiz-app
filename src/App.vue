<template>
  <div class="mx-auto max-w-4xl px-4 mt-8">
    <spin-loader v-if="isLoading" />
    <div v-else>
      <user-lives v-show="!endQuiz" />
      <!-- Progress
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
      </div>-->
      <div>
        <div v-if="!endQuiz" class="grid grid-cols-2 gap-4">
          <side-bar :questions-answered-reverse="questionsAnsweredReverse" />
          <quiz-questions
            :quiz="quiz"
            :is-answered="isAnswered"
            :questions-answered="questionsAnswered"
            @handle-answer-picked="handleAnswerPicked($event)"
            @next-question="handleNextQuestion"
          />
        </div>
        <quiz-outcome v-else :last-question-details="quizOutcome" @reset-quiz="resetQuiz">
          <template #prize>
            Prize:
            {{
              totalCorrectAnswer == 0
                ? `$ 0`
                : `$ ${prizeList[questionsAnsweredReverse + totalCorrectAnswer]}`
            }}
          </template>
        </quiz-outcome>
      </div>
    </div>
  </div>
</template>
<script setup>
import QuizQuestions from '@/components/QuizQuestions.vue'
import SpinLoader from '@/components/SpinLoader.vue'
import QuizOutcome from '@/components/QuizOutcome.vue'
// import QuizResult from '@/components/QuizResult.vue'
import UserLives from '@/components/UserLives.vue'
import SideBar from '@/components/SideBar.vue'
import { prizeList } from '@/data/prizeList';


import { useContenstantStore } from './stores/contestant'
const constestantStore = useContenstantStore()
const initializeLives = () => {
  constestantStore.lives = 3
}

import axios from 'axios'
import {ref ,reactive} from 'vue'

const questionsAnswered = ref(0)
const totalCorrectAnswer = ref(0)
const userAnswers = ref([])

const questionsAnsweredReverse = ref(0)
const endQuiz = ref(false)
const quizOutcome = reactive(
  {
    question: '',
    correctAnswer: '',
    pickedAnswer: ''
  }
)

const handleNextQuestion = () => {
  questionsAnswered.value++
  isAnswered.value = false
}
const isAnswered = ref(false)
const handleAnswerPicked = ({correctAnswer, pickedAnswer, question }) => {
  if(pickedAnswer == correctAnswer)
  {
    totalCorrectAnswer.value++
   
    questionsAnsweredReverse.value--
  } else {
    constestantStore.subtractLife()

    if(constestantStore.lives === 0){
      quizOutcome.question = question
      quizOutcome.correctAnswer = correctAnswer
      quizOutcome.pickedAnswer = pickedAnswer
      endQuiz.value = true
    }
  }
  // control this via emit of the next question
  isAnswered.value = true
  userAnswers.value.push(pickedAnswer) // this might not be needed anymore
}

// main quiz
const isLoading = ref(false)
const quiz = ref([])
const getQuiz = async () => {
 isLoading.value = true
 try {
  await axios.get('https://opentdb.com/api.php?amount=15&type=multiple&difficulty=easy')
  .then((res) => {
    let quizResponse = res.data.results
    quizResponse.forEach((question) => {
      question.answers = randomizedAnswers(question.correct_answer, question.incorrect_answers)
    })
    quiz.value = [...quizResponse]
    questionsAnsweredReverse.value = quiz.value.length - 1
    isLoading.value = false
  })
 } 
 catch (error ) { 
  isLoading.value = false
 }
}

const randomizedAnswers = (correctAnswer, incorrectAnswers) => {
  let incorrect_answers = incorrectAnswers
  let correct_answer = correctAnswer
  let randomIndex = Math.floor(Math.random() * (incorrect_answers.length + 1));
  incorrect_answers.splice(randomIndex, 0, correct_answer)
  return incorrect_answers
}

const resetQuiz = () => {
  isAnswered.value = false
  questionsAnswered.value = 0
  totalCorrectAnswer.value = 0
  userAnswers.value = []
  quizOutcome.question =''
  quizOutcome.correctAnswer = ''
  quizOutcome.pickedAnswer = ''
  endQuiz.value = false 
  initializeLives()
  getQuiz()
}

initializeLives()
getQuiz()
</script>
<style scoped>
</style>
