<template>
  <div class="container">
    <Input
        search
        placeholder="search"
        v-model="search"
        @on-search="searchFor"
    />
    <section class="tasklist">
        <transition-group name="list">
            <task
                :done="true"
                :content="item.title"
                :time="item.time"
                :id="item.id"
                v-for="item in list"
                :key="item.id"
                @done="remove"
            />
        </transition-group>
    </section>
    <Button
        class="btn_add"
        size="large"
        icon="md-add"
        shape="circle"
        @click="show = !show"
    />
    <van-dialog 
        v-model="show" 
        show-cancel-button 
        @cancel="cancel" 
        @confirm="buildtask"
    >
        <new-task ref='newtask'/>
    </van-dialog>
  </div>
</template>

<script>
import {mapActions, mapState, mapMutations} from 'vuex';
export default {
    components: {
        task: ()=> import('@components/task/Task'),
        'new-task': ()=> import('@components/task/TaskNew')
    },
    data() {
        return {
            show: false,
            search: ''
        };
    },
    computed: {
        ...mapState({
            tag: 'searchByTag',
            title: 'searchByTitle',
            task: 'task'
        }),
        list() {
            const tagLength = this.tag.length;
            const titleLength = this.title.length;

            if (tagLength === 0 && titleLength === 0) {
                return this.task;
            } else if (tagLength !== 0 && titleLength === 0) {
                return this.task.filter(item=> item.tag === this.tag);
            } else if (tagLength === 0 && titleLength !== 0) {
                return this.task.filter(item=> item.title.includes(this.title));
            } else {
                return {};
            }
        }
    },
    methods: {
        ...mapActions({
            remove: 'addDone'
        }),
        ...mapMutations({
            searchFor: 'sbtitle'
        }),
        cancel() {
            this.$refs.newtask.cancel();
        },
        buildtask() {
            this.$refs.newtask.build();
        }
    }
};
</script>

<style lang="less" scoped>
@theme_icon: var(--theme-header-icon);
@theme_text: var(--theme-header-text);
@theme_bg: var(--theme-header-bg);
@theme_search_bg: var(--theme-search-content-bg);
@theme_search_icon: var(--theme-search-icon);
@theme_btn_bg: var(--theme-task-bg);
@theme_btn_shadow: var(--theme-btn-shadow);

.ivu-input-wrapper {
    width: 92%;
    margin: 0 auto;
    display: block;
    height: 1rem;
    padding: .18rem 0;
    /deep/ .ivu-input-with-suffix {
        border-radius: .4rem;
    }
}
.list-enter-active,
.list-leave-active {
    transition: all 0.5s;
}
.list-enter,
.list-leave-to {
    opacity: 0;
    transform: translateX(30px);
}
.container {
    width: 100%;
    background-color: @theme_bg;
    &::after {
        content: '';
        display: block;
        height: 60px;
    }
    .tasklist {
        margin-bottom: 80px;
    }
    .btn_add {
        position: fixed;
        bottom: 150px;
        right: 60px;
        padding: 0;
        box-shadow: 1px 2px 1px @theme_btn_shadow;
    }
}
</style>