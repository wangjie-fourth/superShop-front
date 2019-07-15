import VueRouter from 'vue-router'

// 引入组件
import demo from './components/demo.vue'
import GoodContainer from './components/tabbar/GoodContainer.vue'
import ShopcarContainer from './components/tabbar/ShopcarContainer.vue'
import UserContainer from './components/tabbar/UserContainer.vue'
import GoodsList from './components/goods/GoodsList.vue'
import GoodsInfo from './components/goods/GoodsInfo.vue'
import Add_Location from './components/location/Add_Location.vue'
import Edit_Location from './components/location/Edit_Location.vue'
import NewOrder from './components/order/NewOrder.vue'
import NewOrders from './components/order/NewOrders.vue'
import orderList from './components/orderInfo/orderList.vue'
import FinishOrderList from './components/orderInfo/FinishOrderList.vue'
import UnFinishOrderList from './components/orderInfo/UnFinishOrderList.vue'


// 创建路由对象
var router = new VueRouter({
  routes: [// 配置路由规则
    { path: '/', redirect: '/goods/goodslist/0' },
    { 
      path: '/goods', 
      component: GoodContainer,
      // 使用 children 属性，实现子路由，同时，子路由的 path 前面，不要带 / ，否则永远以根路径开始请求，这样不方便我们用户去理解URL地址
      children: [
        {path: 'goodslist/:type', component: GoodsList},
        {path: '/goods/goodslist/0/:openId', component: demo}
      ]
    },
    { path: '/shopcar', component: ShopcarContainer},
    { 
      path: '/user', component: UserContainer},
    { path: '/goods/goodsinfo/:id', component: GoodsInfo},
    { path: '/location/add', component:Add_Location },
    { path: '/location/edit/:locationId', component:Edit_Location},
    { path: '/order/quickbuy/:productId/:selectedCount', component: NewOrder },
    { path: '/order/buycars', component: NewOrders},
    { path: '/orderInfo/list',component: orderList},
    { path: '/orderInfo/UnFinishOrderList',component: UnFinishOrderList},
    { path: '/orderInfo/FinishOrderList', component: FinishOrderList},
  ],
  linkActiveClass: 'mui-active' // 设置选中的路由采用 mui-active 类样式；默认是采用router-link-active
})

// 把路由对象暴露出去
export default router