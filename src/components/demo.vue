<template>
<div>
    <h1>demo组件{{ openId }}</h1>
</div>
</template>

<script>
// 引入组件
import { Toast } from 'mint-ui';
export default {
    data(){
        return{
            openId: this.$route.params.openId,//要展示的商品分类编号
        }
    },
    created(){
        //
        this.getShopUserByOpenId();
        // 进入商品详细组件
        // this.$router.push({ path: "/goods/goodslist/0" }); 
    },
    methods:{
        getCarshopById(id){// 根据用户id获取购物车数据，并将数据放在 vuex 中
            // 向后台获取数据
            this.$http
                .get("carshop/getCarshopByUserId?id="+id)
                .then(result => {
                    if (result.body.code === 0){
                        // 初始化 vuex 中购物车对象
                        result.body.data.infoList.forEach(item => {
                            this.$store.commit('addCar',item)
                        })
                        this.$router.push({ path: "/goods/goodslist/0" }); 
                    }
                });
        },
        // 获取用户信息
        getShopUserByOpenId(){
            this.$http
                .get('shopUser/getUserInfo?openId=' + this.openId)
                .then(result=>{
                    if (result.body.code === 0){
                        var demo = result.body.data[0];
                        // 调用vuex的方法
                        this.$store.commit('setShopUser',demo)  
                        // 得到用户购物车的数据
                        this.getCarshopById(demo.userId)
                    }
                })
        },
        
    }
}
</script>

<style lang="scss" scoped>

</style>
