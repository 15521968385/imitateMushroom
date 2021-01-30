<template>
  <div class="tabbar" :style="{backgroundColor:bgc}">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "TabBar",
  props: {
    item_active: {
      type: String,
      default: "red"
    },
    bgc: {
      type: String
    }
  }
};
</script>

<style lang="less" scoped>
.tabbar {
  display: flex;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  font-size: 14px;

  background-color: rgba(0, 0, 0, 0.1);
  box-shadow: 0px -2px 2px rgba(0, 0, 0, 0.2);
}
</style>