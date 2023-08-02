<template>
  <div class="text-white font-bold text-2xl">
    <span v-for="life in constestantStore.lives" :key="life.id"
      ><img src="../assets/heart.png" alt="" class="w-20 mx-4" style="display: inline"
    /></span>
  </div>
</template>
<script setup>
import { useContenstantStore } from '../stores/contestant'

const constestantStore = useContenstantStore()
</script>
<style scoped>
</style>