<template>
    <main class="TabItemMain">
        <NSpace vertical>
            <n-statistic label="总共" tabular-nums>
                <n-number-animation ref="numberAnimationInstRef" :from="0" :to="toNumber" />
                <template #suffix>个接口</template>
            </n-statistic>
            <div class="exToolMain">
                <n-space>
                    <n-spin size="tiny" v-if="isReloadingApiDoc" />
                    <n-button size="tiny" type="primary" @click="reloadApiDocDataEvent" v-if="!isReloadingApiDoc">
                        <template #icon>
                            <n-icon>
                                <RefreshIcon />
                            </n-icon>
                        </template>
                    </n-button>
                    <n-button class="exApiBtn" size="tiny" type="primary" @click="apiDrawerActive = !apiDrawerActive">
                        <template #icon>
                            <n-icon>
                                <PushLeftArrawIcon />
                            </n-icon>
                        </template></n-button>
                </n-space>
            </div>
            <n-split direction="horizontal" v-model:size="splitSize" :min="splitMin" :max="splitMax"
                :default-size="splitDefaultSize">
                <template #1>
                    <n-anchor :show-rail="true">
                        <n-anchor-link v-for="(apiItem, index) in apiDocData">
                            <template #title>
                                <div style="display: flex;" @click="apiItemClickEvent(index)">
                                    <span style="min-width: 170px;">{{ apiItem.url }}</span>
                                    <n-button size="tiny" type="primary" style="margin-left: 5px;">
                                        {{ apiItem.methed }}
                                    </n-button>
                                </div>
                            </template>
                        </n-anchor-link>
                    </n-anchor>
                </template>
                <template #2>
                    <n-card v-if="!apiDocData.length == 0" class="apiInfo">
                        <n-space vertical>
                            <n-space>
                                <n-button size="tiny" type="primary">描述</n-button>
                                <n-text>{{ apiDocData[currApiDocIndex].describe }}</n-text>
                            </n-space>
                            <n-space>
                                <n-button size="tiny" type="primary">地址</n-button>
                                <n-button size="tiny" secondary
                                    @click="apiBtnClickEvent(apiDocData[currApiDocIndex].url)">
                                    {{ apiDocData[currApiDocIndex].url }}
                                </n-button>
                                <n-button size="tiny" secondary type="primary">
                                    {{ apiDocData[currApiDocIndex].methed + '方法' }}
                                </n-button>
                            </n-space>
                            <n-space vertical>
                                <n-space>
                                    <n-button size="tiny" type="info">
                                        {{ apiDocData[currApiDocIndex].methed == 'GET' ? '请求参数' : '请求体(JSON)' }}
                                    </n-button>
                                    <n-button v-if="!apiDocData[currApiDocIndex].params.length > 0" size="tiny"
                                        type="info" secondary>
                                        无请求参数
                                    </n-button>
                                </n-space>
                                <n-space vertical>
                                    <n-space v-for="paramItem in apiDocData[currApiDocIndex].params">
                                        <n-button size="tiny" type="primary" @click="apiBtnClickEvent(paramItem.name)"
                                            style="width: 75px;">
                                            {{ paramItem.required ? paramItem.name + '*' : paramItem.name }}
                                        </n-button>
                                        <n-button size="tiny" secondary type="primary" style="width: 50px;">
                                            {{ paramItem.type }}
                                        </n-button>
                                        <n-button size="tiny" secondary>
                                            {{ paramItem.describe + (paramItem.required ? '(必填)' : '(选填)') }}
                                        </n-button>
                                    </n-space>
                                </n-space>
                                <n-space>
                                    <n-collapse>
                                        <n-collapse-item name="1">
                                            <template #header>
                                                <n-button size="tiny" type="info">响应结果</n-button>
                                            </template>
                                            <n-tabs type="line" animated>
                                                <n-tab-pane name="success" tab="成功">
                                                    <n-code :hljs="hljs" language="json"
                                                        :code="JSON.stringify(apiDocData[currApiDocIndex]?.response?.success, null, 2)" />
                                                </n-tab-pane>
                                                <n-tab-pane name="fail" tab="失败">
                                                    <n-code :hljs="hljs" language="json"
                                                        :code="JSON.stringify(apiDocData[currApiDocIndex]?.response?.fail, null, 2)" />
                                                </n-tab-pane>
                                            </n-tabs>
                                        </n-collapse-item>
                                    </n-collapse>
                                </n-space>
                                <n-space>
                                    <n-collapse>
                                        <n-collapse-item name="1">
                                            <template #header>
                                                <n-button size="tiny" type="info">请求示例</n-button>
                                            </template>
                                            <n-space vertical>
                                                <n-button size="tiny" type="primary">copy</n-button>
                                                <n-code :hljs="hljs" language="javascript"
                                                    :code="axiosExampltCodeTemplate" />
                                            </n-space>
                                        </n-collapse-item>
                                    </n-collapse>
                                </n-space>
                            </n-space>
                        </n-space>
                    </n-card>
                </template>
            </n-split>
        </NSpace>
        <n-drawer v-model:show="apiDrawerActive" :width="350">
            <n-drawer-content title="API列表">
                <n-anchor :show-rail="true">
                    <n-anchor-link v-for="(apiItem, index) in apiDocData">
                        <template #title>
                            <div style="display: flex;justify-content: space-between;"
                                @click="apiItemClickEvent(index)">
                                <span>{{ apiItem.url }}</span>
                                <n-button size="tiny" type="primary">{{ apiItem.methed }}</n-button>
                            </div>
                        </template>
                    </n-anchor-link>
                </n-anchor>
            </n-drawer-content>
        </n-drawer>
    </main>
