<template>
    <n-collapse>
        <n-collapse-item name="1">
            <template #header>
                <n-button size="tiny" type="primary">时间推算</n-button>
            </template>
            <n-space vertical>
                <n-space>
                    <n-button size="tiny" type="primary">年-月-日</n-button>
                    <n-date-picker size="tiny" v-model:value="timestamp" type="date" />
                </n-space>
                <n-space>
                    <n-button size="tiny" type="primary">时-分-秒</n-button>
                    <n-time-picker size="tiny" default-formatted-value="00:00:00" />
                </n-space>
                <n-space>
                    <n-radio-group v-model:value="calculateType" name="radiogroup">
                        <n-radio size="small" value="up">向后</n-radio>
                        <n-radio size="small" value="down">向前</n-radio>
                    </n-radio-group>
                </n-space>
                <n-space>
                    <n-input size="tiny" />
                    <n-dropdown trigger="hover" :options="timeUnits" @select="timeUnitleSelect">
                        <n-button size="tiny" type="primary">单位: {{ timeUnit }}</n-button>
                    </n-dropdown>
                </n-space>
                <n-button size="tiny" type="primary" style="width: 100%;">计算</n-button>
            </n-space>
        </n-collapse-item>
    </n-collapse>
</template>

<script setup>
import { ref } from 'vue'

const timestamp = ref(1183135260000)
const calculateType = ref("up");
const timeUnit = ref("s");
const timeUnits = ref([
    { label: '秒', key: 's' },
    { label: '分', key: 'm' },
    { label: '时', key: 'h' },
    { label: '天', key: 'd' }
]);

function timeUnitleSelect(data) {
    timeUnit.value = data;
};

</script>