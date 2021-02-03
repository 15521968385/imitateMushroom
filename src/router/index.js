import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const Home = () => import('views/Home')
const Cart = () => import('views/Cart')
const Profile = () => import('views/Profile')
const Categroy = () => import('views/Categroy')
const BannerView = () => import('views/BannerView')
const GoodsView = () => import('views/GoodsView')
const FenleiView = ()=>import('views/FenleiView')

const routes = [
  {
    path: '/',
    redirect: '/home'

  },
  {
    path: '/home',
    component: Home,
    meta: {
      title: '首页'
    }
  },
  {
    path: '/categroy',
    component: Categroy,
    meta: {
      title: '分类'
    }
  },
  {
    path: '/cart',
    component: Cart,
    meta: {
      title: '购物车'
    }
  },
  {
    path: '/profile',
    component: Profile,
    meta: {
      title: '我的'
    }
  },
  {
    path: '/home/:banner_item',
    component: BannerView,
    meta: {
      title: '想你所想'
    }
  }, 
  {
    path: '/goods/:good_id',
    component: GoodsView,
    meta: {
      title: '恭喜发财'
    }
  },
  {
    path:'/fenleiview',
    component:FenleiView,
    meta:{
      title:'不过也是'
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 修改document.title
router.beforeEach((to, from, next) => {
  document.title = `${to.matched[0].meta.title}.谢冰`;
  next();
})

//多次点击同一个跳转
//push
const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (to) {
    return VueRouterPush.call(this, to).catch(err => err)
}
//replace
const VueRouterReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function replace (to) {
  return VueRouterReplace.call(this, to).catch(err => err)
}

export default router
