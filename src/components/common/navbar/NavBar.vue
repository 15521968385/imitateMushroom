<template>
  <div class="navbar" :style="navbarStyle">
    <div class="left">
      <slot name="left"></slot>
    </div>
    <div class="center">
      <slot name="center"></slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  props: {
    bgc: {
      type: String
    },
    color: {
      type: String
    }
  },
  computed: {
    navbarStyle() {
      return { backgroundColor: this.bgc, color: this.color };
    }
  }
};
</script>

<style lang="less" scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 44px;
  display: flex;
  z-index: 1;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, .2);
  div {
    text-align: center;
    line-height: 44px;
  }
  .left,
  .right {
    width: 44px;
  }
  .center {
    flex: 1;
    
  }
}
</style>