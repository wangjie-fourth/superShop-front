<template>
<div>
    <div class="mui-card">
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

    <div class="mui-card">
		<div class="mui-card-header">购买的商品</div>

        <div class="mui-card">
			<div class="mui-card-content">
				<div class="mui-card-content-inner product-item">
                    <img :src="productInfo.icon">

                    <div class="info">
                        <h1>{{ productInfo.name }}</h1>
                        <p>
                            <span class="price">￥{{ productInfo.price }}</span>
                        </p>
                    </div>

                    <span>{{this.selectCount}}件</span>
				</div>
			</div>
		</div>

	</div>

    <!-- 结算区域 -->
    <div class="mui-card">
		<div class="mui-card-content">
			<div class="mui-card-content-inner jiesuan">
				<div class="left">
                    <p>总计（不含运费）</p>
                    <p>以勾选商品 
                        <span class="red">{{this.selectCount}}</span> 件， 总价 ￥
                        <span class="red">{{this.selectCount * this.productInfo.price}}</span> </p>
                </div>
                <mt-button type="danger">去结算</mt-button>
			</div>
		</div>
	</div>

    <mt-button type="danger" size="large" @click="goToOrders()">付款</mt-button>
</div>
</template>

<script>
// 引入组件
import { Toast } from 'mint-ui';

export default {
    data(){
        return{
            id:this.$route.params.productId,//商品的id
            selectCount:this.$route.params.selectedCount,//要买商品的个数
            productInfo:{},// 商品信息
            userId:this.$store.state.shopUser.userId,//用户的id，后期放在vuex中
            userOpenid:this.$store.state.shopUser.userOpenid,// 用户的openid，后期放在vuex中
            locationInfo:{},//收货地址信息
        }
    },
    created(){
        // 获取收货地址信息
        this.getDefaultLocation();
        // 获取要买的商品信息
        this.getProductById();
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
            var demo = {
                        productId:this.productInfo.id, productName:this.productInfo.name, 
                        productPrice:this.productInfo.price, productQuantity:this.selectCount, 
                        productIcon:this.productInfo.icon 
                        }                
            details.push(demo);

            
            var totalMoney = this.selectCount * this.productInfo.price;
            // 订单对象
            var order = {   locationId: this.locationInfo.id, userId:this.userId, userOpenid:this.userOpenid, 
                            orderAmount:totalMoney, orderDeatils: JSON.stringify(details)};
            // console.log(order)
            // 向后台发送数据
            this.$http
                .post('order/new',order)
                .then(result =>{
                    if (result.body.code === 0){
                        var orderId = result.body.data.orderId;

                        // 调用微信支付接口，发起支付界面
                        location.href="http://wangjie.natappvip.cc/supershop/pay/create?orderId="+orderId+"&returnUrl=http://wangjie.natappvip.cc/supershop/wechat/authorize?returnUrl=http://supermarket.nat100.top/#/goods/goodslist/0"
                        // 切换到ShopContainer组件
                        // this.$router.push( {path:"/goods/goodslist/0"} )
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
        getProductById(){// 根据商品id获取商品对象
            this.$http
                .get('goods/getProductById?id=' + this.id)
                .then(result => {
                    if(result.body.code === 0){
                        this.productInfo = result.body.data;
                    }
                });
        },
    }
    
}
</script>

<style lang="scss" scoped>
.location_item{
    display: flex;
    justify-content: space-between;
}
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
</style>

