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

export const useThemeStore = defineStore('Themer',
  () => {
    const theme = ref(null)
    const isDark = ref(false)
    return { isDark, theme }
  },
  { persist: true }
)

export const useUserStore = defineStore('UserStore', () => {
  const isClickMenu2Collapsed = ref(true);
  const autoCacheFile = ref(true);
  const defMusicSever = ref("https://hrt0725.github.io/music/");
  const musicSever = ref("https://hrt0725.github.io/music/");
  const musicSevers = ref([
    {
      label: "重设为默认",
      value: "defMusicSever",
    },
    {
      label: "https://hrt0725.github.io/music/",
      value: "https://hrt0725.github.io/music/",
    },
    {
      label: "http://127.0.0.1:5500/music/",
      value: "http://127.0.0.1:5500/music/",
    },
  ]);
  return { isClickMenu2Collapsed, autoCacheFile, defMusicSever, musicSever, musicSevers }
},
  { persist: true }
)