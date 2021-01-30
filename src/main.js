import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//网络请求
import { request } from 'network/request.js'
Vue.prototype.request = request;

// 事件总线$bus
Vue.prototype.$bus = new Vue()

//vant-ui
import {
  Button, Icon, Swipe, SwipeItem, Sticky, Popup, Cell, Stepper, GoodsAction, GoodsActionIcon, GoodsActionButton, Card,
  Checkbox, Toast, SwipeCell, SubmitBar
} from 'vant';
Vue.use(Button);
Vue.use(Icon);
Vue.use(Swipe);
Vue.use(SwipeItem)
Vue.use(Sticky)
Vue.use(Popup)
Vue.use(Cell)
Vue.use(Stepper)
Vue.use(GoodsAction);
Vue.use(GoodsActionButton);
Vue.use(GoodsActionIcon);
Vue.use(Card);
Vue.use(Checkbox);
Vue.use(Toast)
Vue.use(SwipeCell)
Vue.use(SubmitBar)

//全局过滤器
Vue.filter('priceFilter', function (priceStr) {
  return `￥${Number(priceStr).toFixed(2)}`

});

// fastclick
import fastclick from "fastclick";
fastclick.attach(document.body)

// vue-lazyload
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
  error: require('assets/img/tabbar/home.png'),
  loading: require('assets/img/tabbar/home_active.png'),
  
})


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
