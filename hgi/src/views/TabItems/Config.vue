<template>
    <main class="TabItemMain">
        <n-anchor style="padding-left: 1rem;">
            <n-anchor-link title="主题">
                <div class="configItem">
                    <n-button type="primary" size="tiny" @click="themeBtn">{{ themeTitle }}</n-button>
                    <n-switch @click="changetheme" v-model:value="useThemeStore().isDark" />
                </div>
            </n-anchor-link>
            <n-anchor-link title="音乐">
                <div class="configItem">
                    <n-button type="primary" size="tiny">自动缓存文件</n-button>
                    <n-switch v-model:value="useUserStore().autoCacheFile" />
                </div>
                <div class="configItem">
                    <n-button type="primary" size="tiny">文件服务器URL</n-button>
                    <n-select v-model:value="useUserStore().musicSever" :options="useUserStore().musicSevers"
                        size="tiny" style="max-width: max-content;" filterable tag :consistent-menu-width="false"
                        @update:value="handleUpdateValue" />
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
            <n-anchor-link title="其它">
                <div class="configItem">
                    <n-button type="primary" size="tiny"
                        @click="useUserStore().isClickMenu2Collapsed = !useUserStore().isClickMenu2Collapsed">
                        在菜单选择后收起</n-button>
                    <n-switch v-model:value="useUserStore().isClickMenu2Collapsed" />
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
import Warning from "@/components/icons/Warning.vue";
const themeTitle = ref("明亮");


const changetheme = () => {
    themeTitle.value = useThemeStore().theme == null ? "暗黑" : "明亮";
    useThemeStore().theme = useThemeStore().theme == null ? darkTheme : null;
};
function themeBtn() {
    useThemeStore().isDark = !useThemeStore().isDark;
    changetheme()
}

function debugBtnEvent() {
    console.log(useUserStore().musicSever);
    console.log(useUserStore().musicSevers);
}
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
}
</script>


<style scoped>
.configItem {
    display: flex;
    gap: 5px;
    margin-left: 1rem;
    margin-bottom: 5px;
}
</style>