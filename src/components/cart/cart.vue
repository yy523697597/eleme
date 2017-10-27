/*
 * @Author: yuyi 
 * @Date: 2017-10-24 16:44:05 
 * @Last Modified by: yuyi
 * @Last Modified time: 2017-10-25 15:51:50
 */
<template>
<div>
   <div class="cart">
    <div class="content" @click="toggleList">
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo" :class="{'active':totalCount>0}">
            <i class="icon-shopping_cart" :class="{'active':totalCount>0}"></i>
          </div>
          <div class="count" v-show="totalCount>0">{{totalCount}}</div>
        </div>
        <div class="price" :class="{'active':totalPrice>0}">￥{{totalPrice}}</div>
        <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
      </div>
      <!-- 此处需要阻止冒泡 -->
      <div class="content-right" @click.stop="pay">
        <div class="pay" :class="payClass">
          {{payDesc}}
        </div>
      </div>
    </div>
    <!-- <transition name="drop" @before-enter="beforeDrop" @enter="dropping" @after-enter="afterDrop"> -->
      <!-- <div class="ball-container">
        <div v-for="(ball,index) of balls" :key="index" class="ball" v-show="ball.show"> 
          <div class="inner inner-hook" ref="ballInner"></div>
        </div>
      </div> -->
    <!-- </transition> -->
    <transition name="fold">
    <div class="cart-list" v-show="listShow">
      <div class="list-header">
        <span class="title">购物车</span>
        <span class="clear" @click="empty">清空</span>
      </div>
      <div class="list-content" ref="listContent">
        <ul>
          <li class="food-item" v-for="(food,index) of selectGoods" :key="index">
            <span class="food-name">{{food.name}}</span>
            
            <div class="price">
              <span>￥{{food.price*food.count}}</span>
            </div>
            <div class="cartcontrol-wrapper">
              <cartcontrol :food="food"></cartcontrol>
            </div>
          </li>
        </ul>
      </div>
    </div>
    </transition>
   
  </div>
   <transition name="fade">
      <div class="list-mask" @click="hideList" v-show="listShow"></div>
    </transition>
</div>
 
  
</template>
<script>
// 导入购物车控制组件
import Cartcontrol from "components/cartcontrol/cartcontrol";
import BScroll from "better-scroll";

export default {
  data() {
    return {
      // 小球数组
      balls: [
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        }
      ],
      // 已经下落的小球
      dropBalls: [],
      // 购物车显示控制
      fold: true
    };
  },
  components: {
    Cartcontrol
  },
  methods: {
    // 控制购物车详情的显隐
    toggleList() {
      if (!this.totalCount) {
        return;
      }
      this.fold = !this.fold;
    },
    // 清空购物车
    empty() {
      this.selectGoods.forEach(food => {
        food.count = 0;
      });
    },
    // 点击遮罩层隐藏购物车
    hideList() {
      this.fold = true;
    },
    // 点击去结算按钮
    pay() {
      // 如果价格小于起送价就什么也不做
      if (this.totalPrice < this.minPrice) {
        return;
      }
      window.alert(`支付${this.totalPrice + this.deliveryPrice}元`);
    }

    // // 处理小球掉落动画
    // drop(el) {
    //   for (let i = 0; i < this.balls.length; i++) {
    //     // 找到一个隐藏的小球,将其显示,然后保存,并将它添加到已经下落的小球数组中
    //     let ball = this.balls[i];
    //     if (!ball.show) {
    //       ball.show = true;
    //       ball.el = el;
    //       this.dropBalls.push(ball);
    //       return;
    //     }
    //   }
    // },
    // // 进入drop的钩子函数
    // beforeDrop(el) {
    //   let count = this.balls.length;
    //   while (count--) {
    //     let ball = this.balls[count];
    //     if (ball.show) {
    //       // 浏览器API,获取小球相对于视口的位置
    //       let rect = ball.el.getBoundingClientRect();
    //       let x = rect.left - 32;
    //       let y = -(window.innerHeight - rect.top - 22);
    //       console.log(x);
    //       el.style.display = "";
    //       // 兼容性写法
    //       el.style.webkitTransform = `translate3d(0,${y}px,0)`;
    //       el.style.transform = `translate3d(0,${y}px,0)`;
    //       // 获取内部小球并且设置样式
    //       let inner = el.getElementsByClassName("inner-hook")[0];
    //       inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
    //       inner.style.transform = `translate3d(${x}px,0,0)`;
    //     }
    //   }
    // },
    // // 正在drop的钩子函数
    // dropping(el, done) {
    //   /* eslint-disable no-unused-vars */
    //   // 触发浏览器重绘
    //   let rf = el.offsetHeight;
    //   this.$nextTick(() => {
    //     // 在enter的时候将样式重置回来
    //     el.style.webkitTransform = "translate3d(0,0,0)";
    //     el.style.transform = "translate3d(0,0,0)";
    //     let inner = el.getElementsByClassName("inner-hook")[0];
    //     inner.style.webkitTransform = "translate3d(0,0,0)";
    //     inner.style.transform = "translate3d(0,0,0)";
    //     el.addEventListener("transitionend", done);
    //   });
    // },
    // // 结束drop的钩子函数
    // afterDrop(el) {
    //   console.log(el);
    //   // 重用小球
    //   let ball = this.dropBalls.shift();
    //   if (ball) {
    //     ball.show = false;
    //     el.style.display = "none";
    //   }
    // }
  },
  props: {
    // 配送费
    deliveryPrice: {
      type: Number,
      default: 0
    },
    // 最低起送费
    minPrice: {
      default: 0,
      type: Number
    },
    // 用户选择的商品数组
    selectGoods: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  computed: {
    // 计算总价
    totalPrice() {
      let total = 0;
      this.selectGoods.forEach(food => {
        total += food.price * food.count;
      });
      return total;
    },
    // 计算商品总数
    totalCount() {
      let count = 0;
      this.selectGoods.forEach(food => {
        count += food.count;
      });
      return count;
    },
    // 购物车结算消息描述
    payDesc() {
      if (this.totalPrice === 0) {
        return `￥${this.minPrice}元起送`;
      } else if (this.totalPrice < this.minPrice) {
        let diff = this.minPrice - this.totalPrice;
        return `还差￥${diff}元起送`;
      } else {
        return "去结算";
      }
    },
    // 配送提示样式
    payClass() {
      if (this.totalPrice < this.minPrice) {
        return "no-enough";
      } else {
        return "enough";
      }
    },
    listShow() {
      if (!this.totalCount) {
        return false;
      }
      let show = !this.fold;

      // 显示的时候需要去初始化bsscroll
      if (show) {
        // 如果scroll组件不存在就初始化,如果存在就刷新
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.listContent, {
              click: true
            });
          } else {
            this.scroll.refresh();
          }
        });
      }
      return show;
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../common/scss/icon.scss";
@import "../../common/scss/mixin.scss";

