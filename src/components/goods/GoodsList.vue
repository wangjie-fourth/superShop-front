<template>
<div class="goods-list">
    
    <!-- 编程式跳转 -->
    <div class="goods-item" v-for="item in productList" :key="item.id" @click="goDetail(item.id)" >
        <img :src="item.icon" alt="">
        <h1 class="title">{{ item.name }}</h1>
        <div class="info">
            <p class="price">
                <span class="now">￥{{ item.price }}</span>
                <span class="old"></span>
            </p>
            <p class="sell">
                <span>热卖中</span>
                <span>剩{{ item.stock }}件</span>
            </p>
        </div>
    </div>

    <!-- 加载更多数据 -->
    <mt-button type="danger" size="large" v-show="productExist" @click="getMoreProducts" >加载更多</mt-button>
</div>
</template>

<script>
export default {
    data () {
        return {
            type: this.$route.params.type,//要展示的商品分类编号
            pageIndex: 0,//分页的页数
            productList: [],// 页面所展示的商品列表
            productExist: true, // 判断是否还有数据
            userId: this.$store.state.shopUser.userId,
        }
    },
    created(){
        this.getProductsByCategoryType(this.type,0,6);
        // 获取购物车数据
        // alert(this.userId)
        // this.getCarshopById(this.$store.getters.getUserOfUserId)
    },
    methods: {
        getCarshopById(id){// 根据用户id获取购物车数据，并将数据放在 vuex 中
            // 向后台获取数据
            this.$http
                .get("carshop/getCarshopByUserId?id="+id)
                .then(result => {
                    // 初始化 vuex 中购物车对象
                    result.body.data.infoList.forEach(item => {
                        this.$store.commit('addCar',item)
                    })
                });
        },
        // 获取指定分类下的商品数据
        getProductsByCategoryType(type, page, size){
            // 向后台获取数据
            this.$http
                .get("goods/getProducts?type="+type+"&page="+page+"&size="+size)
                .then(result => {
                    if (result.body.code === 0) {
                        // 得到商品数据(注意后续获取更多数据)
                        this.productList = this.productList.concat(result.body.data.productVOList);
                        // 判断是否还有商品数据
                        this.productExist = result.body.data.exist === 0 ? false : true;
                    }
                })
        },
        goDetail(id){// 进入商品详细页面
            // 进入商品详细组件
            this.$router.push({ path: "/goods/goodsinfo/" + id });
        },
        getMoreProducts(){
            // 页数加1
            this.pageIndex++
            // 获取数据
            this.getProductsByCategoryType(this.type,this.pageIndex,6);
        }
    },
    watch: {
        '$route.path': function(newVal, oldVal) {
            var index = newVal.lastIndexOf("/");
            this.type = newVal.substring(index+1);
            this.productList = [];
            this.getProductsByCategoryType(this.type,0,6);
        }
  }
    
}
</script>

<style lang="scss" scoped>
.goods-list{
    max-height: 567px;
    overflow: auto;
    display: flex;
    flex-wrap: wrap;
    padding: 0px;
    justify-content: space-between;
    

    .goods-item {
        width: 49%;
        border: 1px solid #ccc;
        box-shadow: 0 0 8px #ccc;
        margin: 0px 0;
        padding: 2px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        min-height: 210px;
        img{
            width: 100%;
        }
        .title {
            font-size: 14px;
        }

        .info{
            background-color: #eee;
            p {
                margin: 0;
                padding: 0px;
            }
            .price{
                .now{
                    color: red;
                    font-weight: bold;
                    font-size: 16px;
                }
                .old{
                    text-decoration: line-through;
                    font-size: 12px;
                    margin-left: 25px;
                }
            }
            .sell{
                display: flex;
                justify-content: space-between;
                font-size: 13px;
            }
        }
    }
}
</style>

