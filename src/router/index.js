import Vue from 'vue'
import VueRouter from 'vue-router'
import Cart from "../views/Cart"
import Login from "../views/Login"
import Register from "../views/Register"
import Mine from "../views/Mine"
import Info from "../views/Info"
import Order from "../views/Order"
import OrderDetail from "../views/OrderDetail"
import Pay from "../views/Pay"

Vue.use(VueRouter)

import {Toast} from 'mint-ui'

const routes = [
  {
    path: '/',
    name: '购物车',
    component: Cart
  },
  {
    path: '/about',
    name: '关于',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/cart',
    name: '购物车',
    component: Cart
  },
  {
    path: '/login',
    name: '登录',
    component: Login
  },
  {
    path: '/register',
    name: '注册',
    component: Register
  },
  {
    path: '/mine',
    name: '个人中心',
    component: Mine
  },
  {
    path: '/info',
    name: '买家信息',
    component: Info
  },
  {
    path: '/order',
    name: '我的订单',
    component: Order
  },
  {
    path: '/orderDetail',
    name: '订单详情',
    component: OrderDetail
  },
  {
    path: '/pay',
    name: '支付',
    component: Pay
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

//解决路由跳转错误
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

router.beforeEach((to, from, next) => {
  if (to.path.startsWith('/login')) {
    window.localStorage.removeItem('access-user')
    next()
  } else if(to.path.startsWith('/register')){
    next()
  }
  else {
    let user = JSON.parse(window.localStorage.getItem('access-user'))
    if (!user) {
      next({path: '/login'})
    } else {
      //校验token
      axios({
        url:'http://localhost:8686/account-service/user/checkToken',
        method:'get',
        headers:{
          token:user.token
        }
      }).then((response) => {
        if(response.data.code == -1){
          let instance = Toast('登录超时！请重新登录！');
          setTimeout(() => {
            instance.close();
          }, 2000)
          next({path: '/login'})
        }
      })
      next()
    }
  }
})

export default router
