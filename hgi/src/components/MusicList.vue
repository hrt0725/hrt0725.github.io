<template>
    <n-card>
        <n-scrollbar style="max-height: 55vh;">
            <transition name="scale">
                <div v-if="!isSelectKey" class="keySelect">
                    <div @click="keySelectClickEvent" class="keySelectItem" v-for="keyItem in selectKeyData">{{ keyItem
                    }}
                    </div>
                </div>
            </transition>
            <transition name="scale">
                <div>
                    <div v-for="item in data" v-if="isSelectKey">
                        <div @click="keySelectClickEvent">
                            {{ item.key }}
                        </div>
                        <div v-for="musicItem in item.data" class="listItem">
                            <span>{{ musicItem.name }}</span>
                            <span>{{ musicItem.zz }}</span>
                            <span>{{ musicItem.zj }}</span>
                            <span>{{ musicItem.lp }}</span>
                            <span>{{ musicItem.sj }}</span>
                        </div>
                    </div>
                </div>
            </transition>

        </n-scrollbar>
    </n-card>
</template>

<script setup>
import { ref } from "vue";
import pinyin from 'pinyin';
const isSelectKey = ref(false);
const selectKeyData = ref([]);
for (let i = 65; i <= 90; i++) {
    selectKeyData.value.push(String.fromCharCode(i))
}
for (let i = 65; i <= 90; i++) {
    selectKeyData.value.push("拼英" + String.fromCharCode(i))
}
const musicListData = ref([
    {
        name: "A Moment Apart",
        zz: "Odesza",
        zj: "A Moment Apart..",
        lp: "Blues",
        sj: "03:54",
    },
    {
        name: "aAA批发建材",
        zz: "Odesza",
        zj: "A Moment Apart..",
        lp: "Blues",
        sj: "03:54",
    },
    {
        name: "wwd fasgawg",
        zz: "wdzfawgawg",
        zj: "uuuuuuu",
        lp: "Blues",
        sj: "03:54",
    },
    {
        name: "稻香",
        zz: "周杰伦",
        zj: "未知",
        lp: "未知",
        sj: "03:54",
    }
]);
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
data.value = groupByFirstLetter(musicListData.value)
console.log(data.value);

function keySelectClickEvent() {
    setTimeout(() => {
        isSelectKey.value = !isSelectKey.value;
    }, 300);
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
    background-color: rgb(237, 237, 237);
}

.listItem:hover {
    background-color: rgb(224, 224, 224);
}

.keySelect {
    display: flex;
    flex-wrap: wrap;
    margin-right: 15px;
    gap: 10px;
}

.keySelectItem {
    display: inline;
    background-color: aliceblue;
}
</style>

<style>
.scale-enter-active,
.scale-leave-active {
    transition: all 0.3s ease;
    transform-origin: center;
}

.scale-enter,
.scale-leave-to {
    transform: scale(0);
    opacity: 0;
}

.scale-enter-to,
.scale-leave {
    transform: scale(1);
    opacity: 1;
}
</style>