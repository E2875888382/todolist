<template>
    <div>
        <div class="setting-item" @click="showChangeAvatar = !showChangeAvatar">
            更换头像<Avatar :src="avatar" v-show="avatar"/>
        </div>
        <div class="setting-item" @click="showChangeName = !showChangeName">
            更换昵称<span>{{user}}</span>
        </div>
        <van-dialog v-model="showChangeName" show-cancel-button get-container="body" @confirm="setNewName">
            <van-field  v-model="name"  :placeholder="user" input-align="center">
            </van-field>
        </van-dialog>
        <van-dialog v-model="showChangeAvatar" show-cancel-button get-container="body" @confirm="setNewAvatar">
            <van-uploader
                :after-read="afterRead"
                v-model="fileList"
                :max-count="1"
                :max-size="512000"
                @oversize="handleoversize"
            />
        </van-dialog>
    </div>
</template>

<script>
import {mapState, mapGetters} from 'vuex';
import loginApi from '@api/login';
export default {
    data() {
        return {
            showChangeAvatar: false,
            showChangeName: false,
            name: '',
            fileList: []
        };
    },
    computed: {
        ...mapState({
            userIfo: state=> state.user 
        }),
        ...mapGetters({
            user: 'getUserName',
            avatar: 'getAvatar'
        })
    },
    methods: {
        async setNewName() {
            if (this.name.trim().length !== 0) {
                // 上传昵称
                await loginApi.update({
                    name: this.name,
                    theme: '',
                    avatar: this.avatar
                });

                // 上传好了刷新数据
                await this.$store.dispatch('login', Object.assign(this.userIfo, {
                    name: this.name
                }));
            } else {
                this.$toast.fail('昵称不能为空');
            }
            this.name = '';
        },
        async setNewAvatar() {
            if (this.fileList[0]) {
                // 对接接口，上传头像
                const res = await loginApi.update({
                    name: this.user,
                    theme: '',
                    avatar: 'http://p1.music.126.net/ZHnw_czZAYoOCKfrs0JG8Q==/3408486047337157.jpg?param=130y130'
                });

                console.log(res);
                // 上传好了刷新数据
                await this.$store.dispatch('login', Object.assign(this.userIfo, {
                    avatar: this.fileList[0].content
                }));
            }
        },
        afterRead() {
            console.log(this.fileList);
        },
        handleoversize() {
            this.$toast.fail('图片大小不能超过500KB');
        }
    }
};
</script>

<style lang="less" scoped>
div /deep/ .van-dialog__content {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 20px;
}
.setting-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100px;
    padding: 0 50px;
    line-height: 100px;
}
</style>