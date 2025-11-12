<template>
    <main class="TabItemMain">
        <h5>服务器接口文档</h5>
        <n-statistic label="你一共处理了" tabular-nums>
            <n-number-animation ref="numberAnimationInstRef" :from="0" :to="12039" />
            <template #suffix>
                条群消息
            </template>
        </n-statistic>
        <n-space vertical>
            花时间、花精力、花心思，愿你每一份努力都不负所望
            <n-button @click="handleClick">
                播放
            </n-button>
        </n-space>
    </main>
</template>

<script setup>
import { ref } from "vue";

const numberAnimationInstRef = ref(null);
function handleClick() {
    numberAnimationInstRef.value?.play();
}
</script>