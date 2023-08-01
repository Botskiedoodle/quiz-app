<template>
  <div class="confetti-container">
    <div
      v-for="(confetti, index) in confettis"
      :key="index"
      class="confetti"
      :style="confettiStyle(index)"
    ></div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const confettis = ref(Array.from({ length: 50 }, (_, index) => index + 1));

const confettiStyle = (index) => ({
  backgroundColor: getRandomColor(),
  top: `${Math.random() * 100}%`,
  left: `${Math.random() * 100}%`,
  animationDelay: `${Math.random() * 5}s`,
});

const getRandomColor = () => {
  const colors = ['#fbc531', '#e84118', '#4cd137', '#0652DD', '#6F1E51'];
  return colors[Math.floor(Math.random() * colors.length)];
};
</script>

<style>
.confetti-container {
  position: relative;
  height: 100%;
}

.confetti {
  width: 10px;
  height: 10px;
  position: absolute;
  border-radius: 50%;
  animation: confetti-fall 4s linear infinite;
}

@keyframes confetti-fall {
  0% {
    transform: translateY(-10%);
  }
  100% {
    transform: translateY(100%);
  }
}
</style>
