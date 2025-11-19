<template>
    <n-collapse>
        <n-collapse-item name="1">
            <template #header>
                <n-button size="tiny" type="primary">时间推算</n-button>
            </template>
            <n-space vertical>
                <n-space>
                    <n-button size="tiny" secondary type="primary">年-月-日</n-button>
                    <n-date-picker size="tiny" v-model:value="date" type="date" />
                </n-space>
                <n-space>
                    <n-button size="tiny" secondary type="primary">时-分-秒</n-button>
                    <n-time-picker size="tiny" :on-update:formatted-value="onUpdateFormattedValue"
                        :default-formatted-value="timeStr" />
                </n-space>
                <n-space>
                    <n-radio-group v-model:value="calculateType" name="radiogroup">
                        <n-radio size="small" value="backward">向后</n-radio>
                        <n-radio size="small" value="forward">向前</n-radio>
                    </n-radio-group>
                </n-space>
                <n-space>
                    <n-input-number size="tiny" v-model:value="toValue" clearable />
                    <n-dropdown trigger="hover" :options="timeUnits" @select="timeUnitleSelect">
                        <n-button size="tiny" type="primary">单位: {{ timeUnit }}</n-button>
                    </n-dropdown>
                </n-space>
                <n-button @click="calculateBtnEvent" size="tiny" type="primary" style="width: 100%;">计算</n-button>
                <n-space>
                    <n-button size="tiny" secondary type="primary">结果:</n-button>
                    <n-time :time="resultTime" type="datetime" />
                </n-space>
            </n-space>
        </n-collapse-item>
    </n-collapse>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { formatTimeFromTimestamp } from "@/utils/time";
const date = ref(Date.now());
const timeStr = ref(formatTimeFromTimestamp(date.value));
const calculateType = ref("forward");
const toValue = ref(1);
const resultTime = ref(Date.now());
const timeUnit = ref("s");
const timeUnits = ref([
    { label: '秒', key: 's' },
    { label: '分', key: 'm' },
    { label: '时', key: 'h' },
    { label: '天', key: 'd' }
]);

onMounted(() => {
    timeStr.value = formatTimeFromTimestamp(date.value);
});

watch(() => date.value, (newValue) => {
    date.value = setHMS2Date(newValue, timeStr.value);
});

function timeUnitleSelect(data) {
    timeUnit.value = data;
};

function calculateBtnEvent() {
    let updataValue = 0;
    switch (timeUnit.value) {
        case 's':
            updataValue = toValue.value * 1000;
            break;
        case 'm':
            updataValue = toValue.value * 60 * 1000;
            break;
        case 'h':
            updataValue = toValue.value * 60 * 60 * 1000;
            break;
        case 'd':
            updataValue = toValue.value * 24 * 3600 * 1000;
            break;
    }
    switch (calculateType.value) {
        case 'forward':
            resultTime.value = date.value + updataValue;
            break;
        case 'backward':
            resultTime.value = date.value - updataValue;
            break;
    }
};

function setHMS2Date(dateNumer, value) {
    const [hours, minutes, seconds] = value.split(':').map(Number);
    let date1 = new Date(dateNumer);
    date1.setHours(hours);
    date1.setMinutes(minutes);
    date1.setSeconds(seconds);
    return date1.getTime();
};

function onUpdateFormattedValue(value, timestampValue) {
    timeStr.value = value;
    date.value = setHMS2Date(date.value, value);
};
</script>