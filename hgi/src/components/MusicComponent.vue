<template>
    <n-card class="_musicMain">
        <div style="display: flex;gap: 10px;">
            <n-tag :bordered="false" size="small">{{ currentTimeStr }}</n-tag>
            <n-slider size="small" style="min-width: 150px;" v-model:value="playbackProgress" :step="1" />
            <n-tag :bordered="false" size="small">{{ allTimeStr }}</n-tag>
        </div>
        <div style="display: flex; margin-top: 10px;">
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
        <n-progress v-if="!isloaded" class="loadProgress" type="line" :percentage="loadPercentage"
            :show-indicator="false" />
    </n-card>

</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { PlaySkipBackCircleOutline, PlayCircleOutline, StopCircleOutline, PlaySkipForwardCircleOutline } from "@vicons/ionicons5";
import CilLoop from "./icons/CilLoop.vue";
import CilLoop1 from "./icons/cilLoop1.vue";
import FeRandom from "./icons/FeRandom.vue";
import Sound from "./icons/Sound.vue";
import NoSound from "./icons/NoSound.vue";
const props = defineProps(['src', 'itemData'])

const playbackProgress = ref(0);
const loadPercentage = ref(0);
const currentTimeStr = ref("00:00");
const allTimeStr = ref("00:00");
const SoundMount = ref(20);
const isPlay = ref(false);
const canPlay = ref(false);
const isloaded = ref(false);
const isSound = ref(true);
const loopMod = ref(0);
const audio = ref(new Audio());

const timer = ref(null);


onMounted(() => {
    audio.value = new Audio();
    audio.value.volume = SoundMount.value / 100;
    audio.value.addEventListener('progress', function () {
        loadPercentage.value += 10;
        console.log("progress");
    });
    audio.value.addEventListener('loadedmetadata', function () {
        console.log('音频元数据已加载，总时长:', audio.value.duration, '秒');
        allTimeStr.value = time2ddd(audio.value.duration);
    });
    audio.value.addEventListener('canplaythrough', function () {
        console.log('音频已可流畅播放');
        canPlay.value = true;
        isloaded.value = true
    });
})

watch(() => props.src,
    (newValue) => {
        audio.value.src = newValue;
        audio.value.pause();
        canPlay.value = false;
        loadPercentage.value = 0;
        isloaded.value = false;
        clearInterval(timer.value);
    }
);
watch(() => SoundMount.value,
    (newValue) => {
        audio.value.volume = newValue / 100;
    }
);
watch(() => playbackProgress.value,
    (newValue) => {
        audio.value.currentTime = newValue / 100 * audio.value.duration;
    }
);
function PlayClickEvent() {
    if (!isPlay.value) {
        audio.value.play()
        timer.value = setInterval(() => {
            currentTimeStr.value = time2ddd(audio.value.currentTime);
            playbackProgress.value = Math.floor(audio.value.currentTime / audio.value.duration * 100);
            console.log("setInterval...");
        }, 200);
    } else {
        audio.value.pause();
        clearInterval(timer.value)
    }
    isPlay.value = !isPlay.value;

}
function LoopClickEvent() {
    loopMod.value += 1;
    if (loopMod.value == 2) loopMod.value = 0;
    console.log(audio.value.currentTime);
    console.log(audio.value.duration);
    console.log(audio.value.src);

}
function SoundClickEvent() {
    isSound.value = !isSound.value;
}

function time2ddd(time) {
    let m = Math.floor(time / 60);
    let s = Math.floor(time % 60);
    let mStr = m < 10 ? '0' + m : '' + m;
    let sStr = s < 10 ? '0' + s : '' + s;
    return mStr + ':' + sStr;
}
</script>


<style scoped>
._musicMain {
    width: max-content;
}

.playControl {
    display: flex;
    justify-content: center;
    gap: 5px;
}

.playControl i:hover {
    transform: scale(1.1);
}
</style>

<style>
.loadProgress {
    margin-top: 5px;
}

.loadProgress .n-progress-graph-line-rail {
    height: 2px !important;
}
</style>