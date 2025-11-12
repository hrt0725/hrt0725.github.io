<template>
    <n-collapse>
        <template #header-extra>
            <n-button size="tiny" secondary type="primary">Md5</n-button>
        </template>
        <n-collapse-item name="1">
            <n-space vertical>
                <n-input v-model:value="text" size="tiny" type="textarea" style="min-width: 200px;" />
                <n-button size="tiny" type="primary">{{ md5Value }}</n-button>
            </n-space>
        </n-collapse-item>
    </n-collapse>
</template>

<script setup>
import { ref, watch } from 'vue';
import { md5 } from "@/utils/md5";
const text = ref('雨淋湿了天空');
const md5Value = ref('雨淋湿了天空');

watch(() => text.value,
    (newValue) => {
        md5Value.value = md5(newValue)
    }
);
</script>