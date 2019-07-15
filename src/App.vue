<template>
  <div class="app-container">
    <!-- Header 区域 -->
    <mt-header fixed title="洪福超市">
			<span slot="left" @click="goBack" v-show="flag">
        <mt-button icon="back">返回</mt-button>
      </span>
		</mt-header>

    <!-- 中间的路由 router-view 区域 -->
		<div class="tab-wrapper">
			<router-view></router-view>
		</div>
    

    <!-- 底部tabbar区域 -->
    <nav class="mui-bar mui-bar-tab">
			<router-link  class="mui-tab-item" to="/goods/goodslist/0">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">商品</span>
			</router-link >
			<router-link  class="mui-tab-item" to="/shopcar">
				<span class="mui-icon mui-icon-extra mui-icon-extra-cart" id="badge">
          <span class="mui-badge">{{ this.$store.getters.getAllAmount }}</span></span>
				<span class="mui-tab-label">购物车</span>
			</router-link >
			<router-link  class="mui-tab-item" to="/user">
				<span class="mui-icon mui-icon-contact"></span>
				<span class="mui-tab-label">我的</span>
			</router-link >
		</nav>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        flag: false,
      }
    },
    created() {
      this.flag = this.$route.path === '/goods/goodslist/0' ? false : true;
    },
    methods: {
      goBack(){
        // 点击后退
        this.$router.go(-1);
      }
    },
    watch:{
      '$route.path': function(newVal){
        if(newVal === '/goods/goodslist/0'){
          this.flag = false
        } else {
          this.flag = true
        }
      }
    }
  }
</script>


<style lang="scss" scoped>
.app-container { 
	.tab-wrapper{
			// 将 Header 区域挤出去
		  position: fixed;
      top: 40px;
      left: 0;
      right: 0;
			// 将底部 tabbar 区域挤出去 
      bottom: 50px;
	}
}


</style>
