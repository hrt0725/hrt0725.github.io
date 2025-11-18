<template>
    <n-collapse :on-item-header-click="itemClickEvent">
        <n-collapse-item name="1">
            <template #header>
                <n-button size="tiny" type="primary">Monaco</n-button>
            </template>
            <n-space vertical>
                <div class="codeToolsMain">
                    <n-space>
                        <n-button size="tiny" type="primary">选择文件...</n-button>
                        <n-button size="tiny" type="primary">下载</n-button>
                    </n-space>
                    <n-space>
                        <n-select v-model:value="language" :options="languages" size="tiny"
                            style="max-width: max-content;" :consistent-menu-width="false" />
                        <n-button size="tiny" type="primary" @click="formatCodeEvent">格式化</n-button>
                        <n-button size="tiny" type="primary" @click="runCodeEvent">
                            <template #icon>
                                <RunAllIcon />
                            </template>
                        </n-button>
                    </n-space>
                </div>
                <n-space>
                    <div ref="editorContainer" class="editor-container"></div>
                </n-space>
                <n-space>
                    <n-button size="tiny" type="primary" @click="resultBtnClickEvent">输出</n-button>
                    <n-button size="tiny" type="primary" @click="cleanBtnClickEvent">清空</n-button>
                </n-space>
                <n-scrollbar v-if="isShowResult" style="max-height: 200px;width: 100%;">
                    <span class="resultItem" v-for="resultItem in codeRunResult">{{ resultItem }}</span>
                </n-scrollbar>
            </n-space>
        </n-collapse-item>
    </n-collapse>
</template>

<script setup>
import RunAllIcon from '@/components/icons/RunAllIcon.vue';
import { ref, watch, nextTick, onMounted, onUnmounted } from 'vue';

import * as monaco from 'monaco-editor';
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker'
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker'
import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker'
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'
import { useUserStore } from '@/stores/config';
import { Languages } from "@/data/Monaco/Language";
const editorContainer = ref(null);
let editorInstance = null;
const codeStr = ref(`console.log('Hello Monaco Editor in Vue 3!');`);

const language = ref("javascript");
const languages = ref(Languages);
let logBack = window.console.log;
const isShowResult = ref(true);
const codeRunResult = ref([]);


onMounted(() => {
    window.console.log = (data) => {
        logBack(data);
        codeRunResult.value.push(data);
    }
});

onUnmounted(() => {
    window.console.log = logBack;
});

self.MonacoEnvironment = {
    getWorker(_, label) {
        if (label === 'json') {
            return new jsonWorker()
        }
        if (label === 'css' || label === 'scss' || label === 'less') {
            return new cssWorker()
        }
        if (label === 'html' || label === 'handlebars' || label === 'razor') {
            return new htmlWorker()
        }
        if (label === 'typescript' || label === 'javascript') {
            return new tsWorker()
        }
        return new editorWorker()
    }
};

watch(() => language.value, (newValue) => {
    reloadMonaco(newValue, useUserStore().codeTheme);
});

function runCodeEvent() {
    eval(editorInstance.getValue());
};

function formatCodeEvent() {
    if (editorInstance) {
        editorInstance.getAction("editor.action.formatDocument").run();
    }
};

function reloadMonaco(language, theme) {
    if (editorInstance) {
        editorInstance.dispose();
        editorInstance = null;
    }
    if (editorContainer.value) {
        editorInstance = monaco.editor.create(editorContainer.value, {
            value: codeStr.value,
            language: language,
            theme: theme,
            automaticLayout: true
        });
    }
};

function itemClickEvent(data) {
    if (data.name == "1", data.expanded) {
        nextTick(() => {
            reloadMonaco(language.value, useUserStore().codeTheme);
        });
    }
};

function resultBtnClickEvent() {
    isShowResult.value = !isShowResult.value;
};

function cleanBtnClickEvent() {
    codeRunResult.value = [];
};

</script>

<style scoped>
.codeToolsMain {
    display: flex;
    justify-content: space-between;
    gap: 5px;
}

.editor-container {
    width: 700px;
    height: 400px;
    border: 1px solid #ececec;
}

.resultItem {
    display: block;
    width: 100%;
}

@media (max-width: 650px) {
    .editor-container {
        width: 100%;
        margin-right: 2rem;
    }
}
</style>