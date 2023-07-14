import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useModalStore = defineStore(
  'modal',
  // setup function
  () => {
    // state
    const isVisible = ref(false)
    //getters
    // const doubleCount = computed(() => count.value * 2)

    // action
    function toggleVisibility() {
      isVisible.value = !isVisible.value
    }
    //action
    // function closeModal() {
    //   count.value++
    // }

    return { isVisible, toggleVisibility }
  }
)
