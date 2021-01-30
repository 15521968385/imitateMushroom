<template>
  <div ref="bscrollview">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  name: "BScrollView",
  data() {
    return {
      bs: null
    };
  },
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    go(x, y, time = 300) {
      this.bs && this.bs.scrollTo(x, y, time);
    },
    finishPullUp() {
      this.bs && this.bs.finishPullUp();
    },
    brefresh() {
      // console.log(111);

      this.bs && this.bs.refresh();
    }
  },
  mounted() {
    // probeType(监听scroll事件,默认0,可选:1/2/3)
    // 0和1不监听scroll事件
    // 2监听手指滑动,不监听惯性
    // 3监听手指和惯性

    // pullUpLoad，上拉到底时触发pullingUp事件(必须有@better-scroll/pull-up,再BScroll.use(Pullup))
    // finishPullUp能多次触发pullingUp事件

    this.bs = new BScroll(this.$refs.bscrollview, {
      click: true,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad
    });
    this.bs.on("pullingUp", () => {
      this.$emit("pullingUp");
    });

    this.bs.on("scroll", option => {
      // console.log(option);
      this.$emit("scroll", option);
    });
  }
};
</script>

<style>
</style>