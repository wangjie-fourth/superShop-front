<template>
<div class="user_container">
    <!-- 用户信息区域 -->
    <div class="mui-card">
	    <div class="mui-card-content">
			<div class="mui-card-content-inner">
                <div class="user_message">
                    <!-- 头像区域 -->
                    <img :src="this.userInfo.userIcon" />
                    <!-- 用户名称区域 -->
                    <div class="username">
                        {{ this.username }}
                    </div>
                </div>
            </div>
		</div>
	</div>

    <!-- 订单信息区域 -->
    <div class="mui-card">
	    <div class="mui-card-content">
			<div class="mui-card-content-inner">
                <div class="order">
                    <!-- 未完成订单 -->
                    <div class="order-item" @click="goToUnFinishOrders()">
                        <span class="mui-icon-extra mui-icon-extra-order"></span>
                        <span>未完成</span>
                    </div>
                    <!-- 已完成订单 -->
                    <div class="order-item" @click="goToFinishOrders()">
                        <span class="mui-icon-extra mui-icon-extra-topic"></span>
                        <span>已完成</span>    
                    </div>
                    
                    <!-- 全部订单 -->
                    <div class="order-item" @click="goToAllOrders()">
                        <span class="mui-icon-extra mui-icon-extra-dictionary"></span>  
                        <span>全部订单</span>  
                    </div>
                    
                </div>
            </div>
		</div>
	</div>

    <!-- 收货地址区域 -->
    <div class="mui-card location">
		<div class="mui-card-header location_header">
            <span>收货地址管理</span>
            <span class="mui-icon mui-icon-plus" @click="goAdd()"></span>
        </div>
        <div class="mui-card"  v-for="item in locations" :key="item.id">
		    <div class="mui-card-content">
			<div class="mui-card-content-inner" >

                <div class="location_item">
                    <div class="message">
                        <p>
                            <span>{{ item.name }}</span>
                            <span>{{ item.phone }}</span>
                        </p>
                        <p>
                            {{ item.address }}
                        </p>
                    </div>
                    <div class="modify">
                        <span class="mui-icon mui-icon-compose" @click="goEdit(item.id)"></span>
                        <span class="mui-icon mui-icon-trash" @click="goDelete(item.id)"></span>
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
        return{
            userInfo: this.$store.state.shopUser,
            username: this.$store.state.shopUser.username,
            userIcon: this.$store.state.shopUser.userIcon,
            userId: this.$store.state.shopUser.userId, // 用户id信息，后期放在 vuex 中
            locations: [], // 收货地址数组信息
        }
    },
    created(){
        // 获取 收货地址信息
        this.getAllLocations();
    },
    methods:{
        getAllLocations(){// 获取该用户的所有 收货地址信息
            this.$http
                .get('location/getAll?id='+this.userId)
                .then(result=>{
                    if(result.body.code === 0){
                        this.locations = result.body.data.list;
                    }
                })
        },
        goAdd(){// 跳转到添加收货地址界面
            this.$router.push({ path: "/location/add"});
        },
        goEdit(locationId){// 跳转到修改收货地址界面
            this.$router.push({ path: "/location/edit/" + locationId });
        },
        goDelete(id){// 根据locationId删除对应的Location对象
            // 
            this.$http
                .get('location/delete?locationId='+id)
                .then(result => {
                    if(result.body.code === 0){
                        this.getAllLocations();
                    }
                })

        },
        goToAllOrders(){// 跳转到显示所有订单信息界面
            // 进入所有订单显示界面
            this.$router.push({ path: "/orderInfo/list"});
        },
        goToUnFinishOrders(){// 跳转到显示所有未完结订单信息界面
            this.$router.push({ path: "/orderInfo/UnFinishOrderList"});
        },
        goToFinishOrders(){// 跳转到显示所有以完结订单信息界面
            this.$router.push({ path: "/orderInfo/FinishOrderList"});
        }
    }
}
</script>

<style lang="scss" scoped>
.user_container{
    .user_message{
        display: flex;
        justify-content: space-between;

        img{
            width: 20%;
            height: 50px;
            border-radius:50%;
        }
        .username{
            height: 50px;
            font-weight: bold;
            font-size: 16px;
        }
    }

    .order{
        display: flex;
        justify-content: space-between;

        .order-item{
            display: flex;
            flex-direction: column;
            text-align:center;
        }
    }

    .location{
        overflow: auto;
        height: 392px;

        .location_header{
            display: flex;
            justify-content: space-between;

        }

        .location_item{
            display: flex;
            justify-content: space-between;
            height: 60px;

            .modify{
                display: flex;
                flex-direction: column;
            }
        

            span{
                font-weight: bold;
            }
        }
    }
    
}
</style>


