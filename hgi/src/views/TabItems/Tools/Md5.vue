<template>

    <n-collapse>
        <n-collapse-item name="1">
            <template #header>
                <n-button size="tiny" type="primary">Md5</n-button>
            </template>
            <n-space vertical>
                <n-space>
                    <n-button size="tiny" secondary type="primary">内容</n-button>
                    <n-input v-model:value="text" size="tiny" autosize type="textarea" style="min-width: 200px;" />
                </n-space>
                <n-checkbox size="small" v-model:checked="isCapital" label="大写" />
                <n-button @click="md5ValueClickEvent" size="tiny" type="primary" style="min-width: 200px;">{{
                    md5Value
                }}</n-button>
            </n-space>
        </n-collapse-item>
    </n-collapse>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import { useMessage } from 'naive-ui'
import { md5 } from "@/utils/md5";
import { copy2Clipboard } from "@/utils/common";
const text = ref('https://hrt0725.github.io/');
const md5Value = ref("");
const isCapital = ref(false);

const message = useMessage()

function success() {
    message.success('复制成功')
}

function error() {
    message.error('复制失败')
}

onMounted(() => {
    md5Value.value = md5(text);
});

watch(() => isCapital.value,
    (newValue) => {
        if (newValue) md5Value.value = md5Value.value.toUpperCase();
        else md5Value.value = md5Value.value.toLowerCase();
    }
);

watch(() => text.value,
    (newValue) => {
        if (isCapital.value) md5Value.value = md5(newValue).toUpperCase();
        else md5Value.value = md5(newValue);
    }
);

function md5ValueClickEvent() {
    copy2Clipboard(md5Value.value).then((msg) => {
        success();
    }).catch((err) => {
        error();
    });
}

</script>