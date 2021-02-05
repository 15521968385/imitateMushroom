<template>
  <div class="goods_view">
    <!-- navbar -->
    <nav-bar bgc="yellow">
      <template #left>
        <go-back class="go-back">
          <template>
            <img src="~assets/img/goback/goback.png" alt />
          </template>
        </go-back>
      </template>
      <template #center>
        <div class="center">
          <span
            v-for="(item,index) in nav.navCenterText"
            :key="item"
            :class="{nav_color:nav.curCenterText==index}"
            @click="navItemClick(index)"
          >{{item}}</span>
        </div>
      </template>
      <template #right>
        <go-cart></go-cart>
      </template>
    </nav-bar>
    <!-- scroll -->
    <better-scroll-view
      class="better-scroll-view"
      ref="scroll"
      :probeType="3"
      :pullUpLoad="true"
      @scroll="bScroll"
    >
      <template>
        <!-- swiper -->
        <van-swipe class="my-swipe" :loop="false" indicator-color="white" lazy-render ref="swipe">
          <van-swipe-item v-for="(item,index) in goods.banner" :key="index">
            <img :src="item.img" @load="bannerImgLoad" />
          </van-swipe-item>
        </van-swipe>
        <!-- 基本信息 -->
        <base-info :baseInfo="goods.baseInfo" class="base-info" bgc="white" ref="baseInfo"></base-info>
        <!-- 服务弹出层控制 -->
        <van-cell class="fuwu-cell" is-link @click="goods.fuwuShow=true">
          <span v-for="(item) in goods.service" :key="item.id">
            <img src="~assets/img/icon/yes.png" alt />
            {{item.title}}
          </span>
        </van-cell>
        <!-- 规格弹出层控制 -->
        <van-cell class="guige-cell" is-link @click="goods.guigeShow=true">
          <p v-if="goods.color.length!=0">请选择：颜色 尺码</p>
          <p v-else>请选择：规格</p>
        </van-cell>

        <!-- 评论弹出层控制 -->
        <van-cell class="pingjia-cell" is-link>
          <p>
            <span>买家评价:{{goods.pinglun.length}}</span>
            <span>销量:{{xiaoliang}}</span>
          </p>
          <div class="pinglun-categroy">
            <span
              v-for="(item) in goods.pinglunCategroy"
              :key="item.id"
            >{{item.title}}({{pinglunCategroyLength(item.pingluncate_id)}})</span>
          </div>
        </van-cell>
        <!-- 图文 -->
        <img-show class="img-show" :imgs="goods.banner" bgc="white" ref="imgShow"></img-show>
        <!-- 参数 -->
        <can-shu bgc="white" :canshu="goods.canshu" class="canshu" ref="canShu"></can-shu>
        <!-- 推荐 -->
        <goods-com :column="3" class="goods_com" ref="tuiJian">
          <template>
            <goods-com-item
              v-for="item in goods.tuijian"
              :key="item.id"
              class="goods_com_item"
              @click.native="itemC(item)"
            >
              <template #gimg>
                <img :src="item.img" @load="tuijianImgLoad" alt />
              </template>
              <template #gname>
                <p>{{item.gname}}</p>
              </template>
              <template #price>
                <p>{{item.prices | priceFilter}}</p>
              </template>
            </goods-com-item>
          </template>
        </goods-com>
      </template>
    </better-scroll-view>
    <!-- 服务弹出层 -->
    <van-popup class="fuwu-popup" v-model="goods.fuwuShow" position="bottom">
      <p>服务说明</p>
      <div v-for="(item) in goods.service" :key="item.id">
        <p>{{item.title}}</p>
        <p>{{item.context}}</p>
      </div>
    </van-popup>
    <!-- 规格弹出层 -->
    <van-popup class="guige-popup" v-model="goods.guigeShow" position="bottom">
      <div class="top">
        <img :src="curGood.img" alt />
        <p class="price">{{zhePirce|priceFilter}}</p>
        <p>库存：{{curGood.kucun}}件</p>
        <p>销量：{{curGood.xiaoliang}}件</p>
        <p>已选择：{{curGoodStr}}</p>
      </div>
      <div class="content" v-if="goods.color.length!=0">
        <p class="title">颜色</p>
        <p>
          <span
            v-for="(item,index) in goods.color"
            :class="{'cur-color':index==goods.curColor}"
            :key="item.id"
            @click="goods.curColor=index"
          >{{item.color}}</span>
        </p>
      </div>
      <div class="content" v-if="goods.size.length!=0">
        <p class="title">尺码</p>
        <p>
          <span
            v-for="(item,index) in goods.size"
            :class="{'cur-color':index==goods.curSize}"
            :key="item.id"
            @click="goods.curSize=index"
          >{{item.size}}</span>
        </p>
      </div>
      <div class="content" v-if="goods.guige.length!=0">
        <p class="title">规格</p>
        <p>
          <span
            v-for="(item,index) in goods.guige"
            :key="item.id"
            :class="{'cur-color':index==goods.curGuige}"
            @click="goods.curGuige=index"
          >{{item.title}}</span>
        </p>
      </div>

      <div class="content">
        <p class="title">数量</p>
        <van-stepper v-model="goods.curNum" />
      </div>
      <van-goods-action>
        <van-goods-action-button type="warning" text="加入购物车" @click.native="addCart" />
        <van-goods-action-button type="danger" text="立即购买" />
      </van-goods-action>
    </van-popup>
    <!-- 底部 -->
    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服" />
      <van-goods-action-icon icon="cart-o" text="购物车" />
      <van-goods-action-icon icon="shop-o" text="店铺" />
      <van-goods-action-button type="warning" text="加入购物车" @click.native="goods.guigeShow=true" />
      <van-goods-action-button type="danger" text="立即购买" />
    </van-goods-action>
    <go-top class="go-top" v-show="isTop" @click.native="goTop"></go-top>
  </div>
