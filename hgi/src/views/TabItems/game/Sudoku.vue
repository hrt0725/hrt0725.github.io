<template>
    <main class="TabItemMain">
        <n-space vertical>
            <h6>developing...</h6>
            <n-space>
                <n-button type="primary" size="tiny">大小</n-button>
                <n-slider size="tiny" style="width: 200px;" v-model:value="fontSize" :min="12" :max="28" :step="1" />
            </n-space>
            <div class="sdkMain">
                <span class="sdkItem" :style="{ fontSize: fontSize + 'px' }" v-for="i in sudukuData">{{ i }}</span>
            </div>
        </n-space>

    </main>
</template>

<script setup>
import { ref } from "vue";
const fontSize = ref(18);
const sudukuData = ref([
    1, 2, 3, 4, 5, 6, 7, 8, 9,
    1, 2, 3, 4, 5, 6, 7, 8, 9,
    1, 2, 3, 4, 5, 6, 7, 8, 9,
    1, 2, 3, 4, 5, 6, 7, 8, 9,
    1, 2, 3, 4, 5, 6, 7, 8, 9,
    1, 2, 3, 4, 5, 6, 7, 8, 9,
    1, 2, 3, 4, 5, 6, 7, 8, 9,
    1, 2, 3, 4, 5, 6, 7, 8, 9,
    1, 2, 3, 4, 5, 6, 7, 8, 9,
]);
</script>

<style scoped>
.sdkMain {
    display: grid;
    grid-template-columns: repeat(9, 1fr);
    width: max-content;
    border: 1px solid var(--n-bar-color);
    border-radius: 5px;
    aspect-ratio: 1 / 1;
    padding-right: 2px;
}

.sdkItem {
    aspect-ratio: 1 / 1;
    text-align: center;
    padding: 1px;
}

.sdkItem:hover {
    background-color: var(--n-bar-color);
}

.sdkItem:nth-child(1) {
    border-radius: 5px 0px 0px 0px;
}

.sdkItem:nth-child(9) {
    border-radius: 0px 5px 0px 0px;
}

.sdkItem:nth-child(73) {
    border-radius: 0px 0px 0px 5px;
}

.sdkItem:nth-child(81) {
    border-radius: 0px 0px 5px 0px;
}

.sdkItem:nth-child(9n + 3),
.sdkItem:nth-child(9n + 6) {
    border-right: 1px solid var(--n-bar-color);
}

.sdkItem:nth-child(n + 19):nth-child(-n + 27),
.sdkItem:nth-child(n + 46):nth-child(-n + 54) {
    border-bottom: 1px solid var(--n-bar-color);
}
</style>