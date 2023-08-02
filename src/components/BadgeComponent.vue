<template>
  <button
    class="border-8 rounded-full p-2 w-40 h-40"
    :class="
      badgeAchievement === 0
        ? 'bg-gray-600 border-neutral-400'
        : 'bg-neutral-900 animate-spin border-amber-400 '
    "
  >
    <div class="w-20 h-20 mx-auto" v-if="badgeAchievement === 0">
      <img src="../assets/badges/locked.png" />
    </div>
    <div v-else class="w-20 h-20 mx-auto mb-4">
      <img :src="badgeURL" />
      <div class="text-white">{{ badgeTitle }}</div>
    </div>
  </button>
</template>
<script setup>
import {computed} from 'vue'
const props = defineProps({
  badgeAchievement: {
    type: Number,
    required: true,
    default: () => 0
  },
  badgeImage: {
    type: String,
    required: true,
    default: () => 'locked'
  },
  badgeTitle: {
    type: String,
    required: true,
    default: () =>'Hello'
  }
})

const badgeURL = computed(()=>{
 return new URL(`../assets/badges/${props.badgeImage}.png`, import.meta.url).href
})
</script>
<style scoped>
@keyframes spin-in {
  0% {
    transform: rotateY(0deg);
  }
  100% {
    transform: rotateY(360deg);
  }
}

.animate-spin {
  animation: spin-in 3s;
}
</style>