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
            <span class="old-price" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
          </div>
         <div class="cartcontrol-wrapper">
            <cartcontrol :food="food"></cartcontrol>
         </div> 
         <transition name="fade">
            <div class="buy" v-show="!food.count||food.count === 0" @click.stop.prevent="addFirst">加入购物车</div>
          </transition>
        </div>
        <split v-show="food.info"></split>
        <div class="info" v-show="food.info">
          <h1 class="title">商品介绍</h1>
          <p class="desc">{{food.info}}</p>
        </div>
        <split></split>
        <div class="rating">
          <h1 class="title">商品评价</h1>
          <ratingSelect :select-type="selectType" :only-content="onlyContent" :desc="desc" :ratings="food.ratings" @changeType="changeType" @switchContent="switchContent"></ratingSelect>
         
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
// 导入分割组件
import Split from "components/split/split";
// 导入分割组件
import RatingSelect from "components/ratingSelect/ratingSelect";
const ALL = 2;

export default {
  props: {
    food: {
      type: Object
    }
  },
  created() {},
  data() {
    return {
      // 控制详情页的是否展现
      showFlag: false,
      // 用户选择的评论类型
      selectType: ALL,
      // 是否只显示有内容的评论
      onlyContent: true,
      desc: {
        all: "全部",
        positive: "推荐",
        negative: "吐槽"
      }
    };
  },
  methods: {
    // 显示商品详情
    show() {
      // 初始化状态
      this.showFlag = true;
      this.selectType = ALL;
      this.onlyContent = true;

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
    },
    // 监听子组件的改变商品评价类型的事件
    changeType(type) {
      this.selectType = type;
      this.$nextTick(() => {
        this.scroll.refresh();
      });
    },
    // 监听子组件更改是否只看内容的评价事件
    switchContent() {
      this.onlyContent = !this.onlyContent;
    }
  },
  components: {
    Cartcontrol,
    Split,
    RatingSelect
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
    position: relative;
    padding: 0.36rem;
    // @include border-1px(rgba(7,17,27,0.1));
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
  .info {
    padding: 0.36rem;
    .title {
      font-size: 0.28rem;
      line-height: 0.28rem;
      font-weight: 700;
      margin-bottom: 0.12rem;
    }
    .desc {
      padding: 0 0.16rem;
      font-size: 0.24rem;
      font-weight: 200;
      line-height: 0.48rem;
      color: rgb(77, 85, 93);
    }
  }
  .rating {
    padding-top: 0.36rem;
    .title {
      font-size: 0.28rem;
      line-height: 0.28rem;
      font-weight: 700;
      margin-left: 0.36rem;
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
