<template>
  <n-config-provider :theme="useUserStore().theme"
    :theme-overrides="useUserStore().themesJsonData.find(i => i.label == useUserStore().themeOptionsValue)?.value">
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
import { watch } from "vue";
import { useUserStore } from "./stores/config";

watch(() => useUserStore().pageTitle, (newValue) => {
  document.title = newValue;
});

</script>