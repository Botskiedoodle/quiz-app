<template>
  <div ref="container" class="w-screen h-screen relative z-0"></div>

  <div class="z-1 absolute top-0 left-0 flex w-full justify-center items-center h-full">
    <div
      class="p-4 bg-white flex flex-col text-center justify-center rounded-lg p-8 shadow-md select-none"
    >
      <button
        class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
        @click="backToMainMenu"
      >
        Back to Main Menu
      </button>
      <div class="mt-4 text-lg font-medium">
        Failed Attempts: {{ constestantStore.tracker.failedAttempts }}
      </div>
      <div class="my-4 text-xl font-bold">Badges</div>

      <div class="grid grid-cols-2 sm:grid-cols-3 gap-8 mt-4">
        <div v-for="badge in achievementBadges" :key="badge.badgetTitle">
          <BadgeComponent
            :badge-achievement="badge.flag"
            :badge-image="badge.badgeImage"
            :badge-title="badge.badgeTitle"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useContenstantStore } from '../stores/contestant'
import BadgeComponent from './BadgeComponent.vue';
import { ref, onMounted } from 'vue'; 
import JSConfetti from 'js-confetti'
import { Fireworks } from 'fireworks-js'


const container = ref(null)

onMounted(() => {
  const fireworks = new Fireworks(container.value, { /* options */ })
  fireworks.start()
});

const jsConfetti = new JSConfetti()
jsConfetti.addConfetti()

const constestantStore = useContenstantStore()

const emit = defineEmits(['back-to-main-menu'])

const backToMainMenu = () => {
  emit('back-to-main-menu')
}

const achievementBadges = {...constestantStore.achievementBadges}



</script>
<style scoped>
</style>