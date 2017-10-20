<template>
  <div class="cartcontrol">
      
      <transition  name="move">
          <div class="cart-decrease " v-show="foodItem.count>0" @click="decreaseCount">
              <span class="inner icon-remove_circle_outline"></span>
          </div>
      </transition>
      <div class="cart-count" v-show="foodItem.count>0">{{foodItem.count}}</div>
      <div class="cart-add  icon-add_circle" @click="addCount"></div>
  </div>
</template>
<script>
// import Vue from "vue";
export default {
  props: {
    food: {
      type: Object
    }
  },
  created() {
    // console.log(this.food);
  },
  data() {
    return {
      foodItem: {
        food: this.food,
        count: 0
      }
    };
  },
  methods: {
    addCount() {
      this.foodItem.count++;
      this.$emit("addFood", this.foodItem);
    },
    decreaseCount() {
      this.foodItem.count--;
      this.$emit("decreaseFood", this.foodItem);
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../common/scss/icon.scss";

.cartcontrol {
  font-size: 0;
  .cart-decrease,
  .cart-count,
  .cart-add {
    display: inline-block;
  }
  .cart-decrease {
    padding: 0.12rem;
    opacity: 1;
    transform: translate3d(0, 0, 0);
    .inner {
      font-size: 0.48rem;
      line-height: 0.48rem;
      color: rgb(0, 160, 220);
      transition: all 0.4s linear;
      transform: rotate(0);
    }
    &.move-enter-active,
    &.move-leave-active {
      transition: all 0.4s linear;
    }
    &.move-enter,
    &.move-leave-to {
      opacity: 0;
      transform: translate3d(0.48rem, 0, 0);
      .inner {
        transform: rotate(180deg);
      }
    }
  }

  .cart-add {
    padding: 0.12rem;
    font-size: 0.48rem;
    line-height: 0.48rem;
    color: rgb(0, 160, 220);
  }
  .cart-count {
    line-height: 0.48rem;
    padding: 0.12rem;
    color: rgb(147, 153, 159);
    font-size: 0.2rem;
    vertical-align: top;
    width: 0.12rem;
    text-align: center;
  }
  .cart-decrease {
  }
}
</style>
