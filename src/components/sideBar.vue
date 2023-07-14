<template>
  <div class="mt-8">
    <div
      v-for="(prize, prizeIndex) in prizeList"
      :key="prize.id"
      class="font-bold text-2xl"
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
import {ref, defineProps} from 'vue'
const prizeList = ref(
  [
    '1 MILLION',
    '500,000',
    '250,000',
    '150,000',
    '75,000',
    '50,000',
    '25,000',
    '15,000',
    '10,000',
    '7,500',
    '5,000',
    '3,000',
    '2,000',
    '1,000',
    '500'
  ]
)
// prizeList.value.reverse()

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