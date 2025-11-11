import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }
  return { count, doubleCount, increment }
})

export const useThemeStore = defineStore('Themer', () => {
  const theme = ref(null)
  const isDark = ref(false)
  return { isDark, theme }
})

export const useUserStore = defineStore('UserStore', () => {
  const isClickMenu2Collapsed = ref(false);
  const autoCacheFile = ref(true);
  return { isClickMenu2Collapsed, autoCacheFile }
})