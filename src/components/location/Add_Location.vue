<template>
<div>
    <mt-field label="姓名" placeholder="请输入姓名" v-model="name"></mt-field>
    <mt-field label="联系方式" placeholder="请输入手机号" type="tel" v-model="phone"></mt-field>
    <mt-field label="收货地址" placeholder="收货地址" type="textarea" rows="4" v-model="address"></mt-field>
    <div class="mint-cell-wrapper">
        <div class="mint-cell-title">
            <span class="mint-cell-text">默认收货地址</span> 
        </div> 

        <mt-switch v-model="selected"></mt-switch>
    </div>
    

    <div class="mui-button-row">
		<button type="button" class="mui-btn mui-btn-primary" @click="addLocation()">确认</button>&nbsp;&nbsp;
		<button type="button" class="mui-btn mui-btn-danger" onclick="return false;">取消</button>
	</div>

</div>
</template>

<script>
// 引入组件
import { Toast } from 'mint-ui';

export default {
    data() {
        return{
            name: "",// 收货人姓名
            phone: "",// 收货人电话
            address: "",// 收货地址
            selected: false,// 初始化switch组件值
            userId: this.$store.state.shopUser.userId, // 用户id信息，后期放在 vuex 中

        }
    },
    methods:{
        addLocation(){// 添加新的收货人地址
            // 收货地址对象
            var demo = {"userId":this.userId,"name":this.name, "phone":this.phone, "address":this.address, "selected":this.selected}
            //  发送数据
            this.$http
                .post("location/add",demo)
                .then(result => {
                    if(result.body.code === 0){
                        Toast({
                            message: '成功！！！',
                            duration: 2000
                        });
                        // 切换到UserContainer组件
                        this.$router.push( {path:"/user"} )
                    } else {
                        Toast({
                            message: '失败！！！',
                            duration: 2000
                        });
                    }
                })

        }
    }
}
</script>

<style lang="scss">
input[type=tel], 
input[type=text], 
select, textarea {
    margin-bottom: 0px;
}
</style>
