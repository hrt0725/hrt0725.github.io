<template>
    <main class="TabItemMain">
        <n-anchor>
            <n-anchor-link title="信息">
                <n-anchor-link :title="'版本号: V' + InfoPane.info.version" />
                <n-anchor-link :title="'上次更新时间: ' + InfoPane.info.lastUpDate" />
                <n-anchor-link title="仓库地址">
                    <n-anchor-link title="GitHub" href="https://hrt0725.github.io" />
                </n-anchor-link>
            </n-anchor-link>
            <n-anchor-link title="外部依赖">
                <n-anchor-link v-for="item in InfoPane.externalDependency" :title="item.title" :href="item.href" />
            </n-anchor-link>
            <n-anchor-link title="时间线">
                <n-collapse>
                    <n-collapse-item title="TimeLine">
                        <n-timeline>
                            <n-timeline-item v-for="item in InfoPane.timeLine" :type="item.type" :title="item.title"
                                :content="item.content" :time="item.time" />
                        </n-timeline>
                    </n-collapse-item>
                </n-collapse>
            </n-anchor-link>
        </n-anchor>
    </main>
</template>


<script setup>
import { InfoPane } from "@/data/info";
</script>