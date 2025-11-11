<template>
  <n-config-provider :theme="useThemeStore().theme">
    <n-scrollbar style="height:100vh">
      <RouterView />
    </n-scrollbar>
  </n-config-provider>
</template>

<script setup>
import { useThemeStore } from "./stores/config";
document.title = "HGI"
</script>