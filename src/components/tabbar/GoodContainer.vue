<template>
<div class="good-container">
    <div class="menu">
        <ul>
            <li v-for="item in productCategoryList" :key="item.id">
                <router-link :to="'/goods/goodslist/'+ item.type">
                    {{ item.name }}
                </router-link>
            </li>
        </ul>
    </div>


    <router-view tag="div" class="goods"></router-view>


</div>
</template>

<script>
export default {
    data () {
        return {
            productCategoryList: [], // 商品分类集合
        }
    },
    created(){
        //
        this.getProductCategoryList();
    },
    methods: {
        // 获取左侧商品分类数据
        getProductCategoryList() {
            // 从后台获取数据
            this.$http
                .get("goods/getCategorys")
                .then(result => {
                    if (result.body.code === 0) {
                        this.productCategoryList = result.body.data;
                    }
                });
        },


    }
}
</script>

<style lang="stylus" scoped>
.good-container{
    display: flex;
    position: absoulte;
    width: 100%;
    overflow: hidden;

    .menu{
        flex: 0 0 80px;
        width: 80px;
        z-index :999;

        ul,li {
            margin:0px;
            padding:0px;
            border:none;
            list-style : none;
            text-align : center;
        }
        li {
            height :50px;
            line-height : 50px;
        }
    }
    .goods{
        flex: 1;
    }
}
</style>