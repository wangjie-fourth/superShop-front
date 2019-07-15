// 1.1 导入 Vue
import Vue from 'vue'



/* Mint UI */
// 2.1 导入 Mint UI 组件
// import { Header } from 'mint-ui';
// // 2.2 将组件安装到 Vue
// Vue.component(Header.name, Header);
import MintUI from 'mint-ui'
Vue.use(MintUI)
import 'mint-ui/lib/style.css'



/* MUI */
// 导入 MUI 样式
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'



/* Vue-router */
// 2.1 导入 Vue-router
import VueRouter from 'vue-router'
// 2.2 将路由安装到 Vue
Vue.use(VueRouter)
// 2.3 导入单独的 router.js 路由模块
import router from './router.js'



// 导入 moment 第三方组件
import moment from 'moment'
/* 定义全局的过滤器：时间格式 */
Vue.filter('dateFormat', function (dataStr, pattern ="YYYY-MM-DD HH:mm:ss") {
  return moment(dataStr).format(pattern)
})



// 3.1 导入 Vue-resource
import VueResource from 'vue-resource'
// 3.2 将 vue-resource 安装到 Vue 中
Vue.use(VueResource)
// 设置请求的根路径
 Vue.http.options.root = 'http://wangjie.natappvip.cc/supershop/'
// 设置post表单提交方式
Vue.http.options.emulateJSON = true
// 解决跨域问题
Vue.prototype.HOST='/goods/index'

/* vuex */
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    shopUser:"",
    car: [],// 购物车数组对象：{ id:商品的id, name:商品名称, price: 商品的单价, icon: 商品图标, account: 要购买的数量,  selected: false, stock:库存量 }
    allAmount: 0,// 购物车中选中商品的总数量
    totalPrice: 0.0, //购物车中选中商品的总价格
  },
  mutations: {
      addCar (state, goodsinfo) {// 向购物车数组对象中添加一个对象
        /*
           1. 如果购物车中，之前就已经有这个对应的商品了，那么，只需要更新数量
           2. 如果没有，则直接把 商品数据，push 到 car 中即可
        */
        var flag = false
      
        //1、购物车有这个商品
        state.car.some(item => {
          if (item.id == goodsinfo.id) {
            item.account += parseInt(goodsinfo.account)
            flag = true
            return true
         }
        })
 
       // 2、购物车没有这个商品
       if (!flag) {
         state.car.push(goodsinfo)
       }
      },
      reduceCar(state, id){// 根据 id 删除购物车中的商品对象

        state.car.some((item,i) => {
          if (item.id === id){
            state.car.splice(i, 1)
            return true;
          }
        })
      },
      updatedProductAccount(state, increaseItem){// 改变某个商品的购买数量
        state.car.some(item => {
          if(item.id === increaseItem.id){
            item.account = parseInt(increaseItem.account)
            return true
          }
        })
      },
      updatedSelected(state,id){// 更改指定商品id的selected属性
        state.car.some(item => {
          if(item.id === id){
            item.selected = !!item.selected
            return true
          }
        });
      },
      setShopUser(state, demoInfo){// 设置用户信息
        state.shopUser = demoInfo
      },
  },
  getters: {
    getAllAmount(state){// 购物车中选中商品的总数量
      var c = 0
      state.car.forEach(item => {
        if(item.selected === true){
          c += item.account
        }
      }) 
      return c
    },
    getTotalPrice(state){// 购物车中选中商品的总价格
      var c = 0
      state.car.forEach(item => {
        if(item.selected === true){
          c += item.price * item.account
        }
      }) 
      return c
    },
    getUserOfUserId(state){// 得到用户信息对象
      return state.shopUser.userId
    },
  }
});

// 1.2 导入 App.vue 基本组件
import app from './App.vue'
// 1.3 将 app组件 渲染到index.html 中
var vm = new Vue({
    el: '#app',
    render: c => c(app),
    router, // 1.4 将路由挂载到Vue 实例上
    store: store, // 在 vue 实例上挂载
    created() {
      // 得到购物车数据
      // this.getCarshopById("1556286032654545253")
      // this.getCarshopById(this.$store.state.shopUser.userId)
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

    },
});