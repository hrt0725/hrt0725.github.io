<template>
    <main class="TabItemMain">
        <MusicList :musicData="musicData" class="musicList" @on-item-click="onItemClick" />
        <MusicComponent v-model:src="musicSrc" v-model:itemData="itemData" class="mainMusic" />
    </main>
</template>

<script setup>
import { ref } from "vue";
import MusicComponent from "@/components/MusicComponent.vue";
import MusicList from "@/components/MusicList.vue";


const musicData = ref([]);
const musicSrc = ref("");
const itemData = ref({});

const musicFiles = import.meta.glob("../../../public/music/\*");
Object.keys(musicFiles).forEach(async (filePath) => {
    let fileNameEx = filePath.split('/').pop().split('\\').pop()
    let fileName = fileNameEx.split('.').slice(0, -1).join('.')
    let musicName = fileName;
    let zz = "";
    let sj = "";
    if (musicName.includes('-')) {
        let result = musicName.split("-")
        musicName = result[0];
        zz = result[1]
    }

    musicData.value.push({
        fileNameEx: fileNameEx,
        name: musicName,
        zz: zz,
        sj: "03:54",
    })
    console.log();
});
function onItemClick(musicItem) {
    musicSrc.value = "/music/" + musicItem.fileNameEx;
    itemData.value = musicItem
}
</script>


<style scoped>
.musicList {
    min-width: 200px;
    max-width: 600px;
    margin-bottom: 5px;
}

@media (max-width: 650px) {
    .musicList {
        margin-bottom: 5px !important;
    }

    .mainMusic,
    .musicList {
        margin: auto;
    }
}
</style>