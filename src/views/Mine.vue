<template>
    <div class="mui-page-content">
        <div>
            <ul class="mui-table-view" >
                <li class="mui-table-view-cell">
                    <span class="mui-icon mui-icon-contact"></span><p class='mui-ellipsis'>{{user.mobile}}</p>
                </li>
            </ul>
            <br/>

            <ul class="mui-table-view" >
                <li class="mui-table-view-cell">
                    <router-link to="order" class="mui-navigate-right" >我的订单</router-link>
                </li>
                <li class="mui-table-view-cell">
                    <router-link to="about" class="mui-navigate-right" >关于点餐平台</router-link>
                </li>
            </ul>
            <br/><br/><br/>
            <button style="background-color: #ffb248;border: 1px solid #ffb248;" class="mui-btn mui-btn-danger mui-btn-block quit" @click="logout">退出登录</button>
        </div>
    </div>

</template>

<script>
    import { MessageBox } from 'mint-ui';
    export default {
        name: "Mine",
        data(){
            return {
                user:''
            }
        },
        methods:{
            logout(){
                MessageBox.confirm('确定退出吗?').then(action => {
                    localStorage.removeItem('access-user')
                    this.$router.replace({path: '/'})
                })
            }
        },
        created() {
            this.$store.state.index = 3
            this.user = JSON.parse(window.localStorage.getItem('access-user'))
        }
    }
</script>

<style scoped>
    .mui-page-content{
        background-color: #efeff4;
    }
    .quit{
        margin: 0 auto;
        width: 95%;

    }

    a:after,a:link,a:active,a:visited{
        text-decoration:none;
    }
</style>
