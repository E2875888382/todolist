<template>
    <div 
        @click="getList"
        @touchstart="handleTouchStart"
        @touchmove="handleTouchMove"
        @touchend="handleTouchEnd"
    >
        <van-row class="tag" >
            <van-col span="4" class="icon">
                <Icon type="md-bookmark" :color="color"/>
            </van-col>
            <van-col span="20" class="text">
                <span>{{name}}</span>
                <span class="num">{{num}}</span>
            </van-col>
        </van-row>
    </div>
</template>

<script>
import {mapActions, mapMutations} from 'vuex';
export default {
    props: {
        color: String,
        name: String,
        num: Number,
        id: Number
    },
    data() {
        return {
            source: {
                client: {}
            },
            timeOut: 0
        };
    },
    methods: {
        ...mapActions({
            delTag: 'delTag'
        }),
        ...mapMutations({
            sbt: 'sbt'
        }),
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
            if (this.name !== '未标签') {
                this.timeOut = setTimeout(()=> {
                    this.$dialog.confirm({
                        title: '删除标签'
                    }).then(()=> {
                        this.delTag(this.id);
                    }).catch(()=> Promise.reject());
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
        },
        handleTouchEnd() {
            this.resetTimer();
        },
        getList() {
            this.sbt(this.name);
            this.$emit('close');
        }
    }
};
</script>

<style lang="less" scoped>
@theme_font: var(--theme-font-color);
@theme_bg: var(--theme-header-bg);
@theme_popup: var(--theme-popup-bg);

.tag {
    background-color: @theme_popup;
    .icon {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 60px;
    }
    .text {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 1rem;
        color: @theme_font;
        font-size: 30px;
        line-height: 60px;
        border-bottom: 1px solid @theme_font;
        .num {
            color: @theme_font;
        }
    }
}
.van-icon {
    font-size: 40px;
    color:gray;
}
</style>