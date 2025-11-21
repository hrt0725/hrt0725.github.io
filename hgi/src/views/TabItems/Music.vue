<template>
    <main class="TabItemMain">
        <MusicList :musicListData="musicListData" class="musicList" @on-item-click="onListItemClick" />
        <MusicComponent v-model:src="currentMusicSrc" v-model:itemData="currentMusicData" class="mainMusic" />
    </main>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from 'axios';
import { useBroadcastChannel } from "@/stores/broadcastChannel";
import MusicComponent from "@/components/MusicComponent.vue";
import MusicList from "@/components/MusicList.vue";
import { useUserStore } from "@/stores/config";

const musicListData = ref([]);
const currentMusicSrc = ref("");
const currentMusicData = ref({});

onMounted(() => {
    axios.get(useUserStore().musicSever + useUserStore().musicManifestPath)
        .then(response => {
            for (let index = 0; index < response.data.length; index++) {
                let fileNameEx = response.data[index];
                let fileName = fileNameEx.split('.').slice(0, -1).join('.');
                let musicName = fileName;
                let zz = "";
                if (musicName.includes('-')) {
                    let result = musicName.split("-");
                    musicName = result[0];
                    zz = result[1];
                };
                musicListData.value.push({
                    fileNameEx: fileNameEx,
                    name: musicName,
                    zz: zz,
                });
            };
            currentMusicSrc.value = useUserStore().musicSever + useUserStore().musicFilePath + musicListData.value[0].fileNameEx;
            currentMusicData.value = musicListData.value[0];
            useBroadcastChannel().postMessage("musicJsonLoaded");
        }).catch(error => {
            console.error('获取音乐列表失败:', error);
        });
});

function onListItemClick(musicItem) {
    currentMusicSrc.value = useUserStore().musicSever + musicItem.fileNameEx;
    currentMusicData.value = musicItem;
};

</script>


<style scoped>
.musicList {
    min-width: 200px;
    max-width: 500px;
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