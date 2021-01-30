<template>
  <div class="home">
    <!-- navbar -->
    <nav-bar bgc="pink" color="white">
      <template #center>
        <h4>妙妙屋</h4>
      </template>
    </nav-bar>
    <!-- 吸顶小技巧 -->
    <categroy-bar-base
      class="categroy-bar-base"
      :categroybases="categroyBarBase.categroyBarBaseData"
      bgc="yellow"
      @baseClick="baseClick"
      ref="catebase1"
      v-show="catebaseisShow"
    ></categroy-bar-base>
    <better-scroll-view
      class="better-scroll-view"
      ref="scroll"
      :probeType="3"
      :pullUpLoad="true"
      @scroll="contentScroll"
      @pullingUp="loadMore"
    >
      <!-- swiper -->
      <van-swipe class="my-swipe" :autoplay="1000" indicator-color="white" lazy-render>
        <van-swipe-item
          v-for="(item,index) in banners.bannerData"
          :key="index"
          @click="jump(index)"
        >
          <img :src="item.img" @load="bannerImgLoad" />
        </van-swipe-item>
      </van-swipe>
      <!-- 分类导航 -->
      <categroy-bar color="green" bgc="white">
        <template>
          <categroy-bar-item v-for="(item,index) in categroyBar.categroyBarData" :key="index">
            <template #img>
              <img v-lazy="item.img" alt @load="categroyLoad"   />
            </template>
            <template #text>
              <p>{{item.text}}</p>
            </template>
          </categroy-bar-item>
        </template>
      </categroy-bar>
      <!-- 普通分类导航条 -->

      <categroy-bar-base
        class="categroy-bar-base"
        :categroybases="categroyBarBase.categroyBarBaseData"
        bgc="pink"
        @baseClick="baseClick"
        ref="catebase2"
      ></categroy-bar-base>

      <!-- 商品展示(感觉应该是有3个goods-view-item，然后通过v-show控制显示和隐藏) -->
      <goods-view bgc="white" :column="2">
        <template>
          <goods-view-item
            class="goods-view-item"
            v-for="(item,index) in goods[curgoodcategroy]"
            :key="index"
            @click.native="itemC(item)"
          >
            <template #gimg>
              <img v-lazy="item.img" alt @load="goodsImgLoad" />
            </template>
            <template #gname>
              <p>{{item.gname}}</p>
            </template>
            <template #price>
              <span>{{item.prices|priceFilter}}</span>
            </template>
            <template #zan>
              <span>
                <img src="~assets/img/icon/zan.png" alt />
                {{item.zan}}
              </span>
            </template>
          </goods-view-item>
        </template>
      </goods-view>
    </better-scroll-view>
    <go-top class="go-top" @click.native="goTop" v-show="isTop"></go-top>
  </div>
</template>

<script>
// 自定义组件相关
import NavBar from "components/common/navbar/NavBar";
import CategroyBar from "components/common/categroybar/CategroyBar";
import CategroyBarItem from "components/common/categroybar/CategroyBarItem";
import CategroyBarBase from "components/common/categroybar_base/CategroyBarBase";
import GoodsView from "components/common/goodsview/GoodsView";
import GoodsViewItem from "components/common/goodsview/GoodsViewItem";
import BetterScrollView from "components/common/scrollview/BetterScrollView";

import {goTop} from "common/mixin"

// 防抖
import { debounce } from "common/util";