</template>

<script setup>
import { ref, onBeforeMount, onMounted, watch } from "vue";
import { useMessage } from "naive-ui";
import axios from 'axios';
import { copy2Clipboard } from "@/utils/common";
import RefreshIcon from "@/components/icons/RefreshIcon.vue";
import PushLeftArrawIcon from "@/components/icons/PushLeftArrawIcon.vue";
const message = useMessage();
const toNumber = ref(0);
const numberAnimationInstRef = ref(null);
const apiDrawerActive = ref(false);


import hljs from 'highlight.js/lib/core'
import json from 'highlight.js/lib/languages/json'
import javascript from 'highlight.js/lib/languages/javascript'
hljs.registerLanguage('json', json)
hljs.registerLanguage('javascript', javascript)

const apiDocData = ref([]);
const currApiDocIndex = ref(null);

const splitSize = ref('250px');
const splitMin = ref(0);
const splitMax = ref('250px');
const splitDefaultSize = ref('250px');

const isReloadingApiDoc = ref(false);

const axiosExampltCodeTemplate = ref('');


watch(() => currApiDocIndex.value, (newValue) => {
    let params = {};
    for (let index = 0; index < apiDocData.value[newValue].params.length; index++) {
        params[apiDocData.value[newValue].params[index].name] = apiDocData.value[newValue].params[index].exampleValue;
    }
    axiosExampltCodeTemplate.value =
        `axios.${apiDocData.value[newValue].methed.toLowerCase()}('${apiDocData.value[newValue].url}'${apiDocData.value[newValue].params.length > 0 ? `,{
params:${JSON.stringify(params, null, 2).replace(/.$/, "   $&")}
})` : ')'}   
.then(function (response) {
  console.log(response);
}).catch(function (error) {
  console.log(error);
}).finally(function () {
  // 总是会执行
});`
});



onMounted(() => {
    if (window.innerWidth <= 650) splitSize.value = 0;
    numberAnimationInstRef.value?.play();
});

onBeforeMount(() => {
    window.addEventListener('resize', () => {
        if (window.innerWidth <= 650) {
            splitSize.value = 0;
        } else {
            splitSize.value = '250px';
        }
    });
    loadApiDocData();
});

function apiBtnClickEvent(text) {
    copy2Clipboard(text)
        .then(() => {
            message.success(`复制成功:'${text}'`);
        });
}

function loadApiDocData() {
    return axios.get('/data/apiDoc.json')
        .then(response => {
            apiDocData.value = response.data;
            currApiDocIndex.value = 0;
            toNumber.value = apiDocData.value.length;

        })
};

function reloadApiDocDataEvent() {
    let oldIndex = currApiDocIndex.value;
    isReloadingApiDoc.value = true;
    setTimeout(() => {
        loadApiDocData().then(() => {
            isReloadingApiDoc.value = false;
            numberAnimationInstRef.value?.play();
            currApiDocIndex.value = oldIndex;
            message.success("刷新成功");
        });
    }, 800);

}

function apiItemClickEvent(index) {
    currApiDocIndex.value = index;
    apiDrawerActive.value = false
}

</script>

<style scoped>
.exToolMain {
    display: flex;
    height: 18px;
    justify-content: end;
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
}
</style>