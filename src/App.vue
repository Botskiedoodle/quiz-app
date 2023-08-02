<template>
  <div class="flex justify-center items-center h-screen">
    <div v-if="!isQuizStart">
      <set-quiz @start-quiz="startQuiz" class="animate-spin-in" />
    </div>
    <!-- <spin-loader v-if="isLoading" /> -->
    <div v-else>
      <spin-loader v-if="isLoading" />
      <div v-else>
        <div class="flex justify-center items-centers gap-32 animate-spin-in" v-if="!endQuiz">
          <div>
            <user-lives />
          </div>
          <quiz-questions
            class="xl:w-[32em]"
            :quiz="quiz"
            :is-answered="isAnswered"
            :questions-answered="questionsAnswered"
            @handle-answer-picked="handleAnswerPicked($event)"
            @next-question="handleNextQuestion"
          />
        </div>
        <quiz-outcome
          class="animate-spin-in"
          v-else
          :last-question-details="quizOutcome"
          @reset-quiz="resetQuiz"
          @exit-quiz="toggleQuizStart"
        >
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
// remove side bar
// show badge
import QuizQuestions from '@/components/QuizQuestions.vue'
import SpinLoader from '@/components/SpinLoader.vue'
import QuizOutcome from '@/components/QuizOutcome.vue'
import SetQuiz from '@/components/SetQuiz.vue'

import { useContenstantStore } from './stores/contestant'
const constestantStore = useContenstantStore()

import JSConfetti from 'js-confetti'

const jsConfetti = new JSConfetti()

jsConfetti.addConfetti()


const checkAchievements = () => {

// check if user failed
if(constestantStore.lives === 0){
  // check if the user did not answer a single correct answer
  if(totalCorrectAnswer.value == 0) {
    if( constestantStore.achievementBadges.zeroPointsOnSingleQuiz == 0){
      constestantStore.achievementBadges.zeroPointsOnSingleQuiz = 1
    }
  jsConfetti.addConfetti(
          {
          emojis: ['💩'],
        }
      )
    }
}

}

// import QuizResult from '@/components/QuizResult.vue'
import UserLives from '@/components/UserLives.vue'
import SideBar from '@/components/SideBar.vue'
import { prizeList } from '@/data/prizeList';



// console.log(constestantStore.failedAttempts)


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
      constestantStore.tracker.failedAttempts++
      endQuiz.value = true
    }
    checkAchievements()
  }
  // control this via emit of the next question
  isAnswered.value = true
  userAnswers.value.push(pickedAnswer) // this might not be needed anymore
}

// main quiz
const isLoading = ref(false)
const quiz = ref([])
const apiURL = 'https://opentdb.com/api.php?'

const isQuizStart = ref(false)
const quizDifficulty = ref('10')



const startQuiz = (difficultyLevel) => {

  quizDifficulty.value = difficultyLevel
  resetQuiz()
  initializeLives()
}

const getQuiz = async (difficultyLevel) => {
 isQuizStart.value = true
 isLoading.value = true
 try {
  await axios.get(`${apiURL}&amount=${difficultyLevel}`)
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
 isLoading.value = false
}

const randomizedAnswers = (correctAnswer, incorrectAnswers) => {
  let incorrect_answers = incorrectAnswers
  let correct_answer = correctAnswer
  let randomIndex = Math.floor(Math.random() * (incorrect_answers.length + 1));
  incorrect_answers.splice(randomIndex, 0, correct_answer)
  return incorrect_answers
}

// show badge before executing this
const resetQuiz = () => {
  getQuiz(quizDifficulty.value)
  isAnswered.value = false
  questionsAnswered.value = 0
  totalCorrectAnswer.value = 0
  userAnswers.value = []
  quizOutcome.question =''
  quizOutcome.correctAnswer = ''
  quizOutcome.pickedAnswer = ''
  endQuiz.value = false 
  isQuizStart.value  = true
  initializeLives()
}

// show badge before executing this
const toggleQuizStart = () => {
  isQuizStart.value  = false
}


</script>
<style scoped>
@keyframes spin-in {
  0% {
    opacity: 0;
    transform: rotateY(90deg);
  }
  100% {
    opacity: 1;
    transform: rotateY(0);
  }
}

.animate-spin-in {
  animation: spin-in 1s;
}
</style>
