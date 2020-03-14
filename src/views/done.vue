<template>
    <div class="container">
        <transition-group name="list">
            <task
                :todo="true"
                :content="item.title" 
                :time="item.time" 
                :id="item.id" 
                v-for="item in $store.state.doneTask" 
                :key="item.id" 
                @todo="remove"
            />
        </transition-group>
    </div>
</template>

<script>
import {mapActions} from 'vuex';
export default {
    components: {
        task: ()=> import('@components/task/Task')
    },
    methods: {
        ...mapActions({
            remove: 'addTodo'
        })
    }
};
</script>

<style lang="less" scoped>
@theme_bg: var(--theme-header-bg);
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
    width:100%;
    padding-top: 10px;
    background-color: @theme_bg;
    &::after {
        content: '';
        display: block;
        height: 110px;
    }
}
</style>