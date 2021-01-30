<template>
  <div class="categroybar" :style='{backgroundColor:bgc,color}'>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "CategroyBar",
  props: {
    bgc: {
      type: String
    },
    color:{
      type: String
    }
  }
};
</script>

<style lang="less" scoped>
.categroybar {
  display: flex;
  font-size: 14px;
  border-bottom: 1px solid #eee;
  flex-wrap: wrap;
}
</style>