<template>
<div class="shopcar-container">
    <!-- 商品列表区域 -->
    <div class="goods-list">

    	<div class="mui-card" v-for="(item,i) in goodslist" :key="item.id">
			<div class="mui-card-content">
				<div class="mui-card-content-inner">
					<mt-switch v-model="item.selected" @change="selectedChanged(item.id)"></mt-switch>
                    <img :src="item.icon">

                    <div class="info">
                        <h1>{{ item.name }}</h1>
                        <p>
                            <span class="price">￥{{ item.price }}</span>
                            <numbox :maxNum="item.stock" :numbers="item.account" :productId="item.id"></numbox>
                            <a href="#"  @click.prevent="remove(item.id, i)">删除</a>
                        </p>
                    </div>
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
                        <span class="red">{{ $store.getters.getAllAmount }}</span> 件， 总价 ￥
                        <span class="red">{{ $store.getters.getTotalPrice }}</span> </p>
                </div>
                <mt-button type="danger" @click="goToCarOrders()">去结算</mt-button>
			</div>
		</div>
	</div>
</div>
</template>

<script>
// 引入组件
import numbox from '../subcomponents/Shopcar_numbox.vue'

export default {
    data() {
        return {
            userId: this.$store.state.shopUser.userId, // 用户id信息，后期放在 vuex 中
            goodslist: this.$store.state.car, // 购物车中所有商品的数据
        }
    },
    created(){
        // this.getCarshopById("1")
        this.updateCarshop();
    },
    methods:{
        goToCarOrders(){// 跳到购物车结算界面
            this.$router.push({ path: "/order/buycars"});
        },
        getCarFromVuex(){
            this.goodslist = this.$store.state.car;
        },
        remove(id ,index){// 删除购物车中某个商品
            // 删除该组件中 goodslist 中数据
            this.goodslist.splice(index, 1)
            // 删除 vuex 中数据
            this.$store.commit('reduceCar', id)
        },
        selectedChanged(id){// 更新商品选中状态
            this.$store.commit('updatedSelected',id)
        },
        updateCarshop(){// 向后台修改购物车数据
            /* 
                购物车数组对象：{ id:商品的id, name:商品名称, price: 商品的单价, icon: 商品图标, account: 要购买的数量,  selected: false, stock:库存量 }
            */
            // 转换成 JSON 格式字符串
            var list = [];
            this.goodslist.forEach(item =>{
                var demo = { productId:item.id, account:item.account, selected:item.selected }                
                list.push(demo);
            })

            // 构建web层需要的格式
           var carshopList = { userId: this.userId ,carshopFormList: JSON.stringify(list) }
            this.$http
                .post('carshop/updateCarshopByUserId', carshopList)
                .then(result=>{
                    if(result.body.code === 0){
                        
                    }
                })
        }
    },
    components: {
        numbox
    }   
}
</script>

<style lang="scss" scoped>
.shopcar-container {
    overflow-y: auto;
    max-height: 567px;
    background-color: #eee;
    

    .goods-list{
        .mui-card-content-inner{
            display: flex;
            align-items: center;
        }
        img{
            width: 60px;
            height: 60px;
        }
        h1{
            font-size: 13px;
        }
        .info{
            display: flex;
            flex-direction: column;
            justify-content: space-between;
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
}
</style>
