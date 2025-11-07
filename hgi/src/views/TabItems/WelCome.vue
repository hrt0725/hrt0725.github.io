<template>
    <main class="TabItemMain">
        <n-card style="margin-bottom: 15px;width: max-content;">
            <n-tabs default-value="signin" size="small" animated>
                <n-tab-pane name="signin" tab="登录">
                    <n-form>
                        <n-form-item-row label="用户名">
                            <n-input />
                        </n-form-item-row>
                        <n-form-item-row label="密码">
                            <n-input type="password" />
                        </n-form-item-row>
                    </n-form>
                    <n-button type="primary" block secondary strong>登录</n-button>
                </n-tab-pane>
                <n-tab-pane name="signup" tab="注册">
                    <n-form>
                        <n-form-item-row label="用户名">
                            <n-input />
                        </n-form-item-row>
                        <n-form-item-row label="密码">
                            <n-input type="password" />
                        </n-form-item-row>
                        <n-form-item-row label="重复密码">
                            <n-input type="password" />
                        </n-form-item-row>
                    </n-form>
                    <n-button type="primary" block secondary strong>注册</n-button>
                </n-tab-pane>
            </n-tabs>
        </n-card>
        <n-anchor>
            <n-anchor-link title="信息">
                <n-anchor-link title="版本号：V1.0" />
                <n-anchor-link title="上次更新时间：2025.11.7" />
                <n-anchor-link title="仓库地址">
                    <n-anchor-link title="GitHub" href="https://hrt0725.github.io" />
                </n-anchor-link>
            </n-anchor-link>

            <n-anchor-link title="外部依赖">
                <n-anchor-link title="Vue3" href="https://cn.vuejs.org/" />
                <n-anchor-link title="Naive UI" href="https://www.naiveui.com/zh-CN/light" />
                <n-anchor-link title="Ionic" href="https://ionic.io/ionicons" />
            </n-anchor-link>
        </n-anchor>
    </main>

</template>