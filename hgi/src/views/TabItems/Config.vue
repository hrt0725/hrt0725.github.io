<template>
    <main class="TabItemMain">
        <n-anchor style="padding-left: 1rem;">
            <n-anchor-link title="主题">
                <div class="configItem">
                    <n-button type="primary" size="tiny" @click="themeBtn">{{ themeTitle }}</n-button>
                    <n-switch @click="changetheme" v-model:value="useThemeStore().isDark" />
                </div>
                <div class="configItem">
                    <n-button type="primary" size="tiny">主题选择</n-button>
                    <n-select size="tiny" v-model:value="themeOptionsValue" :options="themeOptions"
                        :consistent-menu-width="false" style="max-width: 200px;" />
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
                        <template #prefix>
                            {{ useUserStore().musicSever }}
                        </template>
                    </n-input>
                    <n-button size="tiny" @click="openURL(useUserStore().musicSever + useUserStore().musicManifestPath)">
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
                        <template #prefix>
                            {{ useUserStore().musicSever }}
                        </template>
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
                    <n-button type="primary" size="tiny" @click="debugBtnEvent">调试按钮</n-button>
                </div>
            </n-anchor-link>
        </n-anchor>
    </main>
</template>

<script setup>
import { ref } from "vue";
import { darkTheme } from "naive-ui";
import { useThemeStore, useUserStore } from "@/stores/config";
import { useBroadcastChannel } from '@/stores/broadcastChannel';
import { openURL } from '@/utils/common';
import Warning from "@/components/icons/Warning.vue";
import Wifi from "@/components/icons/Wifi.vue";
import Success from "@/components/icons/Success.vue";
import Error from "@/components/icons/Error.vue";
import UpWardIcon from "@/components/icons/UpWardIcon.vue";
import NewTheme from "@/views/TabItems/NewTheme.vue";
const themeTitle = ref("明亮");
const isTesting = ref(false);
const isTested = ref(false);
const isSuccess = ref(true);

const themeOptionsValue = ref(true);
const themeOptions = [
    { label: "图片URL", value: true },
    { label: "本地图片", value: false }
];

const changetheme = () => {
    themeTitle.value = useThemeStore().theme == null ? "暗黑" : "明亮";
    useThemeStore().theme = useThemeStore().theme == null ? darkTheme : null;
};

function themeBtn() {
    useThemeStore().isDark = !useThemeStore().isDark;
    changetheme()
};

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

function isValidUrl(string) {
    try {
        new URL(string);
        return true;
    } catch (_) {
        return false;
    }
};

function checkUrlStatus(url) {
    if (!isValidUrl(url)) {
        return Promise.resolve(false);
    }
    return fetch(url, { method: 'GET' })
        .then(response => response.ok)
        .catch(() => false);
};

function testServerEvent() {
    isTesting.value = true;
    isTested.value = false;
    checkUrlStatus(useUserStore().severAddr).then((data) => {
        isTested.value = true;
        isTesting.value = false;
        isSuccess.value = data;
    }).catch((data) => {
        isTested.value = true;
        isSuccess.value = false;
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