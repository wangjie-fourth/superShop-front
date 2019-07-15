<template>
<div class="goodsinfo-container">

    <!-- 小球动画 -->
    <transition
      @before-enter="beforeEnter"
      @enter="enter"
      @after-enter="afterEnter">
      <div class="ball" ref="ball" v-show="ballFlag" id="ball"></div>
    </transition>

    <!-- 商品轮播图区域 -->
	<div class="mui-card">
		<div class="mui-card-content">
			<div class="mui-card-content-inner">
				  <mt-swipe :auto="0">
            <mt-swipe-item>
              <img :src="goodsinfo.icon">
            </mt-swipe-item>
          </mt-swipe>
			</div>
		</div>
	</div>

    <!-- 商品购买区域 -->
	<div class="mui-card">
		<div class="mui-card-header">{{ goodsinfo.name }}</div>
		<div class="mui-card-content">
			<div class="mui-card-content-inner">
				<p class="price">
                    市场价：<del>￥2399</del> &nbsp;&nbsp; 销售价：<span class="now_price">￥{{ goodsinfo.price }}</span>
                </p>
                <p>
                    购买数量：<numbox :maxNum="goodsinfo.stock" @getcount="getSelectedCount"></numbox>
                </p>
                <p>
                    <mt-button type="primary" size="small" @click="quickBuy()">立即购买</mt-button>
                    <mt-button type="danger" size="small" @click="addToShopCar">加入购物车</mt-button>
                </p>
			</div>
		</div>
	</div>

    <!-- 商品参数区域 -->
    <div class="mui-card">
			<div class="mui-card-header">商品推荐</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<div class="recommend">
              <div class="recommend_item" @click="goToRecommendItem(0)">
                <span>{{this.goodsinfo.recommendList[0].recommendName}}</span>
                <img :src="this.goodsinfo.recommendList[0].recommendIcon"/>
              </div>
              <div class="recommend_item" @click="goToRecommendItem(1)">
                <span>{{this.goodsinfo.recommendList[1].recommendName}}</span>
                <img :src="this.goodsinfo.recommendList[1].recommendIcon"/>
              </div>
              <div class="recommend_item" @click="goToRecommendItem(2)">
                <span>{{this.goodsinfo.recommendList[2].recommendName}}</span>
                <img :src="this.goodsinfo.recommendList[2].recommendIcon"/>
              </div>
            </div>
					</div>
			  </div>
		</div>
</div>
</template>

<script>
// 引入子组件
import numbox from '../subcomponents/goodsinfo_numberbox.vue'

export default {
  data() {
    return {
      id: this.$route.params.id, // 将路由参数对象中的 id 挂载到 data , 方便后期调用
      goodsinfo: {}, // 获取到的商品的信息
      ballFlag: false, // 控制小球显示和隐藏
      selectedCount: 1 // 保存用户选中的商品数量， 默认，认为用户买1个
    };
  },
  created() {
    this.getGoodsInfo();
  },
  methods: {
    goToRecommendItem(id){
      var demoId = this.goodsinfo.recommendList[id].productId;
      this.id = demoId;
      this.getGoodsInfo();
    },
    quickBuy(){ // 立即购买这个商品
      //跳转到新订单界面
      this.$router.push( { path: "/order/quickbuy/" + this.id + "/" + this.selectedCount} )
    },
    getGoodsInfo() {// 获取商品的信息
      this.$http
      .get("goods/getProductById?id=" + this.id)
      .then(result => {
        if (result.body.code === 0) {
          this.goodsinfo = result.body.data;
        }
      });
    },
    addToShopCar() {
      // 添加到购物车
      this.ballFlag = !this.ballFlag;
      /*
        要保存 vuex 中 car 的数据：
        { id:商品的id, name:商品名称, price: 商品的单价, icon: 商品图标, account: 要购买的数量,  selected: false, stock:库存量 }
      */
      var goodsinfo = { id: this.id, name:this.goodsinfo.name, price:this.goodsinfo.price, icon:this.goodsinfo.icon, 
                        account: this.selectedCount, selected: true, stock:this.goodsinfo.stock }
      // 调用 store 中的 mutations 来将商品加入购物车
      this.$store.commit("addCar", goodsinfo);
    },
    beforeEnter(el) {
      el.style.transform = "translate(0, 0)";
    },
    enter(el, done) {
      el.offsetWidth;
      // 小球动画优化思路：
      // 1. 先分析导致 动画 不准确的 本质原因： 我们把 小球 最终 位移到的 位置，已经局限在了某一分辨率下的 滚动条未滚动的情况下；
      // 2. 只要分辨率和 测试的时候不一样，或者 滚动条有一定的滚动距离之后， 问题就出现了；
      // 3. 因此，我们经过分析，得到结论： 不能把 位置的 横纵坐标 直接写死了，而是应该 根据不同情况，动态计算这个坐标值；
      // 4. 经过分析，得出解题思路： 先得到 徽标的 横纵 坐标，再得到 小球的 横纵坐标，然后 让 y 值 求差， x 值也求 差，得到 的结果，就是横纵坐标要位移的距离
      // 5. 如何 获取 徽标和小球的 位置？？？   domObject.getBoundingClientRect()

      // 获取小球的 在页面中的位置
      var box=document.getElementById('box');
      const ballPosition = this.$refs.ball.getBoundingClientRect();

      // 获取 徽标 在页面中的位置
      const badgePosition = document
        .getElementById("badge")
        .getBoundingClientRect();

      const xDist = badgePosition.left - ballPosition.left;
      const yDist = badgePosition.top - ballPosition.top;

      el.style.transform = `translate(${xDist}px, ${yDist}px)`;
      el.style.transition = "all 0.5s cubic-bezier(.4,-0.3,1,.68)";
      done();
    },
    afterEnter(el) {
      this.ballFlag = !this.ballFlag;
    },
    getSelectedCount(count) {
      // 当子组件把 选中的数量传递给父组件的时候，把选中的值保存到 data 上
      this.selectedCount = count;
    }
  },
  components: {
      numbox
  }
};
</script>

<style lang="scss" scoped>

.goodsinfo-container{
    background-color: #eee;
    height: 567px;
    overflow: auto;

    .recommend{
      display: flex;
      justify-content: space-between;

      .recommend_item{
        display: flex;
        flex-direction: column;
        height: 100px;

        img{
          height: 80px;
        }


      }
    }
    

    .now_price {
        color: red;
        font-size: 16px;
        font-weight: bold;
    }

    .ball {
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background-color: red;
        position: absolute;
        z-index: 99;
        top:390px;
        left: 144px;
    }

    .mint-swipe {
    height: 200px;

    /*
        设置轮播图样式
    */
    // 在 scss 有简写方式
    .mint-swipe-item {
        text-align: center;
    }

    img {
        // width: 100%;
        height: 100%;
    }
}
}
</style>

