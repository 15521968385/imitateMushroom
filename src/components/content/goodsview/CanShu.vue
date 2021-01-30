<template>
  <div class="canshu" :style="{backgroundColor:bgc}">
    <p class="title">参数详情</p>
    <div class="canshu_img">
      <img
        src="https://s11.mogucdn.com/mlcdn/c45406/210111_0cj866clfibe48lg22e1cc09352bg_650x450.jpg_468x468.webp"
        alt
      />
    </div>
    <div class="content" v-for="(item) in canshu" :key="item.id">
      <span>{{item.title}}</span>
      <span>{{item.canshu_content}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "CanShu",
  props: {
    bgc: {
      type: String
    },
    canshu: {
      type: Array
    }
  }
};
</script>

<style lang="less" scoped>
.canshu {
  padding: 10px;
  .title {
    text-align: center;
    font-size: 14px;
    color: gray;
  }
  .content {
    display: flex;
    font-size: 12px;
    padding: 10px;
    span:first-child {
      flex: 1;
    }
    span:last-child {
      flex: 3;
      color: palevioletred;
    }
  }
  .canshu_img {
    img {
      width: 100%;
    }
  }
}
</style>