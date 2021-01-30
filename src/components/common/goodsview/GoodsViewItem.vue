<template>
  <div class="goodsviewitem">
    <slot name="gimg"></slot>

    <div class="gname">
      <slot name="gname"></slot>
    </div>
    <div class="gprice">
      <slot name="price"></slot>

      <slot name="zan"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsViewItem",
  props: {}
};
</script>

<style lang="less" scoped>
.goodsviewitem {
  padding: 5px;
  // 解决item内部布局混乱
  break-inside: avoid;

  img {
    border-radius: 5%;
    width: 100%;
  }

  .gname {
    p {
      font-size: 14px;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      word-break: break-all;
      color: #333;
    }
  }
  .gprice {
    display: flex;
    
    span {
      flex: 1;
      display: flex; //flex布局
      align-items: center; //使子项目垂直居中
    }
    span:last-child {
      justify-content: flex-end;
      font-size: 12px;
      color: red;
      img {
        width: 20px;
      }
    }
  }
}
</style>