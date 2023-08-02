<template>
  <div class="p-4">
    <button
      class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
      @click="backToMainMenu"
    >
      Back to Main Menu
    </button>
    <div class="mt-4">Failed Attempts: {{ constestantStore.tracker.failedAttempts }}</div>
    <div class="mt-4 font-bold">Badges</div>
    <div class="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
      <BadgeComponent
        :badge-achievement="achievementBadges.zeroPointsOnSingleQuiz"
        :badge-image="'poop'"
      />

      <BadgeComponent
        :badge-achievement="achievementBadges.finishTheQuizOnce"
        :badge-image="'finish'"
      />

      <BadgeComponent :badge-achievement="achievementBadges.fiftyFiftyMaster" :badge-image="'50'" />
    </div>
  </div>
</template>
<script setup>
import { useContenstantStore } from '../stores/contestant'
import BadgeComponent from './BadgeComponent.vue';
// import {ref} from 'vue'
const constestantStore = useContenstantStore()

const emit = defineEmits(['back-to-main-menu'])

const backToMainMenu = () => {
  emit('back-to-main-menu')
}

const achievementBadges = {...constestantStore.achievementBadges}


// an array to loop



</script>