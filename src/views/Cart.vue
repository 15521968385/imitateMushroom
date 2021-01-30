<template>
  <div class="cart">
    <nav-bar bgc="pink">
      <template #center>
        <h4>购物车</h4>
      </template>
    </nav-bar>

    <cart-com :cartData="cartData" bgc="white" @deleteCart="deleteCart" @checkAll="checkAll"></cart-com>

    <van-submit-bar :price="price" button-text="提交订单">
      <van-checkbox v-model="selectAll" @click="selectAllClick">全选</van-checkbox>
    </van-submit-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import CartCom from "components/content/cart/CartCom";
export default {
  name: "Cart",
  data() {
    return {
      cartData: [],
      selectAll: false,
      price: 0
    };
  },
  computed: {},
  watch: {},
  methods: {
    cartRequest() {
      return this.request({
        url: "/querycartdata",
        method: "get"
      }).then(
        res => {
          this.cartData = res;
          // console.log(res);

          let price = res
            .filter((item, index, arr) => {
              return item.checked === 1;
            })
            .reduce((total, item) => {
              return total + item.price * item.num;
            }, 0);
          this.price = price * 100;
        },
        err => {
          throw err;
        }
      );
    },
    selectAllRequest() {
      this.request({
        url: "/queryselectall",
        method: "get"
      }).then(
        res => {
          // console.log(res);
          this.selectAll = res[0].select_all;
        },
        err => {
          throw err;
        }
      );
    },
    deleteCart() {
      this.cartRequest();
      this.request({
        url: "/querycartdata",
        method: "get"
      })
        .then(
          res => {
            res = res.every((item, index, arr) => {
              return item.checked == 1;
            });
            return this.request({
              url: "/updateselectall",
              method: "post",
              data: {
                select_all: res
              }
            });
          },
          err => {
            throw err;
          }
        )
        .then(res => {
          console.log(res);
          this.selectAllRequest();
        });
    },
    selectAllClick() {
      // console.log(this.cartData);

      // 1.查询selectAll的状态
      this.request({
        url: "/queryselectall",
        method: "get"
      })
        .then(
          res => {
            // console.log(res);
            let select_all = res[0].select_all;
            // 2.修改selectAll的状态
            return this.request({
              url: "/updateselectall",
              method: "post",
              data: {
                select_all: !select_all
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
            // 3.修改所有checked的状态
            return this.request({
              url: "/updateallcartcheck",
              method: "post",
              data: {
                checked: this.selectAll
              }
            });
          },
          err => {
            console.log(err);
          }
        )
        .then(
          res => {
            // console.log(res);
            this.cartRequest();
          },
          err => {
            throw err;
          }
        );
    },
    checkAll() {
      this.selectAllRequest();
      this.cartRequest();
    }
    // checkClcik(){
    //   this.cartRequest()
    // }
  },
  components: {
    NavBar,
    CartCom
  },
  created() {
    this.cartRequest();
    this.selectAllRequest();
  }
};
</script>

<style lang="less" scoped>
.cart {
  padding-top: 44px;
  padding-bottom: 101px;
}
.van-submit-bar {
  bottom: 51px;
}
</style>