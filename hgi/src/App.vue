<template>
  <n-config-provider :theme="useThemeStore().theme" :theme-overrides="useUserStore().themeOptionsValue">
    <n-dialog-provider>
      <n-message-provider>
        <n-scrollbar style="height:100vh">
          <RouterView />
        </n-scrollbar>
      </n-message-provider>
    </n-dialog-provider>
  </n-config-provider>
</template>

<script setup>
import { useThemeStore, useUserStore } from "./stores/config";

</script>