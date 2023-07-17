import { ref } from 'vue'
import { defineStore } from 'pinia'

export const usePrizeStore = defineStore(
  'prize',
  () => {
    const finalPrize = ref(0)
    return { finalPrize }
  })