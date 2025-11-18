<template>
    <main class="TabItemMain">
        <div class="toolsMain">
            <QR />
            <Md5 />
            <Base64 />
            <JavaScript />
            <TimeCalculate />
        </div>
    </main>
</template>

<script setup>
import QR from "@/views/TabItems/Tools/QR.vue";
import Md5 from "@/views/TabItems/Tools/Md5.vue";
import Base64 from "@/views/TabItems/Tools/Base64.vue";
import JavaScript from "@/views/TabItems/Tools/JavaScript.vue";
import TimeCalculate from "./Tools/TimeCalculate.vue";
</script>

<style scoped>
.TabItemMain {
    display: flex;
}

.toolsMain {
    display: flex;
    flex-direction: column;
    gap: 5px;
    min-width: 250px;
    margin-left: 5px;
}
</style>

<style>
.toolsMain .n-collapse-item__content-inner {
    padding-bottom: 5px;
    border-bottom: 1px solid var(--n-bar-color);
}
</style>