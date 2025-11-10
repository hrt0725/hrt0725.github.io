<template>
    <main class="TabItemMain">
        <MusicList class="musicList" />
        <MusicComponent class="mainMusic" />
    </main>
</template>


<script setup>
import { ref } from "vue";
import MusicComponent from "@/components/MusicComponent.vue";
import MusicList from "@/components/MusicList.vue";

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