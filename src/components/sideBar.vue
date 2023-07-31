<template>
  <div class="mt-8">
    <div
      v-for="(prize, prizeIndex) in prizeList"
      :key="prize.id"
      class="font-bold text-2xl px-2"
      :class="`${prizeColors(prizeIndex)} ${isActive(prizeIndex)}`"
    >
      <span class="mr-4">
        {{ 15 - prizeIndex }}
      </span>
      <span>
        {{ `$${prize}` }}
      </span>
    </div>
  </div>
</template>
<script setup>
import {defineProps} from 'vue'
import { prizeList } from '@/data/prizeList';


const props = defineProps({
  questionsAnsweredReverse: {
    type: Number,
    default: 0
  }
})

const isActive = (prizeIndex) => {
// console.log(props.questionsAnsweredReverse);
  return props.questionsAnsweredReverse !== prizeIndex || 'bg-zinc-600 rounded-lg' 
}

const prizeColors = (prizeIndex) =>{
 return prizeIndex % 5 == 0 ? 'text-white' : 'text-amber-400 '
}


</script>