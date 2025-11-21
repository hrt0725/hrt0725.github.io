<template>
    <main class="TabItemMain">
        <NThemeEditor>
            <n-space vertical>
                <n-space>
                    <n-button size="tiny">Default</n-button>
                    <n-button size="tiny" type="tertiary">Tertiary</n-button>
                    <n-button size="tiny" type="primary">Primary</n-button>
                    <n-button size="tiny" type="info">Info</n-button>
                    <n-button size="tiny" type="success">Success</n-button>
                    <n-button size="tiny" type="warning">Warning</n-button>
                    <n-button size="tiny" type="error">Error</n-button>
                </n-space>
                <n-space>
                    <n-input size="tiny" v-model:value="textValue" type="text" placeholder="基本的 Input" />
                </n-space>
                <n-space>
                    <n-dynamic-tags size="small" v-model:value="tags" />
                </n-space>
                <n-space>
                    <n-switch size="small" v-model:value="switchValue" />
                </n-space>
                <n-space>
                    <n-checkbox-group v-model:value="cities">
                        <n-space item-style="display: flex;">
                            <n-checkbox size="small" value="Beijing" label="北京" />
                            <n-checkbox size="small" value="Shanghai" label="上海" />
                            <n-checkbox size="small" value="Guangzhou" label="广州" />
                        </n-space>
                    </n-checkbox-group>
                </n-space>
                <n-space>
                    <n-slider size="tiny" v-model:value="intValue" :step="1" style="width: 200px;" />
                </n-space>
                <n-space>
                    <n-input-otp size="small" v-model:value="optValue" @focus="onFocus" @blur="onBlur"
                        @finish="onFinish" @update:value="onUpdateValue" />
                </n-space>
                <n-space>
                    <n-rate />
                </n-space>
                <n-space>
                    <n-card title="卡片">卡片内容</n-card>
                    <n-avatar size="tiny" src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg" />
                </n-space>
                <n-space>
                    <n-collapse>
                        <n-collapse-item title="鱼：🐟" name="1">
                            <div>鱿鱼：🦑</div>
                        </n-collapse-item>
                    </n-collapse>
                </n-space>
                <n-space>
                    <n-dropdown :show="showDropdown" :options="options" @select="handleSelect">
                        <n-button size="tiny" @click="handleClick">下拉菜单</n-button>
                    </n-dropdown>
                </n-space>
                <n-space>
                    <n-color-picker size="small" style="width: 150px;" />
                </n-space>
                <n-space>
                    <n-date-picker size="tiny" v-model:value="timestamp" type="date" />
                </n-space>
            </n-space>
        </NThemeEditor>
    </main>
</template>

<script setup>
import { ref } from 'vue';
import { NThemeEditor, useMessage } from 'naive-ui';

const message = useMessage();
const showDropdown = ref(false);
const timestamp = ref(Date.now());
const textValue = ref('');
const intValue = ref(100);
const tags = ref(['教师', '程序员']);
const switchValue = ref(true);
const cities = ref(null)
const options = [
    {
        label: '滨海湾金沙，新加坡',
        key: 'marina bay sands',
        disabled: true
    },
    {
        label: '比佛利山庄酒店，洛杉矶',
        key: 'the beverly hills hotel, los angeles'
    }
];

function handleSelect(key) {
    message.info(String(key));
};

function handleClick() {
    showDropdown.value = !showDropdown.value;
};


const optValue = ref('654321'.split(''));
const onFocus = () => message.info('focus');
const onBlur = () => message.info('blur');
const onFinish = () => message.info('finish');
const onUpdateValue = value => message.info(JSON.stringify(value));
</script>