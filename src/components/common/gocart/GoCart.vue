<template>
  <div class="gocart" @click="goCart">
    <img src="~assets/img/icon/cart.png" alt="">
  </div>
</template>

<script>
export default {
  name: "GoCart",
  methods:{
    goCart(){
      this.$router.push('/cart')
    }
  }
};
</script>

<style>
</style>