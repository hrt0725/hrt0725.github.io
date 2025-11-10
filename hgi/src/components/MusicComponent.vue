<template>
    <n-card class="_musicMain">
        <div style="display: flex;gap: 10px;">
            <n-tag size="small">00:00:00</n-tag>
            <n-slider size="small" style="min-width: 150px;" v-model:value="PlaybackProgress" :step="1" />
            <n-tag size="small">00:03:21</n-tag>
        </div>
        <div style="display: flex;gap: 5px;margin-top: 10px;justify-content: space-between;align-items: center;">
            <div style="display: flex;">
                <n-avatar size="large" src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg" />
                <div style="display: flex;flex-direction: column;margin-left: 10px;">
                    <span><strong>稻香</strong></span>
                    <span>周杰伦</span>
                </div>
            </div>
            <div class="playControl">
                <n-icon size="25">
                    <FeRandom />
                </n-icon>
                <n-icon size="25">
                    <PlaySkipBackCircleOutline />
                </n-icon>
                <n-icon size="25" v-if="!isPlay" @click="PlayClickEvent">
                    <PlayCircleOutline />
                </n-icon>
                <n-icon size="25" v-if="isPlay" @click="PlayClickEvent">
                    <StopCircleOutline />
                </n-icon>

                <n-icon size="25">
                    <PlaySkipForwardCircleOutline />
                </n-icon>
                <n-icon size="25" v-if="loopMod == 0" @click="LoopClickEvent">
                    <CilLoop />
                </n-icon>
                <n-icon size="25" v-if="loopMod == 1" @click="LoopClickEvent">
                    <CilLoop1 />
                </n-icon>
            </div>
        </div>
    </n-card>
</template>

<script setup>
import { ref } from "vue";
import { PlaySkipBackCircleOutline, PlayCircleOutline, StopCircleOutline, PlaySkipForwardCircleOutline } from "@vicons/ionicons5";
import CilLoop from "./icons/CilLoop.vue";
import CilLoop1 from "./icons/cilLoop1.vue";
import FeRandom from "./icons/FeRandom.vue";
const PlaybackProgress = ref(100);
const isPlay = ref(true);
const loopMod = ref(0);


function PlayClickEvent() {
    isPlay.value = !isPlay.value;
}
function LoopClickEvent() {
    loopMod.value += 1;
    if (loopMod.value == 2) loopMod.value = 0;
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