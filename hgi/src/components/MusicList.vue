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
import { ref, defineProps, defineEmits, watch } from "vue";
import { useBroadcastChannel } from "@/stores/broadcastChannel";
import { groupByFirstLetter } from "@/utils/musicList";
const props = defineProps(['musicListData']);
const emit = defineEmits(['onItemClick']);
const isSelectKey = ref(true);
const selectKeyData = ref([]);
const data = ref([]);

listLableInit();
watch(() => useBroadcastChannel().flag, () => {
    if (useBroadcastChannel().msg == 'musicJsonLoaded') {
        data.value = groupByFirstLetter(props.musicListData);
    }
});

function keySelectClickEvent() {
    isSelectKey.value = !isSelectKey.value;
};

function scrollToAnchor(selector) {
    setTimeout(() => {
        const element = document.getElementById(selector);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
        console.log(element);
    }, 470);
};

function listItemClickEvent(musicItem) {
    emit("onItemClick", musicItem)
};

function listLableInit() {
    for (let i = 65; i <= 90; i++) {
        selectKeyData.value.push(String.fromCharCode(i));
    };
    for (let i = 65; i <= 90; i++) {
        selectKeyData.value.push("拼英" + String.fromCharCode(i));
    };
    selectKeyData.value.push("#");
};
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