<template>
  <transition name="slide-fade">
    <div class="food" v-show="showFlag" ref="foodItem">
      <div class="food-content">
        <div class="img-header">
            <img :src="food.image" >
            <div class="back">
             <span @click="hide">返回</span>
            </div>
        </div>
        <div class="content">
          <h1 class="title">{{food.name}}</h1>
          <div class="detail">
            <span class="sell-count">月售{{food.sellCount}}份</span>
            <span class="rating">好评率{{food.rating}}%</span>
          </div>
          <div class="price">
            <span class="now-price">￥{{food.price}}</span>
            <span class="old-price">￥{{food.oldPrice}}</span>
          </div>
         <div class="cartcontrol-wrapper">
            <cartcontrol :food="food"></cartcontrol>
         </div> 
         <transition name="fade">
            <div class="buy" v-show="!food.count||food.count === 0" @click.stop.prevent="addFirst">加入购物车</div>
          </transition>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import Vue from "vue";
// 导入better-scroll
import BScroll from "better-scroll";
// 导入购物车控制组件
import Cartcontrol from "components/cartcontrol/cartcontrol";

export default {
  props: {
    food: {
      type: Object
    }
  },
  created() {},
  data() {
    return {
      showFlag: false
    };
  },
  methods: {
    // 显示商品详情
    show() {
      this.showFlag = true;
      // 初始化better-scroll,避免出现浏览器的滚动条
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.foodItem, {
            click: true
          });
        } else {
          this.scroll.refresh();
        }
      });
    },
    // 关闭商品详情
    hide() {
      this.showFlag = false;
    },
    // 点击加入购物车
    addFirst() {
      Vue.set(this.food, "count", 1);
    }
  },
  components: {
    Cartcontrol
  }
};
</script>
<style lang="scss" scoped>
@import "../../common/scss/mixin.scss";

.food {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0.96rem;
  // 小于mask层
  z-index: 30;
  width: 100%;
  background-color: #fff;
  opacity: 1;
  .img-header {
    position: relative;
    width: 100%;
    // 让img宽度和高度都自适应为方形的方法
    height: 0;
    padding-bottom: 100%;
    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
    .back {
      position: absolute;
      top: 0.2rem;
      left: 0.2rem;
      height: 0.4rem;
      width: 0.8rem;
      padding: 0.1rem;
      span {
        padding: 0 0.15rem;
        border: 1px solid rgba(255, 255, 255, 0.5);
        border-radius: 0.2rem;
        text-align: center;
        display: block;
        height: 0.4rem;
        line-height: 0.4rem;
        font-size: 0.2rem;
        color: #fff;
      }
    }
  }
  .content {
    padding: 0.36rem;
    @include border-1px(rgba(7,17,27,0.1));
    .title {
      font-size: 0.28rem;
      font-weight: 700;
      line-height: 0.28rem;
      color: rgb(7, 17, 27);
      margin-bottom: 0.18rem;
    }
    .detail {
      color: rgb(147, 153, 159);
      font-size: 0;
      line-height: 0.2rem;
      margin-bottom: 0.36rem;
      .sell-count {
        font-size: 0.2rem;
        margin-right: 0.24rem;
      }
      .rating {
        font-size: 0.2rem;
      }
    }
    .price {
      font-size: 0;
      .now-price {
        font-size: 0.28rem;
        color: rgb(240, 20, 20);
        font-weight: 700;
        line-height: 0.48rem;
        margin-right: 0.24rem;
      }
      .old-price {
        color: rgb(147, 153, 159);
        font-size: 0.2rem;
        text-decoration: line-through;
        font-weight: 700;
        line-height: 0.48rem;
      }
    }
  }
  .cartcontrol-wrapper {
    position: absolute;
    right: 0.24rem;
    bottom: 0.24rem;
  }
  .buy {
    position: absolute;
    bottom: 0.36rem;
    right: 0.36rem;
    z-index: 10;
    height: 0.48rem;
    padding: 0.14rem 0.24rem 0;
    box-sizing: border-box;
    font-size: 0.2rem;
    border-radius: 0.24rem;
    background-color: rgb(0, 160, 220);
    color: #fff;
    opacity: 1;
    &.fade-enter-active,
    &.fade-leave-active {
      transition: all 0.4s;
    }
    &.fade-enter,
    &.fade-leave-active {
      opacity: 0;
      z-index: -1;
    }
  }
}

.slide-fade-enter-active {
  transition: all 0.3s ease;
}

.slide-fade-leave-active {
  transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter,
.slide-fade-leave-to {
  transform: translate3d(10px, 0, 0);
  opacity: 0;
}
</style>
