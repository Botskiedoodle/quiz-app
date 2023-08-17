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
        zeroPointsOnSingleQuiz: {
          flag: 0,
          badgeImage: 'poop',
          badgeTitle: 'Stinky',
          description: 'Failed the quiz with 0 correct answers. Congratulations, stinky.'
        },
        finishTheQuizOnce: {
          flag: 0,
          badgeImage: 'finish',
          badgeTitle: 'Finisher',
          description: 'Completed the quiz once on whichever difficulty. Probably easy. 🙄'
        },
        // fiftyFiftyMaster: 0,
        untouchable: {
          flag: 0,
          badgeImage: 'untouchable',
          badgeTitle: 'Flawless',
          description: 'Completed the quiz once with 3 hearts intact. Probably on easy difficulty. 🙄'
        },
        // finish the quiz on a difficulty
        finishTheQuizOnEasy: {
          flag: 0,
          badgeImage: 'easy',
          badgeTitle: 'WhizKid',
          description: 'Completed the quiz once on easy difficulty. 🙄'
        },

        finishTheQuizOnMedium: {
          flag: 0,
          badgeImage: 'medium',
          badgeTitle: 'Savant',
          description: 'Completed the quiz once on medium difficulty. Aight, you cool.'
        },
        finishTheQuizOnHard: {
          flag: 0,
          badgeImage: 'hard',
          badgeTitle: 'Maestro',
          description: 'Completed the quiz once on hard difficulty. Aye bro, calm down.'
        },
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
