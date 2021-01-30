<template>
  <div class="categroybaritem">
    <slot name="img"></slot>
    <slot name="text"></slot>
  </div>
</template>

<script>
export default {
  name: "CategroyBarItem",
  props: {}
};
</script>

<style lang="less" scoped>
.categroybaritem {
  text-align: center;
  flex: 20%;
  img {
    width: 48px;
    vertical-align: middle;
  }
}
</style>