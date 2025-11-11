<template>
    <n-card class="_musicMain">
        <div style="display: flex;gap: 10px;">
            <n-tag size="small">00:00:00</n-tag>
            <n-slider size="small" style="min-width: 150px;" v-model:value="PlaybackProgress" :step="1" />
            <n-tag size="small">00:03:21</n-tag>
        </div>
        <div style="display: flex;gap: 5px;margin-top: 10px;justify-content: space-between;align-items: center;">
            <div style="display: flex;">
                <n-avatar size="large" src="https://picsum.photos/200/200?random=1" />
                <div style="display: flex;flex-direction: column;margin-left: 10px;">
                    <span><strong>{{ props.itemData.name }}</strong></span>
                    <span>{{ props.itemData.zz }}</span>
                </div>
            </div>
            <div class="playControl">
                <n-icon size="23">
                    <FeRandom />
                </n-icon>
                <n-icon size="23">
                    <PlaySkipBackCircleOutline />
                </n-icon>
                <n-icon size="23" @click="PlayClickEvent">
                    <PlayCircleOutline v-if="!isPlay" />
                    <StopCircleOutline v-if="isPlay" />
                </n-icon>
                <n-icon size="23">
                    <PlaySkipForwardCircleOutline />
                </n-icon>
                <n-icon size="23" @click="LoopClickEvent">
                    <CilLoop v-if="loopMod == 0" />
                    <CilLoop1 v-if="loopMod == 1" />
                </n-icon>
                <n-tooltip placement="top" trigger="hover">
                    <template #trigger>
                        <n-icon size="23" @click="SoundClickEvent">
                            <Sound v-if="isSound" />
                            <NoSound v-if="!isSound" />
                        </n-icon>
                    </template>
                    <n-slider size="small" style="width: 100px;" v-model:value="SoundMount" :step="1" />
                </n-tooltip>
            </div>
        </div>
    </n-card>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { PlaySkipBackCircleOutline, PlayCircleOutline, StopCircleOutline, PlaySkipForwardCircleOutline } from "@vicons/ionicons5";
import CilLoop from "./icons/CilLoop.vue";
import CilLoop1 from "./icons/cilLoop1.vue";
import FeRandom from "./icons/FeRandom.vue";
import Sound from "./icons/Sound.vue";
import NoSound from "./icons/NoSound.vue";
const props = defineProps(['src', 'itemData'])
const PlaybackProgress = ref(100);
const SoundMount = ref(20);
const isPlay = ref(true);
const isSound = ref(true);
const loopMod = ref(0);
const audio = ref(null);

onMounted(() => {
    audio.value = new Audio(props.src);
    console.log(props.src);
})
function PlayClickEvent() {
    isPlay.value = !isPlay.value;
    console.log(props.src);
    if (isPlay.value) {
        audio.value.play()
    } else {
        audio.value.pause()
    }
    console.log(audio.value.currentTime);

}
function LoopClickEvent() {
    loopMod.value += 1;
    if (loopMod.value == 2) loopMod.value = 0;
}
function SoundClickEvent() {
    isSound.value = !isSound.value;
}
</script>


<style scoped>
._musicMain {
    width: max-content;
}

.playControl {
    display: flex;
    gap: 5px;
}

.playControl i:hover {
    transform: scale(1.1);
}
</style>