export default {
  name: "Home",
  data() {
    return {
      banners: {
        bannerData: []
      },
      categroyBar: {
        categroyBarData: []
      },
      categroyBarBase: {
        categroyBarBaseData: []
      },
      goods: {
        item1: [],
        item2: [],
        item3: []
      },
      // 默认选择的categroybase
      curgoodcategroy: "item1",
      curgoodcategroyIndex:0,
      // 回到顶部按钮show
      isTop: false,
      // 防抖函数包装后的函数
      refresh: null,
      // catebase的offsettop
      catebaseOffsetTop: 0,
      catebaseisShow: false,
      // 图片加载
      isLoad: false,
      //  保留离开时的位置
      scrollY: 0
    };
  },
  // 混入(属性整合)
  mixins:[goTop],
  methods: {
    // 轮播图item跳转
    jump(index) {
      let path = this.$route.path;
      this.$router.push(`${path}/${index}`);
      // console.log(this.$route);
    },
    // 普通分类实现数据切换($emit)
    baseClick(index) {
      if (index === 0) {
        this.curgoodcategroy = "item1";
      } else if (index === 1) {
        this.curgoodcategroy = "item2";
      } else if (index === 2) {
        this.curgoodcategroy = "item3";
      }

      //baseitem上拉时不受控制
      this.$refs.catebase2.activeIndex = index;
      this.$refs.catebase1.activeIndex = index;
      this.curgoodcategroyIndex=index;
    },
    // 回到顶部
    
    // 监听better-scroll滚动
    contentScroll(option) {
      // console.log(option);
      // 回到顶部按钮显示或隐藏
     this.showTop(option.y,-100)
      // categroybase1是否显示(假装吸顶)
      option.y <= -this.catebaseOffsetTop
        ? (this.catebaseisShow = true)
        : (this.catebaseisShow = false);
    },
    // 上拉加载更多数据
    loadMore() {
      if (this.curgoodcategroy === "item1") {
        this.request({
          url: "/querycategoodsbybase",
          method: "get",
          params: {
            categroy_id: 1,
            start: this.goods.item1.length
          }
        }).then(
          res => {
            this.goods.item1.push(...res);
          },
          err => {
            throw err;
          }
        );
      } else if (this.curgoodcategroy === "item2") {
        this.request({
          url: "/querycategoodsbybase",
          method: "get",
          params: {
            categroy_id: 2,
            start: this.goods.item2.length
          }
        }).then(
          res => {
            this.goods.item2.push(...res);
          },
          err => {
            throw err;
          }
        );
      } else if (this.curgoodcategroy === "item3") {
        this.request({
          url: "/querycategoodsbybase",
          method: "get",
          params: {
            categroy_id: 3,
            start: this.goods.item3.length
          }
        }).then(
          res => {
            this.goods.item3.push(...res);
          },
          err => {
            throw err;
          }
        );
      }

      //监听每一次上拉
      this.$refs.scroll && this.$refs.scroll.finishPullUp();
    },
    // 商品图片加载完成后重新计算可滚动高度
    goodsImgLoad() {
      this.refresh();
    },
    // banner图片加载完成后重新计算catebase的offsettop
    bannerImgLoad() {
      if (!this.isLoad) {
        this.catebaseOffsetTop = this.$refs.catebase2.$el.offsetTop;
        this.isLoad = true;
      }
      this.refresh();
    },
    categroyLoad() {
      this.refresh();
    },
    // 跳转至商品详情页
    itemC(item) {
      this.$router.push({
        path:`goods/${item.id}`,
        query:{
          categroy_base_id:this.curgoodcategroyIndex+1
        }
      });
    }
  },
  components: {
    NavBar,
    CategroyBar,
    CategroyBarItem,
    CategroyBarBase,
    GoodsView,
    GoodsViewItem,
    BetterScrollView,
   
  },
  created() {
    this.request({
      url: "/queryhomedatas",
      method: "get"
    }).then(res => {
      // console.log(res);
      this.banners.bannerData = res.banner;
      this.categroyBar.categroyBarData = res.categroy;
      this.categroyBarBase.categroyBarBaseData = res.categroy_base_title;
      this.goods.item1 = res.categroy_base_item1;
      this.goods.item2 = res.categroy_base_item2;
      this.goods.item3 = res.categroy_base_item3;
    });
  },
  mounted() {
    // // $refs元素一般到mounted生命周期函数中拿
    const refresh = debounce(this.$refs.scroll.brefresh, 300);
    this.refresh = refresh;

    // console.log(this.$refs.scroll.bs);
  },
  // 进入当前路由
  activated() {
    // 回到离开前的位置
    this.$refs.scroll.go(0, this.scrollY, 0);
  },
  // 离开当前路由
  deactivated() {
    // 记录离开前的位置
    this.scrollY = this.$refs.scroll.bs.y;
  }
};
</script>

<style lang="less" scoped>
.home {
  padding-top: 44px;
  height: 100vh;
  position: relative;
}
.center {
  h4 {
    width: 100%;
  }
}
.my-swipe {
  margin-bottom: 5px;
  .van-swipe-item {
    color: #fff;
    font-size: 20px;
    text-align: center;
    background-color: #39a9ed;

    img {
      width: 100%;
    }
  }
}

.better-scroll-view {
  width: 100%;
  position: absolute;
  top: 44px;
  bottom: 51px;
  overflow: hidden;
}



.categroy-bar-base {
  position: relative;
  z-index: 999;
}
</style>