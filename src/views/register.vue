 <template>
    <div class="container">
        <Form class="register-form" ref="formInline" :rules="RegisterRule" :model="ifo">
            <FormItem prop="user">
                <Input 
                    class="register-input" 
                    placeholder="QQ | 163 | foxmail 邮箱"
                    type="text" 
                    prefix="md-contact" 
                    size="large" 
                    v-model="ifo.user"
                />
            </FormItem>
            <FormItem prop="password">
                <Input 
                    class="register-input" 
                    type="password" 
                    placeholder="8-10位数字|字母|特殊符号至少2种"
                    prefix="md-lock" 
                    size="large" 
                    v-model.trim="ifo.password"
                />
            </FormItem>
            <FormItem prop="passwordCheck">
                <Input 
                    class="register-input" 
                    type="password" 
                    placeholder="再次输入密码"
                    prefix="md-lock" 
                    size="large" 
                    v-model.trim="ifo.passwordCheck"
                />
            </FormItem>
            <FormItem prop="code">
                <i-input type="text" size="large" v-model.trim="ifo.code">
                    <Button slot="prepend" @click="sendCode" disabled v-if="cooling">
                        {{coolingNum}}秒后重新发送
                    </Button>
                    <Button slot="prepend" @click="sendCode" v-else>发送验证码</Button>
                </i-input>
            </FormItem>
            <FormItem>
                <Button class="register-btn" @click="handleSubmit" shape="circle" size="large">
                    注册
                </Button>
            </FormItem>
        </Form>
    </div>
</template>

<script>
import loginApi from '@api/login';
export default {
    data() {
        const validateUser = (rule, value, callback)=> {
            const reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;

            if (reg.test(value)) {
                callback();
            } else {
                callback(new Error('请检查邮箱是否正确'));
            }
        };
        const validatePass = (rule, value, callback)=> {
            const reg = /(?=.*([a-zA-Z].*))(?=.*[0-9].*)[a-zA-Z0-9-*/+.~!@#$%^&*()]{8,10}$/;

            if (reg.test(value)) {
                callback();
            } else {
                callback(new Error('请检查密码格式是否正确'));
            }
        };
        const validatePassCheck = (rule, value, callback)=> {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.ifo.password) {
                callback(new Error('两次密码不相同'));
            } else {
                callback();
            }
        };
        const validateCode = (rule, value, callback)=> {
            if (value === '') {
                callback(new Error('请输入验证码'));
            } else if (value !== this.resCode) {
                callback(new Error('验证码不正确'));
            } else {
                callback();
            }
        };

        return {
            coolingNum: 120,
            cooling: false,
            resCode: '',
            ifo: {
                user: '',
                password: '',
                passwordCheck: '',
                code: ''
            },
            RegisterRule: {
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
                ],
                passwordCheck: [
                    { 
                        validator: validatePassCheck,
                        trigger: 'blur' 
                    }
                ],
                code: [
                    {
                        validator: validateCode,
                        trigger: 'blur'
                    }
                ]
            }
        };
    },
    methods: {
        async sendCode() {
            const reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;

            if (reg.test(this.ifo.user)) {
                this.resCode = await loginApi.sendCode();
                this.cooling = true;
                for (let i = 0; i < 120; i++) {
                    setTimeout(()=> this.coolingNum--, i * 1000);
                };
                setTimeout(()=> {
                    this.cooling = false;
                    this.coolingNum = 120;
                }, 120000);
            } else {
                this.$toast('请先填写正确的账号');
            }
        },
        handleSubmit() {
            this.$refs['formInline'].validate(valid=> {
                if (valid) {
                    this.register();
                }
            });
        },
        async register() {
            const toast = this.$toast.loading({
                duration: 0,
                forbidClick: true
            });
            const registerRes = await loginApi.register(this.ifo);

            if (registerRes.code === 200) {
                toast.clear();
                this.$router.replace({
                    name: 'login',
                    params: {user: this.ifo.user}
                });
            } else {
                toast.clear();
                this.$toast.fail('注册失败');
            }
        }
    }
};
</script>

<style lang="less" scoped>
.container {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    width: 100%;
    background: #fff;
    background: url('~@imgs/bg.png') no-repeat;
    background-size: cover;
    .register-form {
        width: 75%;
        .register-btn {
            width: 100%;
        }
        .register-input /deep/ .ivu-input{
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