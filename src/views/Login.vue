<template>
    <div>
        <div class="mui-content">
            <form id='login-form' class="mui-input-group">
                <div class="mui-input-row">
                    <label>手机</label>
                    <input id='account' v-model="customer_num" type="text" class="mui-input-clear mui-input" placeholder="请输入账号">
                </div>
                <div class="mui-input-row">
                    <label>密码</label>
                    <input id='password' v-model="customer_password" type="password" class="mui-input-clear mui-input" placeholder="请输入密码">
                </div>
            </form>
            <div class="mui-content-padded">
                <button style="background-color: #ffb248;border: 1px solid #ffb248;"  class="mui-btn mui-btn-block mui-btn-danger" @click="login">登录</button>
                <div class="link-area"><a id='reg' href="/register">注册账号</a>
                </div>
            </div>
            <div class="mui-content-padded oauth-area">

            </div>
        </div>

    </div>
</template>

<script>
    import {Toast} from 'mint-ui'
    import { Indicator } from 'mint-ui'
    export default {
        name: "Login",
        data () {
            return {
                customer_num: '13333333331',
                customer_password: '123123'
            }
        },
        created(){
            this.$store.state.index = 0
        },
        methods:{
            login(){
                if(!this.customer_num){
                    let instance = Toast('请输入账号');
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

                Indicator.open({
                    text: '正在登录...',
                    spinnerType: 'fading-circle'
                })

                let user = {
                    mobile:this.customer_num,
                    password:this.customer_password
                }

                let _this = this
                axios.get(this.$store.state.globalhost+'account-service/user/login', {params:user}).then(function (response) {
                    Indicator.close()
                    if(response.data.code == -1){
                        let instance = Toast(response.data.msg);
                        setTimeout(() => {
                            instance.close();
                        }, 1000)
                        return
                    }
                    if(response.data.code == 0){
                        localStorage.setItem('access-user', JSON.stringify(response.data.data));
                        _this.$router.replace({path: '/cart'})
                    }
                })

            }
        }
    }
</script>

<style scoped>
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
