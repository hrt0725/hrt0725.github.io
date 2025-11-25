import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }
  return { count, doubleCount, increment }
});

export const useUserStore = defineStore('UserStore', () => {
  const theme = ref(null);
  const isDark = ref(false);
  const isClickMenu2Collapsed = ref(true);
  const autoCacheFile = ref(true);
  const multiwindowing = ref(false);
  const severAddr = ref("");
  const defMusicSever = ref("https://hrt0725.github.io/");
  const musicSever = ref("https://hrt0725.github.io/");
  const musicManifestPath = ref("data/musics.json");
  const musicFilePath = ref("music/");
  const themeOptionsValue = ref('def');
  const themeOptions = ref([{ label: "默认", value: 'def' }]);
  const themesJsonData = ref([{ label: "默认", value: null }]);

  const pageTitle = ref("HGI");

  const musicSevers = ref([
    {
      label: "重设为默认",
      value: "defMusicSever",
    },
    {
      label: "https://hrt0725.github.io/",
      value: "https://hrt0725.github.io/",
    },
    {
      label: "http://127.0.0.1:5500/",
      value: "http://127.0.0.1:5500/",
    },
  ]);
  const codeTheme = ref("vs");
  const codeThemes = ref([
    {
      label: "明亮",
      value: "vs",
    },
    {
      label: "黑暗",
      value: "vs-dark",
    },
    {
      label: "高对比度",
      value: "hc-black",
    }
  ]);
  function setToDef() {
    isClickMenu2Collapsed.value = true;
    autoCacheFile.value = true;
    multiwindowing.value = false;
    severAddr.value = "";
    defMusicSever.value = "https://hrt0725.github.io/";
    musicSever.value = "https://hrt0725.github.io/";
    musicManifestPath.value = "data/musics.json";
    musicFilePath.value = "music/";
    themeOptionsValue.value = 'def';
    themeOptions.value = [{ label: "默认", value: 'def' }];
    themesJsonData.value = [{ label: "默认", value: null }];
    pageTitle.value = "HGI";
  }
  return {
    isDark, theme, setToDef,
    isClickMenu2Collapsed, autoCacheFile, severAddr, defMusicSever, musicSever, musicManifestPath, musicFilePath, musicSevers, codeTheme, codeThemes, multiwindowing, themeOptionsValue, themeOptions, themesJsonData,
    pageTitle
  }
},
  { persist: true }
)