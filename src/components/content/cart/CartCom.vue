<template>
  <div class="cartcom">
    <div class="cart_box" v-for="(item) in cartData" :key="item.id" :style="{backgroundColor:bgc}">
      <div class="l">
        <van-checkbox v-model="item.checked" @click="checkClcik(item.id)"></van-checkbox>
      </div>
      <div class="r">
        <van-swipe-cell>
          <van-card
            :num="item.num"
            :price="item.prices"
            :desc="item.select"
            :title="item.name"
            :thumb="item.img"
          />
          <template #right>
            <van-button square type="danger" text="删除" @click="deleteCart(item.id)" />
          </template>
        </van-swipe-cell>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CartCom",
  data() {
    return {
      checked: false
    };
  },
  props: {
    cartData: {
      type: Array
    },
    bgc: {
      type: String
    }
  },
  methods: {
    // 找到对应的cart数据，在对对应的cart数据做更改
    checkClcik(id) {
      // 1找到对应的cart数据
      // console.log(id);
      
      this.request({
        url: `/querycartdatabyid/${id}`,
        method: "get"
      })
        .then(
          res => {
            let checked = res[0].checked;
            // console.log(checked);

            // 2在对对应的cart数据做更改
            return this.request({
              url: `/updatecartcheck/${id}`,
              method: "post",
              data: {
                checked: !checked
              }
            });
          },
          err => {
            throw err;
          }
        )
        .then(
          res => {
            // console.log(res);
            return this.request({
              url: "/querycartdata",
              method: "get"
            });
          },
          err => {
            throw err;
          }
        )
        .then(
          res => {
            // console.log(res);

            let select_all = res.every((item, index, arr) => {
              return item.checked != 0;
            });
            return this.request({
              url: "/updateselectall",
              method: "post",
              data: {
                select_all
              }
            });
          },
          err => {
            throw err;
          }
        )
        .then(
          res => {
            // console.log(res);
            this.$emit("checkAll");
          },
          err => {
            console.log(err);
          }
        );
    },
    deleteCart(id) {
      this.request({
        url: `/deletecartdatabyid/${id}`,
        method: "get"
      }).then(
        res => {
          this.$toast("删除成功");
          this.$emit("deleteCart");
        },
        err => {
          throw err;
        }
      );
    }
  }
};
</script>

<style lang="less" scoped>
.cartcom {
  padding: 5px;

  .cart_box {
    display: flex;
    align-items: center;
    border-radius: 5px;
    margin-top: 5px;
  }
}

.van-button {
  height: 100%;
}
</style>