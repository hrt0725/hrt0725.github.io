<template>
    <main class="TabItemMain">
        <n-anchor style="padding-left: 1rem;">
            <n-anchor-link title="主题">
                <div class="configItem">
                    <n-button type="primary" size="tiny" @click="themeBtn">{{ themeTitle }}</n-button>
                    <n-switch @click="changetheme" v-model:value="useUserStore().isDark" />
                </div>
                <div class="configItem">
                    <n-button type="primary" size="tiny">主题选择</n-button>
                    <n-select size="tiny" v-model:value="useUserStore().themeOptionsValue"
                        :options="useUserStore().themeOptions" :consistent-menu-width="false"
                        style="max-width: 135px;" />
                    <n-button type="primary" secondary size="tiny" @click="addThemeEvent">导入主题</n-button>
                    <n-dropdown trigger="click" size="small" :options="themeOptions" @select="themeOptionsHandleSelect">
                        <n-button type="primary" secondary size="tiny">...</n-button>
                    </n-dropdown>
                </div>
                <div class="configItem">
                    <n-button type="primary" size="tiny">新主题</n-button>
                    <n-button size="tiny" @click="newThemeEvent">
                        <template #icon>
                            <n-icon>
                                <UpWardIcon />
                            </n-icon>
                        </template>
                    </n-button>
                </div>
            </n-anchor-link>
            <n-anchor-link title="服务器">
                <div class="configItem">
                    <n-button type="primary" size="tiny">服务器地址</n-button>
                    <n-input v-model:value="useUserStore().severAddr" size="tiny" autosize style="min-width: 200px;" />
                    <n-spin v-if="isTesting" size="tiny" />
                    <n-icon :color="isSuccess ? 'green' : 'red'" size="21" v-if="isTested">
                        <Success v-if="isSuccess" />
                        <Error v-if="!isSuccess" />
                    </n-icon>
                    <n-button type="primary" size="tiny" circle @click="testServerEvent">
                        <template #icon>
                            <n-icon>
                                <Wifi />
                            </n-icon>
                        </template>
                    </n-button>
                </div>
            </n-anchor-link>
            <n-anchor-link title="音乐">
                <div class="configItem">
                    <n-button type="primary" size="tiny">自动缓存文件</n-button>
                    <n-switch v-model:value="useUserStore().autoCacheFile" />
                </div>
                <div class="configItem">
                    <n-button type="primary" size="tiny">服务器</n-button>
                    <n-select v-model:value="useUserStore().musicSever" :options="useUserStore().musicSevers"
                        size="tiny" style="max-width: max-content;" filterable tag :consistent-menu-width="false"
                        @update:value="handleUpdateValue" />
                </div>
                <div class="configItem">
                    <n-button type="primary" size="tiny">清单路径</n-button>
                    <n-input v-model:value="useUserStore().musicManifestPath" size="tiny" placeholder="路径"
                        style="max-width: 215px;">
                        <template #prefix>.../</template>
                    </n-input>
                    <n-button size="tiny"
                        @click="openURL(useUserStore().musicSever + useUserStore().musicManifestPath)">
                        <template #icon>
                            <n-icon>
                                <UpWardIcon />
                            </n-icon>
                        </template>
                    </n-button>
                </div>
                <div class="configItem">
                    <n-button type="primary" size="tiny">文件路径</n-button>
                    <n-input v-model:value="useUserStore().musicFilePath" size="tiny" placeholder="路径"
                        style="max-width: 215px;">
                        <template #prefix>.../</template>
                    </n-input>
                    <n-popover trigger="hover">
                        <template #trigger>
                            <n-icon size="21">
                                <Warning />
                            </n-icon>
                        </template>
                        <p style="margin: 0;">示例:"http://xxxx/music/"</p>
                        <p style="margin: 0;">文件命名规则"名字-歌手.mp3"</p>
                    </n-popover>
                </div>
            </n-anchor-link>
            <n-anchor-link title="工具">
                <n-anchor-link title="Monaco">
                    <div class="configItem">
                        <n-button type="primary" size="tiny">主题</n-button>
                        <n-select v-model:value="useUserStore().codeTheme" :options="useUserStore().codeThemes"
                            size="tiny" style="max-width: max-content;" :consistent-menu-width="false" />
                    </div>
                </n-anchor-link>
            </n-anchor-link>
            <n-anchor-link title="其它">
                <div class="configItem">
                    <n-button type="primary" size="tiny"
                        @click="useUserStore().isClickMenu2Collapsed = !useUserStore().isClickMenu2Collapsed">
                        在菜单选择后收起</n-button>
                    <n-switch v-model:value="useUserStore().isClickMenu2Collapsed" />
                </div>
                <div class="configItem">
                    <n-button type="primary" size="tiny"
                        @click="useUserStore().multiwindowing = !useUserStore().multiwindowing">
                        功能标签多开</n-button>
                    <n-switch v-model:value="useUserStore().multiwindowing" />
                </div>
                <div class="configItem">
                    <n-button type="primary" size="tiny">页面标题</n-button>
                    <n-input size="tiny" style="width: 120px;" v-model:value="useUserStore().pageTitle" />
                </div>
                <div class="configItem">
                    <n-button type="primary" size="tiny" @click="setToDefConfig">重设为默认</n-button>
                </div>
                <div class="configItem">
                    <n-button type="primary" size="tiny" @click="debugBtnEvent">调试按钮</n-button>
                </div>
            </n-anchor-link>
        </n-anchor>
    </main>