</template>

<script>
import GoBack from "components/common/goback/GoBack";
import NavBar from "components/common/navbar/NavBar";
import BetterScrollView from "components/common/scrollview/BetterScrollView";
import BaseInfo from "components/content/goodsview/BaseInfo";
import ImgShow from "components/content/goodsview/ImgShow";
import CanShu from "components/content/goodsview/CanShu";
import GoodsCom from "components/common/goodsview/GoodsView";
import GoodsComItem from "components/common/goodsview/GoodsViewItem";
import GoCart from "components/common/gocart/GoCart"
import { goTop } from "common/mixin";

// 防抖
import { debounce } from "common/util";
export default {
  name: "GoodsView",
  data() {
    return {
      nav: {
        navCenterText: ["商品", "图文", "参数", "推荐"],
        curCenterText: 0
      },
      goods: {
        banner: [],
        baseInfo: {},
        fuwuShow: false,
        service: [],
        guigeShow: false,
        color: [],
        curColor: 0,
        size: [],
        curSize: 0,
        guige: [],
        curGuige: 0,
        curNum: 1,
        pinglunCategroy: [],
        pinglun: [],
        canshu: [],

        tuijian: []
      },
      swipe: {
        offsetTop: 0
      },
      imgShow: {
        offsetTop: 0
      },
      canshu: {
        offsetTop: 0
      },
      tuijian: {
        offsetTop: 0
      },
      // 防抖函数包装后的函数
      refresh: null,
      // scroll
      scroll: null,
      flag: false
    };
  },
  mixins: [goTop],
  computed: {
    curGood() {
      // 注意转成对象
      if (this.goods.color.length != 0) {
        return Object(this.goods.color[this.goods.curColor]);
      } else {
        return Object(this.goods.guige[this.goods.curGuige]);
      }
    },
    curGoodStr() {
      if (this.goods.color.length != 0) {
        return (
          Object(this.goods.color[this.goods.curColor]).color +
          "/" +
          Object(this.goods.size[this.goods.curSize]).size
        );
      } else {
        return Object(this.goods.guige[this.goods.curGuige]).title;
      }
    },
    xiaoliang() {
      let xiaoliang = 0;
      if (this.goods.color.length != 0) {
        for (let item of this.goods.color) {
          xiaoliang += item.xiaoliang;
        }
      } else {
        for (let item of this.goods.guige) {
          xiaoliang += item.xiaoliang;
        }
      }

      return xiaoliang;
    },
    pinglunCategroyLength(categroy_id) {
      return categroy_id => {
        return this.goods.pinglun.filter((item, index) => {
          return item.pinglun_categroy_id == categroy_id;
        }).length;
      };
    },
    zhePirce() {
      return this.goods.baseInfo.price * this.goods.baseInfo.discount * 0.1;
    },
    
  },
  methods: {
    getData() {
      this.request({
        url: "/querygooddata",
        method: "get",
        params: {
          good_id: this.$route.params.good_id,
          categroybase_id: this.$route.query.categroy_base_id,
          
        }
      }).then(
        res => {
          // console.log(res);
          this.goods.banner = res.banner;
          this.goods.baseInfo = res.baseinfo[0];
          this.goods.service = res.service;
          this.goods.color = res.color;
          this.goods.size = res.size;
          this.goods.pinglunCategroy = res.pinglun_categroy;

          this.goods.pinglun = res.pinglun;

          this.goods.canshu = res.canshu;
          this.goods.tuijian = res.tuijian;
          this.goods.guige = res.guige;
        },
        err => {
          throw err;
        }
      );
    },
    navItemClick(index) {
      this.nav.curCenterText = index;
      if (this.nav.curCenterText === 0) {
        this.scroll.go(0, -this.swipe.offsetTop, 100);
      } else if (this.nav.curCenterText === 1) {
        this.scroll.go(0, -this.imgShow.offsetTop, 100);
      } else if (this.nav.curCenterText === 2) {
        this.scroll.go(0, -this.canshu.offsetTop, 100);
      } else if (this.nav.curCenterText === 3) {
        this.scroll.go(0, -this.tuijian.offsetTop, 100);
      }
    },
    bannerImgLoad() {
      this.refresh();
      this.imgShow.offsetTop = this.$refs.imgShow.$el.offsetTop;
    },
    tuijianImgLoad() {
      this.refresh();
    },
    bScroll(option) {
      // console.log(option);
      if (
        option.y <= -this.swipe.offsetTop &&
        option.y > -this.imgShow.offsetTop
      ) {
        this.nav.curCenterText = 0;
      } else if (
        option.y <= -this.imgShow.offsetTop &&
        option.y > -this.canshu.offsetTop
      ) {
        this.nav.curCenterText = 1;
      } else if (
        option.y <= -this.canshu.offsetTop &&
        option.y > -this.tuijian.offsetTop
      ) {
        this.nav.curCenterText = 2;
      } else if (option.y <= -this.tuijian.offsetTop) {
        this.nav.curCenterText = 3;
      }

      this.showTop(option.y, -1000);
    },
    addCart() {
      this.request({
        url: "/addcart",
        method: "post",
        data: {
          
          name: this.goods.baseInfo.gname,
          select: this.curGoodStr,
          price: this.zhePirce,
          num: this.goods.curNum,
          img: this.curGood.img,
          checked: 1,
          goods_id: this.goods.baseInfo.id,
          categroy_base_id:this.goods.baseInfo.categroy_base_id
        }
      }).then(
        res => {
          this.$toast("添加成功");
        },
        err => {
          throw err;
        }
      );
    },
    showImgLoad() {
      this.canshu.offsetTop = this.$refs.canShu.$el.offsetTop;
      this.tuijian.offsetTop = this.$refs.tuiJian.$el.offsetTop;
    },
    itemC(item) {
      this.$router.replace({
        path: `/goods/${item.id}`,
        query: {
          categroy_base_id: item.categroy_base_id,
          
        }
      });
      this.getData();
      this.$refs.scroll.go(0,0,1)

    },
    
  },

  components: {
    NavBar,
    GoBack,
    BetterScrollView,
    BaseInfo,
    ImgShow,
    CanShu,
    GoodsCom,
    GoodsComItem,
    GoCart
  },
  created() {
    this.getData()
  },
  mounted() {
    // // $refs元素一般到mounted生命周期函数中拿
    const refresh = debounce(this.$refs.scroll.brefresh, 300);
    this.refresh = refresh;

    const showImgLoad = debounce(this.showImgLoad, 300);
    this.showImgLoad = showImgLoad;

    this.scroll = this.$refs.scroll;

    this.$bus.$on("showImgLoad", () => {
      // console.log(111);
      // 判断this.$refs.canShu而不是判断this.$refs.canShu.$el存不存在
      if (this.$refs.canShu && this.$refs.tuiJian) {
        this.$nextTick(() => {
          this.showImgLoad();
        });
      }

      this.refresh();
    });

    this.swipe.offsetTop = this.$refs.swipe.$el.offsetTop;
    // console.log(this.$refs.canShu.$el);
  }
};
</script>