.cart {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 50;
  width: 100%;
  height: 0.96rem;
  .content {
    background-color: #141d27;
    display: flex;
    height: 0.96rem;
    font-size: 0;
    color: rgba(255, 255, 255, 0.4);
    .content-left {
      flex: 1;
      .logo-wrapper {
        display: inline-block;
        position: relative;
        top: -0.2rem;
        margin: 0 0.24rem;
        padding: 0.12rem;
        height: 1.12rem;
        width: 1.12rem;
        box-sizing: border-box;
        vertical-align: top;
        border-radius: 50%;
        background-color: #141d27;
        .logo {
          width: 100%;
          height: 100%;
          vertical-align: top;
          border-radius: 50%;
          background-color: #2b343c;
          line-height: 0.88rem;
          text-align: center;
          .icon-shopping_cart {
            font-size: 0.48rem;
            color: #80858a;
            position: relative;
            top: 0.2rem;
            &.active {
              color: #fff;
            }
          }
          &.active {
            background-color: rgb(0, 160, 220);
          }
        }
        .count {
          position: absolute;
          background-color: rgb(240, 20, 20);
          box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);
          top: 0;
          right: 0;
          width: 0.48rem;
          height: 0.32rem;
          line-height: 0.32rem;
          text-align: center;
          border-radius: 0.32rem;
          color: #fff;
          font-size: 0.18rem;
          font-weight: 700;
        }
      }
      .price {
        display: inline-block;
        font-size: 0.32rem;
        line-height: 0.48rem;
        box-sizing: border-box;
        border-right: 1px solid rgba(255, 255, 255, 0.1);
        font-size: 0.32rem;
        font-weight: 700;
        vertical-align: top;
        padding-right: 0.24rem;
        margin: 0.24rem 0.24rem 0 0;
        &.active {
          color: #fff;
        }
      }
      .desc {
        display: inline-block;
        line-height: 0.96rem;
        font-size: 0.24rem;
        height: 100%;
      }
    }
    .content-right {
      flex: 0 0 2.1rem;
      width: 2.1rem;
      .pay {
        height: 100%;
        width: 2.1rem;
        line-height: 0.96rem;
        font-size: 0.24rem;
        text-align: center;
        background-color: #2b333b;
        font-weight: 700;
        &.not-enough {
          background-color: #2b333b;
        }
        &.enough {
          background-color: #00b43c;
          color: #fff;
        }
      }
    }
  }
  .ball-container {
    .ball {
      position: fixed;
      left: 32px;
      bottom: 22px;
      z-index: 200;
      transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41);
      .inner {
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background: rgb(0, 160, 220);
        transition: all 0.4s linear;
      }
    }
  }
  .cart-list {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    transform: translate3d(0, -100%, 0);
    &.fold-enter-active,
    &.fold-leave-active {
      transition: all 0.5s;
    }
    &.fold-enter,
    &.fold-leave-active {
      transform: translate3d(0, 0, 0);
    }
    .list-header {
      @include border-1px(rgba(7, 17, 27, 0.1));

      padding: 0 0.36rem;
      height: 0.8rem;
      background: #f3f5f7;
      .title {
        float: left;
        font-size: 0.28rem;
        font-weight: 200;
        line-height: 0.8rem;
        color: rgb(7, 17, 27);
      }
      .clear {
        float: right;
        font-size: 0.24rem;
        color: rgb(0, 160, 220);
        line-height: 0.8rem;
      }
    }
    .list-content {
      max-height: 4.34rem;
      overflow: hidden;
      padding: 0 0.36rem;
      background-color: #fff;
      .food-item {
        position: relative;
        font-size: 0;
        height: 0.96rem;
        line-height: 0.96rem;
        @include border-1px(rgba(7, 17, 27, 0.1));
        .food-name {
          font-size: 0.28rem;
          color: rgb(7, 17, 27);
        }
        .price {
          position: absolute;
          right: 2rem;
          bottom: 0;
          color: rgb(240, 20, 20);
          font-size: 0.28rem;
        }
        .cartcontrol-wrapper {
          height: 0.96rem;
          position: absolute;
          right: 0;
          top: 0.1rem;
        }
      }
    }
  }
}
.list-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 40;
  opacity: 1;
  -webkit-backdrop-filter: blur(10px);
  background-color: rgba(7, 17, 27, 0.6);
  &.fade-enter-active,
  &.fade-leave-active {
    transition: all 0.4s;
  }
  &.fade-enter,
  &.fade-leave-active {
    opacity: 0;
    background-color: rgba(7, 17, 27, 0);
  }
}
</style>
