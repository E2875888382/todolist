<template>
    <div class="container">
        <section class="summary">
            <van-row class="row" @click="all">
                <van-col span="4" class="icon">
                    <Icon type="md-list"/>
                </van-col>
                <van-col span="20" class="text">
                    <span>全部任务</span>
                    <span class="num">{{$store.state.task.length}}</span>
                </van-col>
            </van-row>
            <van-row class="row">
                <van-col span="4" class="icon">
                    <Icon type="md-star"/>
                </van-col>
                <van-col span="20" class="text" style="border:none">
                    <span>我的收藏</span>
                    <span class="num">0</span>
                </van-col>
            </van-row>
        </section>

        <section class="tags">
            <van-row class="row">
                <van-col span="18" class="subhead">
                    <span>标签</span>
                </van-col>
            </van-row>
            <tagitem
                v-for="item in tags"
                :key="item.name"
                :color="item.color"
                :num="item.num"
                :name="item.name"
                :id="item.id"
                @close="$emit('close')"
            />
            <van-row class="row">
                <van-col span="24" class="text" style="border:none;padding:0">
                    <Button icon="md-add" long @click="show = !show" class="btn"/>
                </van-col>
            </van-row>
        </section>

        <section class="set">
            <van-row class="row">
                <van-col span="18" class="subhead">
                    <span>主题</span>
                </van-col>
            </van-row>
            <van-row class="row" v-for="(item, index) in themes" :key="item.title" @click="change(item)">
                <van-col span="4" class="icon">
                    <Icon type="ios-color-palette" :color="item.iconColor"/>
                </van-col>
                <van-col span="20" :class="{'text': true,'no-border': index === themes.length-1}">
                    <span>{{item.title}}</span>
                </van-col>
            </van-row>
        </section>

        <van-dialog v-model="show" show-cancel-button get-container="body" @confirm="getnewtag">
            <newtag ref="tag"/>
        </van-dialog>
    </div>
</template>

<script>
import {mapGetters, mapMutations, mapActions} from 'vuex';
import themes from '@json/themes';
export default {
    components: {
        newtag: ()=> import('@components/tag/TagNew'),
        tagitem: ()=> import('@components/tag/Tag')
    },
    data() {
        return {
            show: false,
            themes: themes
        };
    },
    computed: {
        ...mapGetters({
            tags: 'getTags'
        })
    },
    methods: {
        ...mapMutations({
            showAll: 'showAll'
        }),
        ...mapActions({
            saveTheme: 'saveTheme'
        }),
        getnewtag() {
            this.$refs.tag.build();
        },
        all() {
            this.showAll();
            this.$emit('close');
        },
        change({theme}) {
            this.saveTheme(theme);
            this.$emit('close');
        }
    }
};
</script>

<style lang="less" scoped>
@theme_font: var(--theme-font-color);
@theme_bg: var(--theme-header-bg);
@theme_popup: var(--theme-popup-bg);

.container {
    background-color: @theme_bg;
    box-sizing: border-box;
    .summary,
    .tags {
        margin-bottom: 8px;
    }
    .icon {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 60px;
    }
    .row {
        background-color: @theme_popup;
        line-height: 60px;
    }
    .van-icon {
        font-size: 40px;
        color:gray;
    }
    .text {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 1rem;
        font-size: 30px;
        color: @theme_font;
        border-bottom: 1px solid @theme_font;
    }
    .set {
        .text {
            line-height: 60px;
        }
        height: 100%;
    }
    .subhead {
        font-size: 30px;
        text-indent: 30px;
        color: #999;
    }
    .btn {
        background-color: transparent;
        border-radius: 0;
        border: none;
    }
    .num {
        color: @theme_font;
    }
    .no-border {
        border: none;
    }
}
</style>