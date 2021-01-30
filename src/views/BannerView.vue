<template>
  <div class="bannerview">
    <go-back class="go-back">
      <template>
        <img src="~assets/img/goback/goback.png" alt />
      </template>
    </go-back>
    <better-scroll-view class="better-scroll-view" ref="scroll" @scroll="bScroll" :probeType="3">
      <template>
        <div class="item" v-for="(item,index) in bannerItem" :key="index">
          <img v-lazy="item.img" @load="imgLoad" alt />
        </div>
      </template>
    </better-scroll-view>
    <go-top v-show="isTop" @click.native="goTop"></go-top>
  </div>
</template>

<script>
import GoBack from "components/common/goback/GoBack";
import BetterScrollView from "components/common/scrollview/BetterScrollView";
import { goTop } from "common/mixin";
// 防抖
import { debounce } from "common/util";
export default {
  name: "BannerView",
  data() {
    return {
      bannerItem: [],
      refresh: null
    };
  },
  mixins: [goTop],
  methods: {
    imgLoad() {
      // this.$refs.scroll.brefresh();
      this.refresh();
    },
    bScroll(option) {
      this.showTop(option.y, -200)
    }
  },
  computed: {
    bannerId() {
      return Number(this.$route.params.banner_item) + 1;
    }
  },
  created() {
    this.request({
      url: "/querybanneritem",
      method: "get",
      params: {
        banner_id: this.bannerId
      }
    }).then(res => {
      this.bannerItem = res;
    });
  },
  components: {
    BetterScrollView,
    GoBack
  },
  mounted() {
    console.log(this.$refs.scroll.bs);
    // // $refs元素一般到mounted生命周期函数中拿
    const refresh = debounce(this.$refs.scroll.brefresh, 300);
    this.refresh = refresh;
  }
};
</script>

<style lang="less" scoped>
.bannerview {
  position: relative;
  height: 100vh;
  .better-scroll-view {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
  }
  .item {
    img {
      width: 100%;
      vertical-align: middle;
    }
  }
}

.go-back {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
}
</style>