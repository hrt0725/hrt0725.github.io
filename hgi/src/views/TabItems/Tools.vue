<template>
    <main class="TabItemMain">
        <n-anchor>
            <n-anchor-link title="QR码" />
            <n-anchor-link title="MD5" />
        </n-anchor>
        <div class="toolsMain">
            <QR />
            <Md5 />
        </div>
    </main>
</template>

<script setup>
import QR from "@/views/TabItems/Tools/QR.vue";
import Md5 from "@/views/TabItems/Tools/Md5.vue";
</script>

<style scoped>
.TabItemMain {
    display: flex;
}

.toolsMain {
    display: flex;
    flex-direction: column;
    gap: 5px;
    margin-left: 5px;
}
</style>