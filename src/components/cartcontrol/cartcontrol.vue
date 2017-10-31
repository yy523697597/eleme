/*
 * @Author: yuyi 
 * @Date: 2017-10-24 16:43:55 
 * @Last Modified by: yuyi
 * @Last Modified time: 2017-10-25 15:28:44
 */
<template>
  <div class="cartcontrol">
      
      <transition  name="move">
          <div class="cart-decrease " v-show="food.count>0" @click.stop.prevent="decreaseCount">
              <span class="inner icon-remove_circle_outline"></span>
          </div>
      </transition>
      <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
      <div class="cart-add  icon-add_circle" @click.stop.prevent="addCount"></div>
  </div>
</template>
<script>
import Vue from "vue";
export default {
  props: {
    food: {
      type: Object
    }
  },
  methods: {
    addCount(event) {
      if (!this.food.count) {
        // 使用Vue.set去给data中的对象添加不存在的属性
        Vue.set(this.food, "count", 1);
      } else {
        this.food.count++;
      }
      this.$emit("add", event.target);
    },
    decreaseCount() {
      if (this.food.count) {
        this.food.count--;
      }
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
      display: inline-block;
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
}
</style>
