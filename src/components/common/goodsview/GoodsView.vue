<template>
  <div class="goodsview" :style="{backgroundColor:bgc,columnCount:column}">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "GoodsView",
  props:{
    bgc:{
      type:String,
      default:'white'
    },
    column:{
      type:Number
    }
  }
};
</script>

<style lang="less" scoped>
.goodsview {
  column-gap: 0;
}
</style>