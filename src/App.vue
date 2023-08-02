<template>
  <div class="flex justify-center items-center h-screen">
    <div v-if="!isQuizStart">
      <set-quiz @start-quiz="startQuiz" class="animate-spin-in" />
    </div>
    <!-- <spin-loader v-if="isLoading" /> -->
    <div v-else>
      <spin-loader v-if="isLoading" />
      <div v-else>
        <div class="flex justify-center items-center flex-col animate-spin-in" v-if="!endQuiz">
          <user-lives />
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
          :finished-quiz="finishedQuiz"
          :quiz-difficulty="numberOfItems(quizDifficulty)"
          @reset-quiz="resetQuiz"
          @exit-quiz="toggleQuizStart"
        >
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
import UserLives from '@/components/UserLives.vue'
import { useContenstantStore } from './stores/contestant'
const constestantStore = useContenstantStore()

import JSConfetti from 'js-confetti'

const jsConfetti = new JSConfetti()
jsConfetti.addConfetti()


const checkAchievements = () => {

// check if user failed
if(constestantStore.lives === 0 ){
  // check if the user did not answer a single correct answer

    if(totalCorrectAnswer.value == 0){
      if(constestantStore.achievementBadges.zeroPointsOnSingleQuiz.flag == 0){
        constestantStore.achievementBadges.zeroPointsOnSingleQuiz.flag  = 1
      }
      jsConfetti.addConfetti(
          {
          emojis: ['💩'],
        }
      )  
    }

}

// check for finished
if(finishedQuiz.value) {
  console.log(constestantStore.achievementBadges.finishTheQuizOnce.flag, 'store flag')
  if(constestantStore.achievementBadges.finishTheQuizOnce.flag == 0){
    constestantStore.achievementBadges.finishTheQuizOnce.flag = 1

    jsConfetti.addConfetti()
  }

  // check if user did not lost any lives
  if(constestantStore.lives === 3) {
    if(constestantStore.achievementBadges.untouchable.flag == 0) {
      constestantStore.achievementBadges.untouchable.flag = 1
      jsConfetti.addConfetti()
    }
  }

  // check for finishing the quiz on different difficulties
  if(quizDifficulty.value == 'easy'){
    if(constestantStore.achievementBadges.finishTheQuizOnEasy.flag  == 0) {
      constestantStore.achievementBadges.finishTheQuizOnEasy.flag = 1
      jsConfetti.addConfetti()
    }
  }

  if(quizDifficulty.value == 'medium'){
    if(constestantStore.achievementBadges.finishTheQuizOnMedium.flag == 0) {
      constestantStore.achievementBadges.finishTheQuizOnMedium.flag = 1
      jsConfetti.addConfetti()
    }
  }

  if(quizDifficulty.value == 'hard'){
    if(constestantStore.achievementBadges.finishTheQuizOnHard.flag == 0) {
      constestantStore.achievementBadges.finishTheQuizOnHard.flag = 1
      jsConfetti.addConfetti()
    }
  }

}
}





const initializeLives = () => {
  constestantStore.lives = 3
}

import axios from 'axios'
import {ref ,reactive} from 'vue'

const questionsAnswered = ref(0)
const totalCorrectAnswer = ref(0)
const userAnswers = ref([])


const endQuiz = ref(false)
const finishedQuiz = ref(false)
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
  } else {
    constestantStore.subtractLife()
    if(constestantStore.lives === 0){
      quizOutcome.question = question
      quizOutcome.correctAnswer = correctAnswer
      quizOutcome.pickedAnswer = pickedAnswer
      constestantStore.tracker.failedAttempts++
      checkAchievements()
      endQuiz.value = true
    }
  
  }

  if(questionsAnswered.value === numberOfItems(quizDifficulty.value)-1){
      finishedQuiz.value= true
      endQuiz.value = true
      checkAchievements()
    }


  isAnswered.value = true

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
  // set difficulty via amount combined with actual difficulty
const numberOfItems = (difficultyLevel) => {
  return {
    'easy': 5,
    'medium': 10,
    'hard': 15
  }[difficultyLevel]
}

const getQuiz = async (difficultyLevel) => {
 isQuizStart.value = true
 isLoading.value = true
 try {
  await axios.get(`${apiURL}&amount=${numberOfItems(difficultyLevel)}&difficulty=${difficultyLevel}`)
  .then((res) => {
    let quizResponse = res.data.results
    quizResponse.forEach((question) => {
      question.answers = randomizedAnswers(question.correct_answer, question.incorrect_answers)
    })
    quiz.value = [...quizResponse]
    // questionsAnsweredReverse.value = quiz.value.length - 1
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
  finishedQuiz.value= false
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
