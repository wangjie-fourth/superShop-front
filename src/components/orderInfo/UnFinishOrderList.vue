<template>
<div>
    <!-- 订单列表区域 -->
    <div class="mui-card">
		<div class="mui-card-header">
            <span>未完成订单列表</span>
        </div>
        <div class="allInfo">
            <div class="mui-card"  v-for="item in orderList" :key="item.orderId">
                <div class="mui-card-content">
                <div class="mui-card-content-inner" >

                    <div class="order">
                        <div class="orderInfo_item" v-for="info in item.productList" :key="info.productIcon">
                            <img :src="info.productIcon">
                            <p>
                                <span>{{info.productPrice}}元</span>
                            </p>
                            <p>
                                <span>{{info.productQuantity}}件</span>
                            </p>
                        </div>
                        
                        <div class="orders">
                            <p>
                                <span>总价：{{item.orderAmount}}元</span>
                            </p>
                        </div>
                    </div>

                </div>
                </div>
            </div>
        </div>
	</div>
</div>
</template>

<script>
export default {
    data(){
        return {
            userId: this.$store.state.shopUser.userId, // 用户id信息，后期放在 vuex 中
            orderList: [],// 订单信息
        }
    },
    created(){
        // 获取所有订单信息
        this.getAllUnfinishedOrders()
    },
    methods:{
        getAllUnfinishedOrders(){
            this.$http
                .get('order/getAllUnfinishedOrders?userId='+this.userId)
                .then(result=>{
                    if(result.body.code === 0){
                        this.orderList = result.body.data;
                    }
                })
        }
    }
}
</script>

<style lang="scss" scoped>
.allInfo{
    overflow: auto;
    height: 550px;

    .mui-card-content-inner{
        padding: 5px;

        .order{
            display: flex;
            

            .orderInfo_item{
                margin-right:auto;
                flex-direction:column;
                
                img{
                    width: 50px;
                }
                p{
                    margin: 0;
                    span{
                        color:red;
                    }
                }
                
            }

            .orders{
                width: 84px;
                p{
                    span{

                    }
                }
            }
        }
    }
}
</style>
