# 一、完善 main.js 
1、导入 Vue
2、导入 App.vue 组件
3、将 app 组件渲染到 index.html

# 二、完成项目基本架构
项目共为三部分：Header区域、中间路由区域、底部tabbar区域

## （一）区域功能介绍
### Header 区域
顶部显示作用
### 中间路由区域
根据用户的不同选择，用于显示切换的组件
### 底部tabbar区域
底部导航区域：商品、购物车、我的

## （二）功能完成
将 App.vue 分为三个区域
    Header、中间路由区域、底部tabbar区域：
### Header 区域
从 Mint UI 中的 Header 中找样式：
1、按需将 Mint UI 组件导入，将安装到Vue
2、在 App.vue 的 Header 区域调样式

### 底部tabbar区域
从 MUI 中找到 tabbar 样式
1、在 main.js 引入 MUI 的基本样式
2、在 App.vue 中调试 样式
3、在 MUI 中找合适的 icon 

### 中间路由区域
根据底部 tabbar 切换显示组件
1、引入 vue-router，并安装
2、引入外部 router.js 
3、在 vue 中实例指定 router
4、创建三个基本组件：GoodContainer.vue、ShopcarContainer.vue、UserContainer.vue
5、改造 App.vue 中底部 tabbar 为router-link 
6、改造 App.vue 的 中间路由区域为 router-view
7、在 router.js 引入组件，并设置路由匹配规则

#### 其他设置
1、设置路由初始状态（/），所匹配的组件是 GoodContainer.vue
2、设置选中路由高亮




# 三、 GoodContainer.vue 组件
## (一)左侧 类品栏
1、基本样式
2、改造 li 为 router-link
3、GoodContaine 子组件 用 GoodList

# 四、购物车

# 五、商品详情页


