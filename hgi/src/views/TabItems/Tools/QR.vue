<template>
    <div class="qrMain">
        <n-collapse>
            <template #header-extra>
                <n-button size="tiny" secondary type="primary">QR</n-button>
            </template>
            <n-collapse-item name="1">
                <n-space>
                    <n-button size="tiny" secondary type="primary">内容</n-button>
                    <n-input v-model:value="text" size="tiny" type="textarea" style="min-width: 200px;" />
                </n-space>
                <n-space>
                    <n-button size="tiny" secondary type="primary">级别</n-button>
                    <n-select v-model:value="errorCorrectionLevel" :options="errorCorrectionOptions"
                        :consistent-menu-width="false" />
                </n-space>
                <n-space>
                    <n-button size="tiny" secondary type="primary">大小</n-button>
                    <n-slider size="tiny" v-model:value="size" :min="60" :max="600" :step="1" style="width: 200px;" />
                </n-space>
                <n-space>
                    <n-button size="tiny" secondary type="primary">颜色</n-button>
                    <n-color-picker size="small" v-model:value="color" style="width: 200px;" />
                </n-space>
                <n-space>
                    <n-button size="tiny" secondary type="primary">颜色</n-button>
                    <n-color-picker size="small" v-model:value="backgroundColor" style="width: 200px;" />
                </n-space>
                <n-qr-code :value="text" :error-correction-level="errorCorrectionLevel" :size="size" :color="color"
                    :background-color="backgroundColor" />
            </n-collapse-item>
        </n-collapse>
    </div>
</template>

<script setup>
import { ref } from 'vue';
const text = ref('雨淋湿了天空');
const size = ref(100);
const color = ref("#225A95");
const backgroundColor = ref("#F5F5F5");
const errorCorrectionLevel = ref('M')
const errorCorrectionOptions = [
    { value: 'L', label: 'L' },
    { value: 'M', label: 'M' },
    { value: 'Q', label: 'Q' },
    { value: 'H', label: 'H' }
];
</script>

<style scoped>
.qrMain {
    display: flex;
    flex-direction: column;
    gap: 5px;
}
</style>