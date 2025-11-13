<template>
    <div class="qrMain">
        <n-collapse>
            <n-collapse-item name="1">
                <template #header>
                    <n-button size="tiny" type="primary">QR</n-button>
                </template>
                <n-space>
                    <n-button size="tiny" secondary type="primary">内容</n-button>
                    <n-input v-model:value="text" size="tiny" autosize type="textarea" style="min-width: 200px;" />
                </n-space>
                <n-space>
                    <n-button size="tiny" secondary type="primary">级别</n-button>
                    <n-select size="tiny" v-model:value="errorCorrectionLevel" :options="errorCorrectionOptions"
                        :consistent-menu-width="false" />
                </n-space>
                <n-space style="margin-top: 5px;">
                    <n-button size="tiny" secondary type="primary">大小</n-button>
                    <n-slider size="tiny" v-model:value="size" :min="60" :max="600" :step="1" style="width: 200px;" />
                </n-space>
                <n-space style="margin-top: 5px;">
                    <n-button size="tiny" secondary type="primary">颜色</n-button>
                    <n-color-picker size="small" v-model:value="color" style="width: 200px;" />
                </n-space>
                <n-space>
                    <n-button size="tiny" secondary type="primary">颜色</n-button>
                    <n-color-picker size="small" v-model:value="backgroundColor" style="width: 200px;" />
                </n-space>
                <n-space>
                    <n-checkbox size="small" v-model:checked="isIcon" label="图标" />
                    <n-select v-if="isIcon" size="tiny" v-model:value="iconOptionsValue" :options="iconOptions"
                        :consistent-menu-width="false" />
                </n-space>
                <n-space v-if="isIcon" vertical style="margin-top: 5px;">
                    <n-input v-if="iconOptionsValue" v-model:value="iconUrl" size="tiny" type="text"
                        style="min-width: 200px;" />
                    <n-button @click="selectImgEvent" v-if="!iconOptionsValue" size="tiny"
                        type="primary">选择文件...</n-button>
                    <n-space>
                        <n-button size="tiny" secondary type="primary">大小</n-button>
                        <n-slider size="tiny" v-model:value="iconSize" :min="16" :max="300" :step="1"
                            style="width: 200px;" />
                    </n-space>
                </n-space>
                <n-qr-code style="margin-top: 5px;" v-if="!isQr" id="qr-code" :value="text"
                    :error-correction-level="errorCorrectionLevel" :size="size" :color="color"
                    :background-color="backgroundColor" />
                <n-qr-code style="margin-top: 5px;" v-if="isQr" :value="text"
                    :error-correction-level="errorCorrectionLevel" :size="size" :color="color"
                    :background-color="backgroundColor" :icon-src="isIcon ? iconUrl : null" :icon-size="iconSize" />
                <br>
                <n-button v-if="!isIcon" size="tiny" type="primary" @click="handleDownloadQRCode"
                    style="margin-left: 5px;margin-top: 5px;">下载</n-button>
            </n-collapse-item>
        </n-collapse>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { selectImageFile } from '@/utils/file';
const isQr = ref(true);
const text = ref('https://hrt0725.github.io/');
const size = ref(100);
const color = ref("#225A95");
const backgroundColor = ref("#F5F5F5");
const isIcon = ref(false);
const iconUrl = ref('https://picsum.photos/200/200?random=1');
const iconSize = ref(16);

const errorCorrectionLevel = ref('M')
const errorCorrectionOptions = [
    { value: 'L', label: 'L' },
    { value: 'M', label: 'M' },
    { value: 'Q', label: 'Q' },
    { value: 'H', label: 'H' }
];

const iconOptionsValue = ref(true);
const iconOptions = [
    { label: "图片URL", value: true },
    { label: "本地图片", value: false }
];

watch(() => isIcon.value,
    (newValue) => {
        isQr.value = newValue;
    }
);
function handleDownloadQRCode() {
    const canvas = document.querySelector("#qr-code")?.querySelector("canvas");
    if (canvas) {
        const url = canvas.toDataURL();
        const a = document.createElement("a");
        a.download = "QRCode.png";
        a.href = url;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }
}

function selectImgEvent() {
    selectImageFile().then((url) => {
        console.log('图片预览URL:', url);
        iconUrl.value = url;
    }).catch(console.error);

}
</script>

<style scoped>
.qrMain {
    display: flex;
    flex-direction: column;
    gap: 5px;
}
</style>