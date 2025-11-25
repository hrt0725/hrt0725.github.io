<template>
    <main class="TabItemMain">
        <NSpace vertical>
            <n-statistic label="总共" tabular-nums>
                <n-number-animation ref="numberAnimationInstRef" :from="0" :to="toNumber" />
                <template #suffix>个接口</template>
            </n-statistic>
            <div class="exApiBtn">
                <n-button size="tiny" type="primary" @click="apiDrawerActive = !apiDrawerActive">. .
                    .</n-button>
            </div>
            <n-split direction="horizontal" v-model:size="splitSize" :min="splitMin" :max="splitMax"
                :default-size="splitDefaultSize">
                <template #1>
                    <n-anchor :show-rail="true">
                        <n-anchor-link v-for="(apiItem, index) in apiDocData">
                            <template #title>
                                <div style="display: flex;" @click="apiItemClickEvent(index)">
                                    <span style="min-width: 170px;">{{ apiItem.url }}</span>
                                    <n-button size="tiny" type="primary" style="margin-left: 5px;">{{ apiItem.methed
                                        }}</n-button>
                                </div>
                            </template>
                        </n-anchor-link>
                    </n-anchor>
                </template>
                <template #2>
                    <div v-if="!apiDocData.length == 0" class="apiInfo" style="background-color: #F8F8F8;">
                        <n-space vertical>
                            <n-space>
                                <n-button size="tiny" type="primary">描述</n-button>
                                <n-text>{{ apiDocData[currApiDocIndex].dist }}</n-text>
                            </n-space>
                            <n-space>
                                <n-button size="tiny" type="primary">地址</n-button>
                                <n-button size="tiny" secondary>{{ apiDocData[currApiDocIndex].url }}</n-button>
                                <n-button size="tiny" secondary type="primary">{{ apiDocData[currApiDocIndex].methed
                                }}</n-button>
                            </n-space>
                            <n-space vertical>
                                <n-space>
                                    <n-button size="tiny" type="primary">{{
                                        apiDocData[currApiDocIndex].methed == 'GET' ? '请求参数' : '请求体(JSON)' }}</n-button>
                                </n-space>
                                <n-space vertical>
                                    <n-space v-for="paramItem in apiDocData[currApiDocIndex].params">
                                        <n-button size="tiny" type="primary">{{
                                            paramItem.bt ? paramItem.name + '*' : paramItem.name }}</n-button>
                                        <n-button size="tiny" secondary type="primary">{{ paramItem.type }}</n-button>
                                    </n-space>
                                </n-space>
                            </n-space>
                        </n-space>
                    </div>
                </template>
            </n-split>
        </NSpace>
        <n-drawer v-model:show="apiDrawerActive" :width="350">
            <n-drawer-content title="API列表">
                <n-anchor :show-rail="true">
                    <n-anchor-link>
                        <template #title>
                            <div style="display: flex;justify-content: space-between;">
                                <span>/api/user/login</span>
                                <n-button size="tiny" type="primary">GET</n-button>
                            </div>
                        </template>
                    </n-anchor-link>
                </n-anchor>
            </n-drawer-content>
        </n-drawer>
    </main>
</template>

<script setup>
import { ref, onBeforeMount } from "vue";
import axios from 'axios';
const toNumber = ref(0);
const numberAnimationInstRef = ref(null);
const apiDrawerActive = ref(false);

const apiDocData = ref([]);
const currApiDocIndex = ref(0);

const splitSize = ref('250px');
const splitMin = ref(0);
const splitMax = ref('250px');
const splitDefaultSize = ref('250px');

onBeforeMount(() => {
    axios.get('/data/apiDoc.json')
        .then(response => {
            apiDocData.value = response.data;
            currApiDocIndex.value = 0;
            toNumber.value = apiDocData.value.length;
            numberAnimationInstRef.value?.play();
        })

    window.addEventListener('resize', () => {
        if (window.innerWidth <= 650) {
            splitSize.value = 0;
        } else {
            splitSize.value = '250px';
        }
    });
});

function apiItemClickEvent(index) {
    currApiDocIndex.value = index;
}

</script>

<style scoped>
.apiInfo {
    margin: 0px 5px;
}
</style>

<style>
@media (min-width: 650px) {
    .exApiBtn {
        display: none;
    }
}

@media (max-width: 650px) {
    .apiList {
        display: none;
    }

    .exApiBtn {
        display: flex;
        justify-content: end;
    }
}
</style>