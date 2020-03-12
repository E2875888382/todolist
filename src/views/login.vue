<template>
    <div class="container">
        <Avatar icon="ios-person" class="login-avatar" size="90" :src="avatar"/>
        <Form class="login-form" ref="formInline" :rules="loginRule" :model="ifo">
            <FormItem prop="user">
                <Input 
                    class="login-input"
                    type="text" 
                    prefix="md-contact" 
                    size="large" 
                    v-model="ifo.user"
                />
            </FormItem>
            <FormItem prop="password">
                <Input 
                    class="login-input" 
                    type="password" 
                    prefix="md-lock" 
                    size="large" 
                    v-model.trim="ifo.password"
                />
            </FormItem>
            <FormItem class="login-tips">
                <span>忘记密码</span>
                <router-link to="/register">新用户</router-link>
            </FormItem>
            <FormItem>
                <Button class="login-btn" @click="handleSubmit" shape="circle" size="large">登录</Button>
            </FormItem>
        </Form>
    </div>
</template>

<script>
import loginApi from '@api/login';
export default {
    props: {
        user: String
    },
    mounted() {
        if (this.user) {
            this.ifo.user = this.user;
            this.getAvatar();
        }
    },
    data() {
        const validateUser = (rule, value, callback)=> {
            if (/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value)) {
                if (!this.avatar) {
                    this.getAvatar();
                }
                callback();
            } else {
                callback(new Error('请检查邮箱是否正确'));
            }
        };
        const validatePass = (rule, value, callback)=> {
            if (/(?=.*([a-zA-Z].*))(?=.*[0-9].*)[a-zA-Z0-9-*/+.~!@#$%^&*()]{8,10}$/.test(value)) {
                callback();
            } else {
                callback(new Error('密码8-10位数字、字母、特殊符号至少2种'));
            }
        };

        return {
            avatar: '',
            ifo: {
                user: '',
                password: ''
            },
            loginRule: {
                user: [
                    { 
                        validator: validateUser,
                        trigger: 'blur' 
                    }
                ],
                password: [
                    { 
                        validator: validatePass,
                        trigger: 'blur' 
                    }
                ]
            }
        };
    },
    methods: {
        handleSubmit() {
            this.$refs['formInline'].validate(valid=> {
                if (valid) {
                    this.login();
                }
            });
        },
        async login() {
            const toast = this.$toast.loading({
                duration: 0, // 持续展示 toast
                forbidClick: true,
                onClose: ()=> this.$router.replace({name: 'todo'})
            });
            const loginRes = await loginApi.getLogin(this.ifo);

            await this.$store.dispatch('login', loginRes);
            toast.clear();
        },
        async getAvatar() {
            this.avatar = await loginApi.getAvatar(this.ifo.user);
        }
    }
};
</script>

<style lang="less" scoped>
.container {
    display: flex;
    align-items: center;
    flex-direction: column;
    height: 100%;
    width: 100%;
    background: #fff;
    .login-avatar {
        position: absolute;
        top: 18%;
    }
    .login-form {
        position: absolute;
        top: 36%;
        width: 75%;
        .login-tips /deep/.ivu-form-item-content{
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .login-btn {
            width: 100%;
        }
        .login-input /deep/ .ivu-input{
            border: none;
            border-bottom: 1px solid #dcdee2;
            border-radius: 0;
            background-color: transparent;
            &:focus {
                box-shadow: none;
            }
        }
    }
}
</style>