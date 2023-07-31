<template>
  <div class="flex items-center justify-center">
    <div class="text-center">
      <div class="spinner"></div>
    </div>
  </div>
</template>

<style scoped>
.spinner:before {
  content: '';
  box-sizing: border-box;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 4em;
  height: 4em;
  margin-top: -2em;
  margin-left: -2em;
  border-radius: 50%;
  border: 0.2em solid #ffbf00;
  border-top-color: white;
  animation: spinner 0.8s linear infinite;
}

@keyframes spinner {
  to {
    transform: rotate(360deg);
  }
}
</style>
