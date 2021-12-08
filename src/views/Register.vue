<template>
    <div>
        <div class="mui-content">
            <form id='login-form' class="mui-input-group">
                <div class="mui-input-row">
                    <label>手机</label>
                    <input id='phone' v-model="customer_num" type="text" class="mui-input-clear mui-input" placeholder="请输入账号">
                </div>
                <div class="mui-input-row">
                    <label>验证码</label>
                    <input id='code' style="width: 130px;float: left;border: 0px solid red" v-model="customer_code" type="text" class="mui-input-clear mui-input" placeholder="请输入验证码">
                    <div class="link-area"><span style="position: relative;top: -15px" @click="code">发送验证码</span></div>
                </div>
                <div class="mui-input-row">
                    <label>密码</label>
                    <input id='password' v-model="customer_password" type="password" class="mui-input-clear mui-input" placeholder="请输入密码">
                </div>
            </form>
            <div class="mui-content-padded">
                <button style="background-color: #ffb248;border: 1px solid #ffb248;"  class="mui-btn mui-btn-block mui-btn-danger" @click="register">注册</button>
                <div class="link-area"><a id='reg' href="/login">登录</a>
                </div>
            </div>
            <div class="mui-content-padded oauth-area">

            </div>
        </div>

    </div>
</template>

<script>
    import {Indicator, Toast} from 'mint-ui'
    export default {
        name: "Login",
        data () {
            return {
                customer_num: '',
                customer_code: '',
                customer_password: ''
            }
        },
        mounted:function(){

        },
        created(){
            this.$store.state.index = 1
        },
        methods:{
            code(){
                if(!this.customer_num){
                    let instance = Toast('请输入手机号');
                    setTimeout(() => {
                        instance.close();
                    }, 1000)
                    return
                }
                axios.get(this.$store.state.globalhost+'sms-service/sms/send/'+this.customer_num).then(function (resp) {
                    if(resp.data.code == 0){
                        let instance = Toast('短信发送成功');
                        setTimeout(() => {
                            instance.close();
                        }, 1000)
                    }else{
                        let instance = Toast(resp.data.msg);
                        setTimeout(() => {
                            instance.close();
                        }, 1000)
                    }
                })

            },
            register(){
                if(!this.customer_num){
                    let instance = Toast('请输入账号');
                    setTimeout(() => {
                        instance.close();
                    }, 1000)
                    return
                }
                if(!this.customer_code){
                    let instance = Toast('请输入验证码');
                    setTimeout(() => {
                        instance.close();
                    }, 1000)
                    return
                }
                if(!this.customer_password){
                    let instance = Toast('请输入密码');
                    setTimeout(() => {
                        instance.close();
                    }, 1000)
                    return
                }

                var user = {
                    mobile:this.customer_num,
                    code:this.customer_code,
                    password:this.customer_password
                }

                Indicator.open({
                    text: '正在登录...',
                    spinnerType: 'fading-circle'
                })

                let _this = this
                axios.post(this.$store.state.globalhost+'account-service/user/register',user).then(function (response) {
                    Indicator.close()
                    if(response.data.code == 0){
                        let instance = Toast('注册成功');
                        setTimeout(() => {
                            instance.close()
                            _this.$router.push('/login')
                        }, 1000)
                    }else{
                        let instance = Toast('注册失败:'+response.data.msg);
                        setTimeout(() => {
                            instance.close();
                        }, 2000)
                    }
                })

            }
        }
    }
</script>

<style scoped>
    .disable{
        color: #2ac845;
    }

    .area {
        margin: 20px auto 0px auto;
    }

    .mui-input-group {
        margin-top: 10px;
    }

    .mui-input-group:first-child {
        margin-top: 20px;
    }

    .mui-input-group label {
        width: 22%;
    }

    .mui-input-row label~input,
    .mui-input-row label~select,
    .mui-input-row label~textarea {
        width: 78%;
    }

    .mui-checkbox input[type=checkbox],
    .mui-radio input[type=radio] {
        top: 6px;
    }

    .mui-content-padded {
        margin-top: 25px;
    }

    .mui-btn {
        padding: 10px;
    }

    .link-area {
        display: block;
        margin-top: 25px;
        text-align: center;
    }

    .spliter {
        color: #bbb;
        padding: 0px 8px;
    }

    .oauth-area {
        position: absolute;
        bottom: 20px;
        left: 0px;
        text-align: center;
        width: 100%;
        padding: 0px;
        margin: 0px;
    }

    .oauth-area .oauth-btn {
        display: inline-block;
        width: 50px;
        height: 50px;
        background-size: 30px 30px;
        background-position: center center;
        background-repeat: no-repeat;
        margin: 0px 20px;
        /*-webkit-filter: grayscale(100%); */
        border: solid 1px #ddd;
        border-radius: 25px;
    }

    .oauth-area .oauth-btn:active {
        border: solid 1px #aaa;
    }

    .oauth-area .oauth-btn.disabled {
        background-color: #ddd;
    }

    .mui-content{
        background-color: #efeff4;
    }
</style>
