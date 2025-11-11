<template>
    <div class="miniMenuBtn" style="">
        <n-button type="primary" size="tiny" @click="miniMenuBtnEvent" style="height: 200px; padding: 3px;" />
    </div>
    <n-drawer v-model:show="activeDrawer" placement="left">
        <n-drawer-content>
            <n-menu v-model:value="activeKey" :options="menuOptions" :on-update:value="onupdate" />
        </n-drawer-content>
    </n-drawer>
    <n-space vertical>
        <n-layout has-sider>
            <n-layout-sider class="menuMain" bordered collapse-mode="width" :collapsed="collapsed" show-trigger
                @collapse="collapsed = true" @expand="collapsed = false">
                <n-scrollbar style="height:100vh;width: auto;">
                    <n-menu v-model:value="activeKey" :options="menuOptions" :on-update:value="onupdate" />
                </n-scrollbar>
            </n-layout-sider>
            <n-layout>
                <n-tabs v-model:value="activeTabName" type="card" tab-style="height:30px;" animated closable
                    size="small" @close="handleClose">
                    <n-tab-pane display-directive="show" v-for="panel in panels" :key="panel" :tab="panel.tab"
                        :name="panel.name">
                        <n-scrollbar style="height:90vh;">
                            <component :is="panel.content" />
                        </n-scrollbar>
                    </n-tab-pane>
                </n-tabs>
            </n-layout>
        </n-layout>
    </n-space>


</template>

<script setup>
import { SettingsOutline, HomeOutline, MusicalNotesOutline } from "@vicons/ionicons5";
import { NIcon } from "naive-ui";
import { ref, h } from "vue";
import Config from "./TabItems/Config.vue";
import WelCome from "./TabItems/WelCome.vue";
import Music from "./TabItems/Music.vue";
import { useUserStore } from "@/stores/config";


const activeDrawer = ref(false)
const collapsed = ref(true)
const activeKey = ref(null);
const TabItemNum = ref(1)
const menuOptions = [
    {
        label: "欢迎",
        name: "welcome",
        content: WelCome,
        icon: renderIcon(HomeOutline),
    },
    {
        label: "音乐",
        name: "Music",
        content: Music,
        icon: renderIcon(MusicalNotesOutline),
    },
    {
        label: "设置",
        name: "config",
        content: Config,
        icon: renderIcon(SettingsOutline),
    },

];
const activeTabName = ref(null)
const panels = ref([]);

function onupdate(key, item) {
    TabItemNum.value += 1;
    let newName = item.name + TabItemNum.value;
    panels.value.push({
        tab: item.label,
        name: newName,
        content: item.content
    })
    activeTabName.value = newName;

    if (useUserStore().isClickMenu2Collapsed) {
        collapsed.value = true;
        activeDrawer.value = false;
    }

}
function miniMenuBtnEvent() {
    activeDrawer.value = true
}
function handleClose(closeName) {
    if (panels.value.length === 1) {
        return;
    }
    const index = panels.value.findIndex((v) => {
        return closeName === v.name;
    });
    panels.value.splice(index, 1);
    if (panels.value.length - 1 === -1) return;
    activeTabName.value = panels.value[panels.value.length - 1].name;
}

function renderIcon(icon) {
    return () => h(NIcon, null, { default: () => h(icon) });
}

</script>


<style scoped>
.miniMenuBtn {
    position: absolute;
    z-index: 100;
    top: 10%;
}

@media (min-width: 650px) {
    .miniMenuBtn {
        display: none;
    }
}

@media (max-width: 650px) {
    .menuMain {
        display: none;
    }
}

.container {
    width: 100%;
    height: 200px;
    background-color: rgba(128, 128, 128, 0.3);
    border-radius: 3px;
    overflow: auto;
}

.padding {
    height: 150px;
    width: 100%;
    background-color: rgba(128, 128, 128, 0.15);
}

.content {
    height: 600px;
}
</style>