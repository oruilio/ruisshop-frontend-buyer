<template>
    <div class="mui-content">
        <form class="mui-input-group">
            <div class="mui-input-row">
                <label>姓名</label>
                <input v-model="name" type="text" class="mui-input-clear mui-input" placeholder="请输入收件人姓名">
            </div>
            <div class="mui-input-row">
                <label>电话</label>
                <input v-model="phone" type="text" class="mui-input-clear mui-input" placeholder="请输入联系电话">
            </div>
            <div class="mui-input-row">
                <label>地址</label>
                <input v-model="address" type="text" class="mui-input-clear mui-input" placeholder="请输入送货地址">
            </div>
        </form>
        <div class="mui-content-padded">
            <button type="button" class="mui-btn mui-btn-block mui-btn-success" @click="submit()">确认订单</button>
        </div>
    </div>
</template>

<script>
    import { Indicator } from 'mint-ui';
    import { Toast } from 'mint-ui';
    export default {
        data(){
            return {
                name: '',
                phone: '',
                address: ''
            }
        },
        methods:{
            submit(){
                if(!this.name) {
                    let instance = Toast('请输入姓名');
                    setTimeout(() => {
                        instance.close();
                    }, 1000)
                    return
                }
                if(!this.phone) {
                    let instance = Toast('请输入电话');
                    setTimeout(() => {
                        instance.close();
                    }, 1000)
                    return
                }
                if(!this.address) {
                    let instance = Toast('请输入地址');
                    setTimeout(() => {
                        instance.close();
                    }, 1000)
                    return
                }
                const _this = this
                var orderForm ={
                    name: this.name,
                    phone: this.phone,
                    address: this.address,
                    id: JSON.parse(window.localStorage.getItem('access-user')).userId,
                    items: this.$store.state.selectedArray
                }
                Indicator.open('Loading...')
                axios.post(this.$store.state.globalhost+'order-service/buyer/order/create',orderForm).then(function(resp){
                    if(resp.data.code==0){
                        Indicator.close()
                        _this.$router.push('/orderDetail?orderId='+resp.data.data.orderId)
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>