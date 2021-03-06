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
        <Button icon="md-add" long class="btn" @click="showAdd = !showAdd"/>
        <Button icon="ios-log-out" long class="btn bottom" @click="logout"/>
        <van-dialog v-model="showAdd" show-cancel-button @confirm="add">
            <van-field v-model="title" label="标题" left-icon="new"/>
        </van-dialog>
    </div>
</template>

<script>
import {mapState, mapActions} from 'vuex';
import syncApi from '@api/sync';
export default {
    data() {
        return {
            lib: '1',
            showAdd: false,
            title: ''
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
        ...mapActions({
            saveTasks: 'saveTasks',
            saveDoneTasks: 'saveDoneTasks',
            saveTags: 'saveTags'
        }),
        logout() {
            this.$store.dispatch('logout');
            this.$emit('close');
            localStorage.clear();
        },
        async pull(library) {
            const res = await syncApi.pullLibrary({library});

            if (res) {
                this.$toast.success('拉取成功');
            }
            const {tasks, tags} = res;

            if (tasks.length !== 0) {
                const todo = tasks.filter(item=> item.done === 0);
                const done = tasks.filter(item=> item.done === 1);

                todo.forEach(item=> item.id = Number(item.id));
                done.forEach(item=> item.id = Number(item.id));
                this.saveTasks(todo);
                this.saveDoneTasks(done);
            } else {
                this.saveTasks([]);
                this.saveDoneTasks([]);
            }
            tags.forEach(item=> item.id = Number(item.id));
            this.saveTags(tags);
            this.$emit('close');
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

            if (res) {
                this.$toast.success('提交成功');
            }
        },
        async add() {
            await syncApi.newLibrary({
                update: new Date().toLocaleString(),
                name: this.title || 'new library'
            });
            const libraryList = await syncApi.pullLibraryList();

            if (libraryList.length !== 0) {
                await this.$store.dispatch('saveLibraryList', libraryList);
            }
        },
        async del(library) {
            await syncApi.deleteLibrary({library});
            await this.$store.dispatch('deleteLibrary');
            const libraryList = await syncApi.pullLibraryList();

            if (libraryList.length !== 0) {
                await this.$store.dispatch('saveLibraryList', libraryList);
            }
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
    right: 0;
}
.ivu-btn-primary {
    background-color: @theme_font;
    border-color: @theme_font;
    color: @theme_bg;
}
.ivu-btn-group:not(.ivu-btn-group-vertical) .ivu-btn-primary:not(:first-child):not(:last-child) {
    border-left-color: @theme_bg;
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