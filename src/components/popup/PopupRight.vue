<template>
    <div>
        <List border>
            <ListItem v-for="item in libList" :key="item.library">
                <span class="title">{{item.name}}</span>
                <section slot="action">
                    <ButtonGroup>
                        <Button type="primary" icon="md-cloud-download" @click="pull(item.library)"/>
                        <Button type="primary" icon="md-cloud-upload" @click="push(item.library)"/>
                        <Button type="primary" icon="md-trash" @click="del(item.library)"/>
                    </ButtonGroup>
                </section>
            </ListItem>
        </List>
        <Button icon="md-add" long class="btn" @click="add"/>
        <Button icon="ios-log-out" long class="btn bottom" @click="logout"/>
    </div>
</template>

<script>
import {mapState} from 'vuex';
import syncApi from '@api/sync';
export default {
    data() {
        return {
            lib: '1'
        };
    },
    computed: {
        ...mapState({
            libList: 'library',
            tags: 'tags',
            theme: 'theme',
            tasks: 'task',
            doneTasks: 'doneTask'
        })
    },
    methods: {
        logout() {
            this.$store.dispatch('logout');
            this.$emit('close');
        },
        async pull(library) {
            const res = await syncApi.pullLibrary({library});

            console.log(res);
        },
        async push(library) {
            const lib = {
                library: library,
                tags: this.tags,
                tasks: this.tasks,
                doneTasks: this.doneTasks,
                theme: this.theme
            };
            const res = await syncApi.pushLibrary({lib});

            console.log(res);
        },
        async add() {
            const res = await syncApi.newLibrary({
                update: new Date().toLocaleString(),
                name: 'test'
            });
            const libraryList = await syncApi.pullLibraryList();

            if (libraryList.length !== 0) {
                await this.$store.dispatch('saveLibraryList', libraryList);
            }
            console.log(res);
        },
        async del(library) {
            const res = await syncApi.deleteLibrary({library});

            await this.$store.dispatch('deleteLibrary');
            const libraryList = await syncApi.pullLibraryList();

            if (libraryList.length !== 0) {
                await this.$store.dispatch('saveLibraryList', libraryList);
            }
            console.log(res);
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