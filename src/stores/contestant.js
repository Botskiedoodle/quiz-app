import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useContenstantStore = defineStore(
  'contestant',
  // setup function
  () => {
    // state
    const lives = ref(0)
    //getters
    // const doubleCount = computed(() => count.value * 2)
    // action
    // function toggleVisibility() {
    //   isVisible.value = !isVisible.value
    // }
    function subtractLife() {
      lives.value--
    }
    return { lives, subtractLife }
  }
)
