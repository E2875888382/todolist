<template>
    <div>
        <van-tabbar v-model="active" route>
            <van-tabbar-item icon="todo-list-o" replace to="/todo">未完成</van-tabbar-item>
            <van-tabbar-item icon="passed" replace to="/done">已完成</van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
export default {
    data() {
        return {
            active: 0
        };
    }
};
</script>

<style lang="less" scoped>
@theme_bg: var(--theme-header-bg);
.van-tabbar {
    background-color: @theme_bg;
}
</style>