<style lang="less" scoped>
.goods_view {
  height: 100vh;
  padding-top: 44px;
}
.center {
  display: flex;
  font-size: 14px;

  span {
    flex: 1;
  }
}

.nav_color {
  color: red;
}

.my-swipe {
  .van-swipe-item {
    color: #fff;
    font-size: 20px;

    display: flex;
    justify-content: center;

    img {
      width: 80%;
    }
  }
}

.fuwu-cell {
  padding: 5px;
  font-size: 12px;
  margin-bottom: 5px;
  span {
    display: inline-block;
    padding: 0 14px;
    position: relative;

    img {
      width: 14px;
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}

.fuwu-popup {
  padding: 5px;
  > p {
    text-align: center;
    color: gray;
  }
  > div {
    font-size: 12px;
    padding: 10px 5px;
    border-bottom: 1px solid #eee;
    p:last-child {
      color: #ccc;
    }
  }
}

.guige-cell {
  padding: 5px;
  margin-bottom: 5px;
}

.guige-popup {
  padding: 5px 5px 50px 5px;
  overflow: visible;
  .top {
    padding: 10px 10px 10px 100px;
    font-size: 14px;
    color: gray;
    position: relative;
    img {
      width: 90px;
      position: absolute;
      left: 10px;
      bottom: 10px;
    }
    p {
      padding-left: 10px;
    }
    .price {
      font-size: 24px;
    }
  }
  .content {
    padding: 10px;
    font-size: 14px;
    clear: both;
    .title {
      color: gray;
      margin-bottom: 5px;
    }
    span {
      border: 1px solid #ccc;
      padding: 3px;
      margin-right: 10px;
      margin-bottom: 5px;
      float: left;
    }
    .cur-color {
      color: red;
      border: 1px solid red;
    }
  }
}

.pingjia-cell {
  padding: 5px;
  margin-bottom: 5px;
  p {
    span {
      color: gray;
      margin-right: 20px;
    }
  }
  .pinglun-categroy {
    padding: 5px 0;
    span {
      background-color: #ffe8ee;
      margin: 5px 5px 0 0;
      color: #f25;
      float: left;
    }
  }
}

.better-scroll-view {
  height: calc(100% - 44px);
}

.img-show {
  margin-bottom: 5px;
}

.canshu {
  margin-bottom: 5px;
}

.goods_com {
  .goods_com_item {
    img {
      height: 150px;
    }
    p {
      -webkit-line-clamp: 1;
      font-size: 12px;
    }
    .gprice {
      padding: 0;
    }
  }
}
</style>

