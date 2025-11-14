<template>
    <n-collapse>
        <n-collapse-item name="1">
            <template #header>
                <n-button size="tiny" type="primary">Base64</n-button>
            </template>
            <n-space vertical>
                <n-space>
                    <n-button size="tiny" secondary type="primary">类型</n-button>
                    <n-select size="tiny" v-model:value="contentTypeValue" :options="contentTypeOptions"
                        :consistent-menu-width="false" />
                </n-space>
                <n-input v-if="contentTypeValue == 'text'" v-model:value="text1" size="tiny" type="textarea"
                    style="min-width: 200px;" />
                <n-space v-if="contentTypeValue == 'image'">
                    <n-button size="tiny" secondary type="primary">来源</n-button>
                    <n-select size="tiny" v-model:value="fileOriginValue" :options="fileOriginOptions"
                        :consistent-menu-width="false" />
                </n-space>
                <n-space v-if="contentTypeValue == 'image'">
                    <n-input v-if="fileOriginValue == 'url'" v-model:value="text1" size="tiny"
                        style="min-width: 200px;" />
                    <n-button v-if="fileOriginValue == 'local'" size="tiny" secondary type="primary">选择文件...</n-button>
                </n-space>
                <n-image v-if="contentTypeValue == 'image'" width="100"
                    src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg" />

                <div class="castBtnMain">
                    <n-button size="tiny" type="primary" @click="castDownEvent">
                        <template #icon>
                            <n-icon>
                                <ChevronDownDoubleIcon />
                            </n-icon>
                        </template>
                    </n-button>
                    <n-button size="tiny" type="primary" @click="castUpEvent">
                        <template #icon>
                            <n-icon>
                                <ChevronUpDoubleIcon />
                            </n-icon>
                        </template>
                    </n-button>
                </div>
                <n-input v-model:value="text2" size="tiny" type="textarea" style="min-width: 200px;" />
            </n-space>
        </n-collapse-item>
    </n-collapse>
</template>

<script setup>
import { ref } from 'vue';
import ChevronUpDoubleIcon from "@/components/icons/ChevronUpDoubleIcon.vue";
import ChevronDownDoubleIcon from "@/components/icons/ChevronDownDoubleIcon.vue";
import { base64Encode, base64Decode } from "@/utils/str";
import { imgUrl2Base64, imageFile2Base64 } from "@/utils/file";
const text1 = ref('https://hrt0725.github.io/');
const text2 = ref('');

const contentTypeValue = ref('text')
const contentTypeOptions = [
    { value: 'text', label: '文本' },
    { value: 'image', label: '图片' }
];
const fileOriginValue = ref('url')
const fileOriginOptions = [
    { value: 'url', label: 'URL' },
    { value: 'file', label: '本地' }
];
function castUpEvent() {
    text1.value = base64Decode(text2.value)
}

function castDownEvent() {
    text2.value = base64Encode(text1.value)
}

function image2Base64(origon, type) {
    if (type == 'url') {
        return imgUrl2Base64(origon);
    } else if (type == 'file') {
        return imageFile2Base64(origon);
    }

}
</script>


<style scoped>
.castBtnMain {
    display: flex;
    justify-content: center;
    gap: 5px;
}
</style>