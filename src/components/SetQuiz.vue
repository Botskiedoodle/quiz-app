<template>
  <div
    class="w-full h-full bg-white flex flex-col text-center justify-center rounded-lg p-8 shadow-md select-none"
  >
    <div v-if="!isAchievementVisible">
      <div class="text-3xl font-bold text-center mt-4">Welcome to the</div>
      <div class="text-5xl font-extrabold text-center mt-6">BEST TRIVIA QUIZ EVER!</div>

      <div class="flex justify-center mt-2 flex-col items-center gap-4">
        <div v-if="showSetDifficulty" class="flex flex-col items-center gap-4">
          <div class="text-lg text-center mt-4">Set your difficulty level</div>
          <div class="relative">
            <select
              v-model="difficultyLevel"
              class="block text-center appearance-none w-32 bg-white border border-gray-400 hover:border-gray-500 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="easy" label="Easy">Easy</option>
              <option value="medium" label="Medium">Medium</option>
              <option value="hard" label="Hard">Hard</option>
            </select>
          </div>
          <button
            class="px-6 w-32 p-2 bg-blue-500 hover:bg-blue-600 text-white rounded shadow focus:outline-none focus:shadow-outline"
            @click="startQuiz"
          >
            Let's go!
          </button>
        </div>
        <div v-else class="flex flex-col">
          <button
            class="px-6 py-2 mt-4 bg-blue-500 hover:bg-blue-600 text-white rounded shadow focus:outline-none focus:shadow-outline"
            @click="onStartQuiz"
          >
            Start Quiz!
          </button>
          <button
            class="px-6 py-2 mt-4 bg-amber-600 hover:bg-amber-700 text-white rounded shadow focus:outline-none focus:shadow-outline"
            @click="viewAchievements"
          >
            View my Achievements!
          </button>
        </div>
      </div>
    </div>
    <BadgesPage v-else @back-to-main-menu="backToMainMenu" />
  </div>
</template>
<script setup>
import {ref} from 'vue'
import BadgesPage from './BadgesPage.vue';
const showSetDifficulty = ref(false)
const difficultyLevel = ref('medium')
const emit = defineEmits(['start-quiz'])

const onStartQuiz = () => {
  showSetDifficulty.value = true
}

const startQuiz = () => {
  emit('start-quiz', difficultyLevel.value)
}

const isAchievementVisible = ref(false)
const viewAchievements = () => {
  isAchievementVisible.value = true
}

const backToMainMenu = () => {
  isAchievementVisible.value = false
}
</script>