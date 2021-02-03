<template>
  <div class="goback" @click="goBack" :style="{backgroundColor:bgc}">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "GoBack",
  props:{
    bgc:String
  },
  methods:{
    goBack(){
      this.$router.go(-1)
    }
  }
};
</script>

<style>
</style>