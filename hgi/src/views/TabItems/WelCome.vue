<template>
    <main class="TabItemMain">
        <n-card class="welComeMain" style="margin-bottom: 15px;width: max-content;">
            <n-tabs default-value="signin" size="small" animated>
                <n-tab-pane name="signin" tab="登录">
                    <n-form size="small">
                        <n-form-item-row label="用户名">
                            <n-input size="tiny" />
                        </n-form-item-row>
                        <n-form-item-row label="密码">
                            <n-input type="password" size="tiny" />
                        </n-form-item-row>
                    </n-form>
                    <n-button type="primary" size="tiny" block secondary strong>登录</n-button>
                </n-tab-pane>
                <n-tab-pane name="signup" tab="注册">
                    <n-form size="small">
                        <n-form-item-row label="用户名">
                            <n-input size="tiny" />
                        </n-form-item-row>
                        <n-form-item-row label="密码">
                            <n-input type="password" size="tiny" />
                        </n-form-item-row>
                        <n-form-item-row label="重复密码">
                            <n-input type="password" size="tiny" />
                        </n-form-item-row>
                    </n-form>
                    <n-button type="primary" block secondary strong size="tiny">注册</n-button>
                </n-tab-pane>
            </n-tabs>
        </n-card>
    </main>
</template>

<style scoped>
@media (max-width: 650px) {
    .welComeMain {
        margin: auto;
    }
}
</style>