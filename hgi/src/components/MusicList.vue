<template>
    <n-card class="listCard">
        <n-scrollbar style="max-height: 55vh;position: relative;">
            <transition name="scale">
                <div v-if="!isSelectKey" class="keySelect">
                    <div @click="keySelectClickEvent" class="keySelectItem" v-for="keyItem in selectKeyData">
                        <n-button size="small" @click="scrollToAnchor(keyItem)"> {{ keyItem }}</n-button>
                    </div>
                </div>
            </transition>
            <transition name="scale">
                <div v-if="isSelectKey">
                    <div v-for="item in data">
                        <div class="keyMain" @click="keySelectClickEvent">
                            <span :id="item.key">{{ item.key }}</span>
                        </div>
                        <div v-for="musicItem in item.data" class="listItem">
                            <n-button size="small" style="width: 100%;" @click="listItemClickEvent(musicItem)">
                                <div style="width: 100%;display: flex;">
                                    <n-scrollbar x-scrollable style="margin-right: 5px;">
                                        <p style="width: 45%;"> {{ musicItem.name }}</p>
                                    </n-scrollbar>
                                    <n-scrollbar class="listMusicAuthor" x-scrollable style="margin-right: 5px;">
                                        <p> {{ musicItem.zz }} </p>
                                    </n-scrollbar>
                                </div>
                            </n-button>
                        </div>
                    </div>
                </div>
            </transition>
        </n-scrollbar>
    </n-card>
</template>

<script setup>
import { ref, defineProps, defineEmits } from "vue";
import pinyin from 'pinyin';
const props = defineProps(['musicData'])
const emit = defineEmits(['onItemClick'])
const isSelectKey = ref(true);
const selectKeyData = ref([]);
for (let i = 65; i <= 90; i++) {
    selectKeyData.value.push(String.fromCharCode(i))
}
for (let i = 65; i <= 90; i++) {
    selectKeyData.value.push("拼英" + String.fromCharCode(i))
}
selectKeyData.value.push("#");

const data = ref([]);

const getGroupKey = (str) => {
    if (!str) return '#';
    const firstChar = str.charAt(0);
    const isChinese = /[\u4e00-\u9fa5]/.test(firstChar);
    if (isChinese) {
        const py = pinyin(firstChar, {
            style: pinyin.STYLE_FIRST_LETTER,
        });
        return `拼英${py[0][0].toUpperCase()}`;
    } else {
        const firstLetter = firstChar.toUpperCase();
        return /[A-Z]/.test(firstLetter) ? firstLetter : '#';
    }
};
const groupByFirstLetter = (data) => {
    const groups = {};
    data.forEach(item => {
        const groupKey = getGroupKey(item.name);
        if (!groups[groupKey]) {
            groups[groupKey] = [];
        }
        groups[groupKey].push(item);
    });
    const result = Object.keys(groups).map(key => ({
        key,
        data: groups[key]
    }));
    return result.sort((a, b) => {
        if (a.key === '#') return 1;
        if (b.key === '#') return -1;
        const aIsPinyin = a.key.startsWith('拼英');
        const bIsPinyin = b.key.startsWith('拼英');
        if (!aIsPinyin && !bIsPinyin) {
            return a.key.localeCompare(b.key);
        } else if (aIsPinyin && !bIsPinyin) {
            return 1;
        } else if (!aIsPinyin && bIsPinyin) {
            return -1;
        } else {
            return a.key.localeCompare(b.key);
        }
    });
};
data.value = groupByFirstLetter(props.musicData)
console.log(data.value);

function keySelectClickEvent() {
    isSelectKey.value = !isSelectKey.value;
}
function scrollToAnchor(selector) {
    setTimeout(() => {
        const element = document.getElementById(selector);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
        console.log(element);
    }, 470);

}
function listItemClickEvent(musicItem) {
    emit("onItemClick", musicItem)
}

</script>

<style scoped>
.listItem {
    display: flex;
    justify-content: space-between;
    margin: 10px auto;
    margin-right: 15px;
    padding: 3px 10px;
    border-radius: 5px;

}

.keySelect {
    display: flex;
    flex-wrap: wrap;
    margin-right: 15px;
    gap: 10px;
}

.keySelectItem {
    display: inline;
}

.keyMain:hover {
    color: var(--n-tab-text-color-active) !important;
}
</style>

<style>
@media (max-width: 650px) {
    .listMusicAuthor {
        display: none;
    }
}

.scale-enter-active,
.scale-leave-active {
    transition: all 0.3s ease;
    transform-origin: center;

}

.scale-enter-from,
.scale-leave-to {
    transform: scale(0);
    opacity: 0;
    position: absolute;
}

.scale-enter-to,
.scale-leave-from {
    transform: scale(1);
    opacity: 1;
}

.listItem .n-button__content {
    text-align: justify;
    display: flex;
    width: 100%;
}

.listCard .n-card__content {
    padding-right: 0px;
}
</style>