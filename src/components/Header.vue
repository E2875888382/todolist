<template>
  <div>
    <Affix>
        <van-nav-bar @click-left="show = true">
            <Icon type="md-menu" slot="left" class="left_icon"/>
            <span slot="title" class="search-title">{{search}}</span>
            <div @click="showDrawer" slot="right">
                <Avatar icon="ios-person" v-show="!avatar"/>
                <Avatar :src="avatar" v-show="avatar"/>
            </div>
        </van-nav-bar>
    </Affix>
    <Drawer :closable="false" v-model="show" width="70" placement="left">
        <h3 class="left-drawer__title" slot="header">任务</h3>
        <popup-left @close="show = false"/>
    </Drawer>
    <Drawer :closable="false" v-model="showRightDrawer" width="70">
        <h3 class="right-drawer__title" slot="header">
            {{user}}
            <Icon type="md-settings"/>
        </h3>
        <popup-right @close="showRightDrawer = false"/>
    </Drawer>
  </div>
</template>

<script>
import {mapGetters, mapState} from 'vuex';
export default {
    components: {
        'popup-left': ()=> import('@components/popup/popupLeft'),
        'popup-right': ()=> import('@components/popup/popupRight')
    },
    data() {
        return {
            show: false,
            showRightDrawer: false
        };
    },
    computed: {
        ...mapGetters({
            user: 'getUserName',
            avatar: 'getAvatar'
        }),
        ...mapState({
            search: state=> state.search
        })
    },
    methods: {
        showDrawer() {
            if (this.user) {
                this.showRightDrawer = true;
            } else {
                this.$router.replace({name: 'login'});
            }
        }
    }
};
</script>

<style lang="less">
@theme_icon: var(--theme-header-icon);
@theme_text: var(--theme-header-text);
@theme_bg: var(--theme-header-bg);
@theme_font: var(--theme-font-color);
.van-nav-bar {
    padding-top: 10px;
    .left_icon {
        color: @theme_icon;
    }
    .search-title {
        color: @theme_text;
    }
}
.left-drawer__title {
    margin: 0;
    color: @theme_font;
    font-size: 40px;
}
.right-drawer__title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: @theme_font;
}
.ivu-drawer-header {
    border: none;
}
.van-nav-bar,.ivu-drawer-content {
    background-color: @theme_bg;
    .van-nav-bar__left {
        font-size:60px;
    }
}
.ivu-drawer-body {
    padding: 0;
}
</style>