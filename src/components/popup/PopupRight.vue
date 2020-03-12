<template>
    <div>
        <List border>
            <ListItem v-for="item in libList" :key="item.id">
                <span class="title">{{item.title}}</span>
                <section slot="action">
                    <ButtonGroup>
                        <Button type="primary" icon="md-cloud-download" />
                        <Button type="primary" icon="md-cloud-upload" />
                    </ButtonGroup>
                </section>
            </ListItem>
        </List>
        <Button icon="md-add" long class="btn"/>
        <Button icon="ios-log-out" long class="btn bottom" @click="logout"/>
    </div>
</template>

<script>
export default {
    data() {
        return {
            lib: '1',
            libList: [
                {
                    title: '工作笔记',
                    id: 1,
                    content: {}
                },
                {
                    title: '读后感',
                    id: 2,
                    content: {}
                },
                {
                    title: '我的散文集',
                    id: 3,
                    content: {}
                }
            ]
        };
    },
    methods: {
        logout() {
            this.$store.dispatch('logout');
            this.$emit('close');
        }
    }
};
</script>

<style lang="less">
@theme_font: var(--theme-font-color);
@theme_bg: var(--theme-header-bg);
@theme_popup: var(--theme-popup-bg);
.btn {
    background-color: @theme_bg;
    color: @theme_font;
    border-radius: 0;
    border: none;
    height: 80px;
    font-size: 50px;
    line-height: 80px;
}
.bottom {
    position: absolute;
    bottom: 0;
}
.ivu-btn-primary {
    background-color: @theme_font;
    border-color: @theme_font;
    color: @theme_bg;
}
.ivu-btn-group:not(.ivu-btn-group-vertical) 
.ivu-btn-primary+.ivu-btn,
.ivu-btn-group:not(.ivu-btn-group-vertical) .ivu-btn-primary:last-child:not(:first-child) {
    border-left-color: @theme_bg;
}
.title {
    color: @theme_font;
    max-width: 7em;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.ivu-list-bordered {
    border: none;
    border-radius: 0;
    border-bottom: 1px solid @theme_font;
    border-top: 1px solid @theme_font;
    .ivu-list-item {
        border-bottom: 1px solid @theme_font;
    }
}
.ivu-list-item {
    justify-content: space-between;
}
.ivu-list-item-action {
    order: 3;
}
</style>