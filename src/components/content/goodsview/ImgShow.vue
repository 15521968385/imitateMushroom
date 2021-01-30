<template>
  <div class="imgshow" :style="{backgroundColor:bgc}">
    <p>图文详情</p>
    <div v-for="item in imgs" :key="item.id">
      <img :src="item.img" alt @load="imgLoad" />
    </div>
  </div>
</template>

<script>
export default {
  name: "ImgShow",
  props: {
    imgs: {
      type: Array
    },
    bgc: {
      type: String
    }
  },
  methods: {
    imgLoad() {
      
        this.$bus.$emit("showImgLoad");
      
    }
  }
};
</script>

<style lang="less" scoped>
.imgshow {
  text-align: center;
  p {
    font-size: 14px;
    color: gray;
  }
  img {
    width: 100%;
  }
}
</style>