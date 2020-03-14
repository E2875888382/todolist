<template>
    <div>
        <div
            @touchstart="handleTouchStart"
            @touchmove="handleTouchMove"
            @touchend="handleTouchEnd"
            @click="showEditDialog"
        >
            <van-row type="flex" justify="center">
                <van-col span="22" class="task-wrapper">
                    <span class="task-wrapper__title">{{content}}</span>
                    <span class="task-wrapper__time">{{time}}</span>
                </van-col>
            </van-row>
        </div>
        <van-dialog v-model="showEdit" show-cancel-button @confirm="edit">
            <edit :id="id" ref="edit"/>
        </van-dialog>
    </div>
</template>

<script>
export default {
    components: {
        edit: ()=> import('@components/task/TaskEdit')
    },
    props: {
        content: String,
        id: Number,
        time: String,
        done: {
            type: Boolean,
            default: false
        },
        todo: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            source: {
                client: {}
            },
            timeOut: 0,
            showEdit: false
        };
    },
    methods: {
        resetTimer() {
            clearTimeout(this.timeOut);
            this.timeOut = 0;
        },
        handleTouchStart(e) {
            const element = e.targetTouches[0];

            this.source.client = {
                x: element.clientX,
                y: element.clientY
            };
            this.resetTimer();
            if (this.todo) {
                this.timeOut = setTimeout(()=> {
                    this.$dialog.confirm({
                        title: '彻底删除'
                    }).then(()=> {
                        this.$store.dispatch('delTask', this.id);
                    }).catch(()=> {});
                }, 500);
            }
        },
        handleTouchMove(e) {
            const element = e.targetTouches[0];
            const x = element.clientX - this.source.client.x;
            const y = element.clientY - this.source.client.y;

            if (x === 0 && y === 0) {
                this.resetTimer();
            }
            element.target.parentNode.style.cssText = 'transition: all 1s;';
            element.target.parentNode.style.cssText = `transform:translate(${x}px,${y}px)`;
        },
        handleTouchEnd(e) {
            const element = e.changedTouches[0];
            const x = element.clientX - this.source.client.x;

            if (x > window.innerWidth / 3 && this.done) {
                this.$emit('done', this.id);
            }
            if (-x > window.innerWidth / 3 && this.todo) {
                this.$emit('todo', this.id);
            }
            e.target.parentNode.style.cssText = 'transform: none;';
            this.resetTimer();
        },
        showEditDialog() {
            if (this.done) {
                this.showEdit = !this.showEdit;
            }
        },
        edit() {
            this.$refs.edit.change();
        }
    }
};
</script>

<style lang="less" scoped>
@theme_bg: var(--theme-task-bg);
.task-wrapper {
    display: flex;
    flex-direction: column;
    height: 80px;
    margin: 6px 0;
    padding: 5px;
    border-radius: 5px;
    box-shadow: 1px 2px 2px 1px #ebedf0;
    background-color: @theme_bg;
    .task-wrapper__title {
        margin: 0;
        line-height: 40px;
        font-size: 30px;
        text-indent: 20px;
    }
    .task-wrapper__time {
        margin: 0;
        color: #999;
        font-size: 20px;
        line-height: 30px;
        text-indent: 20px;
    }
}
</style>