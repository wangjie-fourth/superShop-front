<template>
<div class="neworders-container">

    <!-- 选择收货地址 -->
    <div class="mui-card ">
		<div class="mui-card-content">
			<div class="mui-card-content-inner">

                <div class="location_item">
                    <div class="message">
                        <p>
                            <span>{{locationInfo.name}}</span>
                            <span>{{locationInfo.phone}}</span>
                        </p>
                        <p>
                            {{locationInfo.address}}
                        </p>
                    </div>
                    <div class="modify">
                        <span class="mui-icon-extra mui-icon-extra-arrowrightcricle"></span>
                    </div>
                </div>

		    </div>
		</div>
	</div>

    <div class="mui-card car-goods">
		<div class="mui-card-header">购买的商品</div>

        <div class="mui-card second-container" v-for="item in productList" :key="item.id">
			<div class="mui-card-content">
				<div class="mui-card-content-inner product-item">
                    <img :src="item.icon">

                    <div class="info">
                        <h1>{{ item.name }}</h1>
                        <p>
                            <span class="price">￥{{ item.price }}</span>
                        </p>
                    </div>

                    <span>{{ item.account }}件</span>
				</div>
			</div>
		</div>

	</div>

    <!-- 结算区域 -->
    <div class="mui-card last-container">
		<div class="mui-card-content">
			<div class="mui-card-content-inner jiesuan">
				<div class="left">
                    <p>总计（不含运费）</p>
                    <p>以勾选商品 
                        <span class="red">{{ $store.getters.getAllAmount }}</span> 件， 总价 ￥
                        <span class="red">{{ $store.getters.getTotalPrice }}</span> </p>
                </div>
                <mt-button type="danger" @click="goToOrders()">去结算</mt-button>
			</div>
		</div>
	</div>

    
</div>
</template>

<script>
// 引入组件
import { Toast } from 'mint-ui';

export default {
    data(){
        return{
            productList:[],// 要买的商品列表
            userId:this.$store.state.shopUser.userId,//用户的id，后期放在vuex中
            userOpenid:this.$store.state.shopUser.userOpenid,// 用户的openid，后期放在vuex中
            locationInfo:{},//收货地址信息
        }
    },
    created(){
        // 获取收货地址信息
        this.getDefaultLocation();
        // 获取要买的商品信息
        this.getProductsFromCar();
    },
    methods:{
        goToOrders(){// 向后台添加新的订单
            /* 
                构造出对象
                    {
                        locationId:"",
                        userId:"",
                        userOpenid:"",
                        orderAmount: 2.0,
                        orderDeatils:[
                            { productId:"", productName:"", productPrice:2.0, productQuantity:2, productIcon:"" },
                            ...
                        ]
                    }
            */
            // 购买的商品数组 
            var details = [];
            this.productList.forEach(item =>{
                var demo = { productId:item.id, productName:item.name, productPrice:item.price, productQuantity:item.account, productIcon:""+item.icon }                
                details.push(demo);
            })

            // 订单对象
            var order = {   locationId: this.locationInfo.id, userId:this.userId, userOpenid:this.userOpenid, 
                            orderAmount:this.$store.getters.getTotalPrice, orderDeatils: JSON.stringify(details)};
            // console.log(order)
            // 向后台发送数据
            this.$http
                .post('order/news',order)
                .then(result =>{
                    if (result.body.code === 0){
                        var orderId = result.body.data.orderId;

                        // 调用微信支付接口，发起支付界面
                        location.href="http://wangjie.natappvip.cc/supershop/pay/create?orderId="+orderId+"&returnUrl=http://wangjie.natappvip.cc/supershop/wechat/authorize?returnUrl=http://supermarket.nat100.top/#/goods/goodslist/0"
                    }
                })
        },
        getDefaultLocation(){// 获取用户的默认收货地址信息
            // 从后台获取
            this.$http
                .get('location/getByUserId?userId=' + this.userId)
                .then(result=>{
                    if(result.body.code === 0){
                        this.locationInfo = result.body.data;
                    }
                })
        },
        getProductsFromCar(){// 获取购物车中商品
            this.$store.state.car.forEach(item=>{
                if(item.selected == true){
                    this.productList.push(item)
                }
            });
        },
    }
    
}
</script>

<style lang="scss" scoped>
.neworders-container{

    .location_item{
        display: flex;
        justify-content: space-between;
    }

    .car-goods{
        overflow-y: auto;
        max-height: 363.6px;

        .product-item{
            display: flex;
            justify-content: space-between;
            
            img{
                width: 60px;
                height: 60px;
            }

            .info{
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                
                h1{
                    font-size: 13px;
                }
                .price{
                        color: red;
                        font-weight: bold;
                    }
                }
        }
    }

    .last-container{
        z-index: 999;

        .jiesuan {
            display: flex;
            justify-content: space-between;
            align-content: center;

            .red {
                color: red;
                font-weight: bold;
                font-size: 16px;
            }
        }
    }
}

</style>

