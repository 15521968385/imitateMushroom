<template>
  <h1>Profile</h1>
</template>

<script>
export default {
  name: "Profile",
  beforeCreate() {
    console.log("profile---beforeCreate");
  },
  created() {
    console.log("profile---created");
  },
  beforeMount() {
    console.log("profile---beforeMount");
  },
  mounted() {
    console.log("profile---mounted");
  },
  beforeUpdate() {
    console.log("profile---beforeUpdate");
  },
  updated() {
    console.log("profile---updated");
  },
  beforeDestroy() {
    console.log("profile---beforeDestroy");
  },
  destroyed() {
    console.log("profile---destroyed");
  }
};
</script>

<style>
</style>