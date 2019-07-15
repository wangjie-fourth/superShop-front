<template>
<div>
    <mt-field label="姓名" placeholder="请输入姓名" v-model="locationInfo.name"></mt-field>
    <mt-field label="联系方式" placeholder="请输入手机号" type="tel" v-model="locationInfo.phone"></mt-field>
    <mt-field label="收货地址" placeholder="收货地址" type="textarea" rows="4" v-model="locationInfo.address"></mt-field>
    <div class="mint-cell-wrapper">
        <div class="mint-cell-title">
            <span class="mint-cell-text">默认收货地址</span> 
        </div> 

        <mt-switch v-model="locationInfo.selected"></mt-switch>
    </div>
    

    <div class="mui-button-row">
		<button type="button" class="mui-btn mui-btn-primary" @click="updateLocation()">确认</button>&nbsp;&nbsp;
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
            userId:this.$store.state.shopUser.userId, //用户id，之后存在 vuex 中 
            locationId: this.$route.params.locationId,//收货地址的id
            locationInfo: {},//收货地址信息
        }
    },
    created(){
        this.getLocationByLocationId();
    },
    methods:{
        getLocationByLocationId(){// 根据 locationId 获取该收货地址信息
            this.$http
                .get('location/getLocationByLocationId?locationId='+this.locationId)
                .then(result => {
                    if(result.body.code === 0){
                        this.locationInfo = result.body.data;
                    }
                })
        },
        updateLocation(){// 更新Location对象
            //拼接一个对象
            var demo = {
                    "id":this.locationInfo.id,"name":this.locationInfo.name, 
                    "phone":this.locationInfo.phone, "address":this.locationInfo.address, 
                    "selected":this.locationInfo.selected, "userId":this.userId }
            this.$http
                .post('location/update',demo)
                .then(result => {
                    if(result.body.code === 0){
                        Toast({
                            message: '成功！！！',
                            duration: 2000
                        });
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
