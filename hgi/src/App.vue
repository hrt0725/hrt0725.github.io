<template>
  <n-config-provider :theme="useThemeStore().theme">
    <n-message-provider>
      <n-scrollbar style="height:100vh">
        <RouterView />
      </n-scrollbar>
    </n-message-provider>
  </n-config-provider>
</template>

<script setup>
import { useThemeStore } from "./stores/config";

</script>