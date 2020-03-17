<template>
    <div>
        <List border>
            <ListItem v-for="item in libList" :key="item.library">
                <span class="title">{{item.name}}</span>
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
import {mapState} from 'vuex';
export default {
    data() {
        return {
            lib: '1'
        };
    },
    computed: {
        ...mapState({
            libList: 'library'
        })
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