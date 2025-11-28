<template>
    <main class="TabItemMain">
        <n-space vertical>
            <n-breadcrumb>
                <n-breadcrumb-item @click="breadcrumbItemClickEvent(-1)"> ~ </n-breadcrumb-item>
                <n-breadcrumb-item v-for="(dirItem, index) in currDirPath" @click="breadcrumbItemClickEvent(index)">
                    {{ dirItem }}
                </n-breadcrumb-item>
            </n-breadcrumb>
            <n-split direction="horizontal" v-model:size="splitSize" :min="splitMin" :max="splitMax">
                <template #1>
                    <n-scrollbar style="height: 85vh;">
                        <n-tree v-model:selected-keys="treeValue" :data="treeData" expand-on-click
                            :on-load="treeHandleLoad" />
                    </n-scrollbar>
                </template>
                <template #2>
                    <n-space vertical class="fileMain">
                        <n-space style="margin-left: 20px;">
                            <n-dropdown :options="fileMuiltSelectOptions" @select="fileMuiltSelectHandleSelect"
                                size="small" trigger="click">
                                <n-button size="tiny">操作</n-button>
                            </n-dropdown>
                        </n-space>
                        <n-scrollbar style="height: 80vh;">
                            <n-list hoverable clickable style="padding-right: 20px;">
                                <n-split direction="horizontal" :max="1" :min="'250px'">
                                    <template #1>
                                        <n-list-item v-for="intem in __fileInfo">
                                            <div style="display: flex;gap: 10px;">
                                                <span><n-checkbox value="Beijing" /></span>
                                                <span style="min-width: 20px;display: flex;align-items: center;">
                                                    <n-button text size="small">
                                                        <template #icon>
                                                            <n-icon :component="FileTrayFullOutline" />
                                                        </template>
                                                    </n-button>
                                                </span>
                                                <span style="width: max-content;">{{ intem.name }}</span>
                                            </div>
                                        </n-list-item>
                                    </template>
                                    <template #2>
                                        <n-list-item v-for="item in __fileInfo">
                                            <span style="min-width: 50px;max-width: max-content;text-align: centers;">
                                                {{ item.size }}
                                            </span>
                                        </n-list-item>
                                    </template>
                                    <template #resize-trigger>
                                      
                                    </template>
                                </n-split>
                            </n-list>
                        </n-scrollbar>
                    </n-space>
                </template>
            </n-split>
        </n-space>
    </main>
</template>

<script setup>
import { ref, onMounted, h } from "vue";
import { FileTrayFullOutline, Folder } from "@vicons/ionicons5";
import { NIcon, useMessage } from "naive-ui";
import { randomString } from "@/utils/common";

const defSplitSize = "350px"
const splitSize = ref(defSplitSize);
const splitMin = ref(0);
const splitMax = ref(defSplitSize);
const currDirPath = ref(["data", "music"]);

const message = useMessage();

const __fileInfo = []
for (let index = 0; index < 100; index++) {
    __fileInfo.push({
        name: randomString(5, 50),
        size: randomString(2, 7)
    })
}

Object.freeze(__fileInfo);

const treeData = ref([
    {
        key: "~/data",
        label: "data",
        isLeaf: false,
        prefix: () => h(NIcon, null, {
            default: () => h(Folder)
        }),
    },
    {
        key: "~/data2",
        label: "data2",
        isLeaf: false,
        prefix: () => h(NIcon, null, {
            default: () => h(Folder)
        }),
    }
]);

const treeValue = ref();

function breadcrumbItemClickEvent(index) {
    currDirPath.value.length = index + 1;
}

function treeHandleLoad(node) {
    console.log(node);
    return new Promise((resolve) => {
        setTimeout(() => {
            node.children = [
                {
                    label: node.label + '/1',
                    key: node.key + "/2",
                    isLeaf: false,
                    prefix: () => h(NIcon, null, {
                        default: () => h(Folder)
                    }),
                }
            ];
            console.log(node);
            resolve();
        }, 400);
    });
}

const fileMuiltSelectOptions = [
    {
        label: "删除",
        key: "delete",
    },
    {
        label: "剪切",
        key: "xcopy"
    },
    {
        label: "复制",
        key: "copy"
    },
    {
        label: "下载",
        key: "download"
    }
];

function fileMuiltSelectHandleSelect(key) {
    message.info(String(key));
}

onMounted(() => {
    if (window.innerWidth <= 650) {
        splitSize.value = 0;
        splitMax.value = '150px';
    };
    window.addEventListener('resize', () => {
        if (window.innerWidth > 650) {
            splitMax.value = defSplitSize;
        } else {
            splitSize.value = 0;
            splitMax.value = defSplitSize;
        }
    });
    document.querySelectorAll('.fileItem').forEach(function (element) {
        element.addEventListener('contextmenu', function (event) {
            event.preventDefault();
        });
    });
});

</script>

<style scoped>
.fileMain {
    margin: 5px;
}

.fileItem {
    display: flex;
    gap: 25px;
}
</style>