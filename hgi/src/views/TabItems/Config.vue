<template>
    <main class="TabItemMain">
        <n-anchor style="padding-left: 1rem;">
            <n-anchor-link title="主题">
                <n-space>
                    <n-button type="primary" size="tiny" @click="themeBtn">{{ themeTitle }}</n-button>
                    <n-switch @click="changetheme" v-model:value="useThemeStore().isDark" />
                </n-space>

            </n-anchor-link>
            <n-anchor-link title="配置">
                <n-space>
                    <n-button type="primary" size="tiny"
                        @click="useUserStore().isClickMenu2Collapsed = !useUserStore().isClickMenu2Collapsed">{{
                            "在菜单选择后收起菜单" }}</n-button>
                    <n-switch v-model:value="useUserStore().isClickMenu2Collapsed">
                        <template #checked>
                            {{ useUserStore().isClickMenu2Collapsed }}
                        </template>
                        <template #unchecked>
                            {{ useUserStore().isClickMenu2Collapsed }}
                        </template>
                    </n-switch>
                </n-space>
            </n-anchor-link>
        </n-anchor>
    </main>
</template>

<script setup>
import { ref } from "vue";
import { darkTheme } from "naive-ui";
import { useThemeStore, useUserStore } from "@/stores/config";
const themeTitle = ref("明亮");


const changetheme = () => {
    themeTitle.value = useThemeStore().theme == null ? "暗黑" : "明亮";
    useThemeStore().theme = useThemeStore().theme == null ? darkTheme : null;
};
function themeBtn() {
    useThemeStore().isDark = !useThemeStore().isDark;
    changetheme()
}
</script>