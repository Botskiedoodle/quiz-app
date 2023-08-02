import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useContenstantStore = defineStore(
  'contestant',
  // setup function
  () => {

    const failedAttempts = ref(0)
    // state
    const tracker = ref({
      failedAttempts: 0,
      // master of the 50/50
      correctAnswers: {
        general: 0,
        trueOrFalse: 0,
      }
    })

    const achievementBadges = ref(
      {
        zeroPointsOnSingleQuiz: 0,
        finishTheQuizOnce: 0,
        // fiftyFiftyMaster: 0,
        untouchable: 0,

        // point based
        // get5PointsOn: {
        //   Easy: 0,
        //   Medium: 0,
        //   Hard: 0
        // },
        // get10PointsOn: {
        //   Easy: 0,
        //   Medium: 0,
        //   Hard: 0
        // },

        // finish the quiz
        finishTheQuizOn: {
          Easy: 0,
          Medium: 0,
          Hard: 0
        }
      }
    )



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
    return { lives, achievementBadges, tracker, subtractLife, failedAttempts }
  }
)