</template>

<script setup>
import { ref } from "vue";
import { darkTheme, useDialog, useMessage, NInput, NButton } from "naive-ui";
import { useUserStore } from "@/stores/config";
import { useBroadcastChannel } from '@/stores/broadcastChannel';
import { openURL, checkUrlStatus } from '@/utils/common';
import { selectJsonFile } from '@/utils/file';
import Warning from "@/components/icons/Warning.vue";
import Wifi from "@/components/icons/Wifi.vue";
import Success from "@/components/icons/Success.vue";
import Error from "@/components/icons/Error.vue";
import UpWardIcon from "@/components/icons/UpWardIcon.vue";
import NewTheme from "@/views/TabItems/NewTheme.vue";
import { InputDialog } from "@/utils/component";
const dialog = useDialog();
const message = useMessage();

const themeTitle = ref("明亮");
const isTesting = ref(false);
const isTested = ref(false);
const isSuccess = ref(true);

const themeOptions = ref([
    { label: "删除", key: "delete" },
    { label: "重命名", key: "rename" }
]);

function themeOptionsHandleSelect(name) {
    if (name == 'delete') {
        if (useUserStore().themeOptionsValue == 'def') {
            message.error("默认不可删除");
            return;
        };
        let oldName = useUserStore().themeOptionsValue;
        let index = useUserStore().themeOptions.findIndex(i => i.label == oldName);
        useUserStore().themeOptions.splice(index, 1);
        let JsonDataIndex = useUserStore().themesJsonData.findIndex(i => i.label == oldName);
        useUserStore().themesJsonData.splice(JsonDataIndex, 1);
        useUserStore().themeOptionsValue = 'def';
        message.success('删除成功:' + oldName);
    } else if (name == 'rename') {
        if (useUserStore().themeOptionsValue == 'def') {
            message.error("默认不可更改");
            return
        }
        InputDialog(dialog, 'info', '重命名主题', (newText) => {
            dialog.destroyAll();
            let index = useUserStore().themeOptions.findIndex(i => i.label == useUserStore().themeOptionsValue);
            useUserStore().themeOptions[index].label = newText;
            useUserStore().themeOptions[index].value = newText;
            useUserStore().themesJsonData.find(i => i.label == useUserStore().themeOptionsValue).label = newText;
            useUserStore().themeOptionsValue = newText;
        });
    }
}

const changetheme = () => {
    themeTitle.value = useUserStore().theme == null ? "暗黑" : "明亮";
    useUserStore().theme = useUserStore().theme == null ? darkTheme : null;
};

function themeBtn() {
    useUserStore().isDark = !useUserStore().isDark;
    changetheme()
};

function addThemeEvent() {
    InputDialog(dialog, 'info', '添加主题', (newText) => {
        dialog.destroyAll();
        selectJsonFile().then(json => {
            useUserStore().themeOptions.push({ label: newText, value: newText });
            useUserStore().themesJsonData.push({ label: newText, value: json });
            useUserStore().themeOptionsValue = newText;
        }).catch(err => {
            console.error(err);
        });
    });
};

function setToDefConfig() {
    useUserStore().setToDef();
}

function handleNegativeClick() {
    message.warning("取消");
}

function handlePositiveClick() {
    message.success("确认");
}

function debugBtnEvent() {
    console.log(isSuccess.value);
};

function handleUpdateValue(value, option) {
    const userStore = useUserStore();
    if (value == "defMusicSever") {
        userStore.musicSever = userStore.defMusicSever;
        return;
    }
    const existingItem = userStore.musicSevers.find(element =>
        element.value === option.value && element.label === option.label
    );
    if (!existingItem) userStore.musicSevers.push(option);
};


function testServerEvent() {
    isTesting.value = true;
    isTested.value = false;
    checkUrlStatus(useUserStore().severAddr).then((data) => {
        isTesting.value = false;
        isSuccess.value = data;
        isTested.value = true;
    }).catch((data) => {
        isSuccess.value = false;
        isTested.value = true;
    }).finally(() => {
        if (isSuccess.value) {
            message.success("服务器可用");
        } else {
            message.error("服务器不可用");
        }
    })
};

function newThemeEvent() {
    useBroadcastChannel().postMessage({
        type: "newTab",
        data: {
            label: "新主题",
            name: "NewTheme",
            content: NewTheme,
        }
    });
};
</script>

<style scoped>
.configItem {
    display: flex;
    gap: 5px;
    margin-left: 1rem;
    margin-bottom: 5px;
}
</style>