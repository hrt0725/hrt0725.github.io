<template>
    <main class="TabItemMain">
        <n-space vertical>
            <n-breadcrumb>
                <n-breadcrumb-item @click="breadcrumbItemClickEvent(index)">~</n-breadcrumb-item>
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
                        <n-button size="tiny">
                            tool
                        </n-button>
                        <n-scrollbar style="height: 80vh;">
                            <div class="fileItem" v-for="i in 200">
                                <span style="min-width: 20px;display: flex;">
                                    <n-button text size="small">
                                        <template #icon>
                                            <n-icon>
                                                <FileTrayFullOutline />
                                            </n-icon>
                                        </template>
                                    </n-button>
                                </span>
                                <span style="min-width: 250px;">fileName</span>
                                <span>18MB</span>
                            </div>
                        </n-scrollbar>
                    </n-space>
                </template>
            </n-split>
        </n-space>
    </main>
</template>

<script setup>
import { ref, onMounted, h } from "vue";
import {
    FileTrayFullOutline,
    Folder,
} from "@vicons/ionicons5";
import { NIcon } from "naive-ui";

const defSplitSize = "350px"
const splitSize = ref(defSplitSize);
const splitMin = ref(0);
const splitMax = ref(defSplitSize);
const currDirPath = ref(["data", "music"]);


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

onMounted(() => {
    if (window.innerWidth <= 650) {
        splitSize.value = 0;
        splitMax.value = '150px';
    }
    window.addEventListener('resize', () => {
        if (window.innerWidth > 650) {
            splitMax.value = defSplitSize;
        } else {
            splitSize.value = 0;
            splitMax.value = defSplitSize;
        }
    })
});

</script>


<style scoped>
.fileMain {
    margin: 5px;
}

.fileItem {
    margin-bottom: 5px;
    display: flex;
    padding: 0px 5px;
    max-width: max-content;
    min-width: 500px;
    gap: 10px;
}

.fileItem:hover {
    background-color: aliceblue;
}
</style>