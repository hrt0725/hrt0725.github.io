<template>
  <main class="TabItemMain">
    <n-rate color="#4fb233" /><br>
    <n-rate color="#4fb233" />
    <n-input-number v-model:value="value" clearable />
    <h3 v-for="i in 50">{{ i }} </h3>
  </main>
</template>
<script setup>
import { ref } from "vue";

const value = ref(0);
</script>