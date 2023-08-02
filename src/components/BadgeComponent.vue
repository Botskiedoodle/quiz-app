<template>
  <button
    class="border rounded-lg p-2 w-40 h-40"
    :class="badgeAchievement === 0 ? 'bg-gray-600 cursor-not-allowed' : 'bg-white'"
    :disabled="badgeAchievement === 0"
  >
    <div class="w-20 h-20 mx-auto" v-if="badgeAchievement === 0">
      <img src="../assets/badges/locked.png" />
    </div>
    <div v-else class="w-20 h-20 mx-auto"><img src="../assets/badges/poop.png" /></div>
  </button>
</template>
<script setup>
import {computed} from 'vue'
const props = defineProps({
  badgeAchievement: {
    type: Number,
    required: true,
    default: 0
  },
  badgeImage: {
    type: String,
    required: true,
    default: 'locked'
  }
})

const badgeURL = computed(()=>{
 return new URL(`../assets/badges/${props.badgeImage}.png`, import.meta.url).href
  // return `../assets/badges/${props.badgeImage}.png`
})
</script>