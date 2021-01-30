<template>
  <div class="baseinfo" :style="{backgroundColor:bgc}">
    <div class="top">
      <p class="price">{{zhePirce|priceFilter}}</p>
      <div class="zhe">
        <span>
          <s>{{baseInfo.price|priceFilter}}</s>
        </span>
        <span>{{baseInfo.discount}}折</span>
      </div>
    </div>
    <div class="center">
      <p class="gname">{{baseInfo.gname}}</p>
      <span class="help">
        <img src="~assets/img/icon/search.png" alt="">
        帮我选
        </span>
    </div>
    <div class="bottom">
      <span v-if="baseInfo.express===0">免运费</span>
      <span v-else class="express">运费：{{Number(baseInfo.express).toFixed(2)}}</span>

      <span class="addr">{{baseInfo.addr}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "BaseInfo",
  data() {
    return {};
  },
  props: {
    baseInfo: {
      type: Object
    },
    bgc:{
      type:String
    }
  },
  computed: {
    zhePirce() {
      return this.baseInfo.price * this.baseInfo.discount * 0.1;
    }
  }
};
</script>

<style lang="less" scoped>
.baseinfo{
  margin-bottom: 5px;
}
.top {
  display: flex;
  .price {
    padding: 0 10px;
    font-size: 20px;
    line-height: 40px;
  }
  .zhe {
    display: flex;
    flex-direction: column;
    span {
      flex: 1;
      line-height: 20px;
      font-size: 12px;
      text-align: center;
    }
    span:first-child {
      color: gray;
    }
    span:last-child {
      color: red;
      background-color: salmon;
    }
  }
}

.center {
  display: flex;
  padding: 0 5px;
  .help {
    width: 50px;
    line-height: 42px;
    font-size: 12px;
    color: gray;
    text-align: right;
    position: relative;
    img{
      width: 12px;
      position: absolute;
      top: 50%;
      left: 0;
      transform: translateY(-50%);
    }
  }
  .gname {
    flex: 1;
    font-size: 15px;
  }
}

.bottom {
  display: flex;
  padding: 5px;
  span {
    font-size: 12px;
    color: gray;
    flex: 1;
  }
  .addr {
    text-align: right;
  }
  .express {
    text-align: left;
  }
}
</style>