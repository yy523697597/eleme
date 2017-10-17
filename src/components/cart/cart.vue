<template>
  <div class="cart">
    <div class="content">
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
      <div class="content-right">
        <div class="pay" :class="payClass">
          {{payDesc}}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
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
    selectFoods: {
      type: Array,
      default() {
        return []
      }
    }
  },
  computed: {
    // 计算总价
    totalPrice() {
      let total = 0
      this.selectFoods.forEach((food) => {
        total += food.price * food.count
      })
      return total
    },
    // 计算商品总数
    totalCount() {
      let count = 0
      this.selectFoods.forEach((food) => {
        count += food.count
      })
      return count
    },
    // 购物车结算消息描述
    payDesc() {
      if (this.totalPrice === 0) {
        return `￥${this.minPrice}元起送`
      } else if (this.totalPrice < this.minPrice) {
        let diff = this.minPrice - this.totalPrice
        return `还差￥${diff}元起送`
      } else {
        return '去结算'
      }
    },
    // 配送提示样式
    payClass() {
      if (this.totalPrice < this.minPrice) {
        return 'no-enough'
      } else {
        return 'enough'
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../common/scss/icon.scss';
.cart {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 50;
  width: 100%;
  height: .96rem;
  background-color: #141d27;
  .content {
    display: flex;
    height: .96rem;
    color: rgba(255, 255, 255, .4);
    .content-left {
      flex: 1;
      font-size: 0;
      .logo-wrapper {
        display: inline-block;
        position: relative;
        top: -.2rem;
        margin: 0 .24rem;
        padding: .12rem;
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
          line-height: .88rem;
          text-align: center;
          .icon-shopping_cart {
            font-size: .48rem;
            color: #80858a;
            position: relative;
            top: .2rem;
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
          box-shadow: 0 4px 8px 0 rgba(0, 0, 0, .4);
          top: 0;
          right: 0;
          width: .48rem;
          height: .32rem;
          line-height: .32rem;
          text-align: center;
          border-radius: .32rem;
          color: #fff;
          font-size: .18rem;
          font-weight: 700;
        }
      }
      .price {
        display: inline-block;
        font-size: .32rem;
        line-height: .48rem;
        box-sizing: border-box;
        border-right: 1px solid rgba(255, 255, 255, .1);
        font-size: .32rem;
        font-weight: 700;
        vertical-align: top;
        padding-right: .24rem;
        margin: .24rem .24rem 0 0;
        &.active {
          color: #fff;
        }
      }
      .desc {
        display: inline-block;
        line-height: .96rem;
        font-size: .24rem;
        height: 100%;
      }
    }
    .content-right {
      flex: 0 0 2.1rem;
      width: 2.1rem;
      .pay {
        height: 100%;
        width: 2.1rem;
        line-height: .96rem;
        font-size: .24rem;
        text-align: center;
        background-color: #2B333B;
        font-weight: 700;
        &.not-enough {
          background-color: #2B333B;
        }
        &.enough {
          background-color: #00b43c;
          color: #fff;
        }
      }
    }
  }
}
</style>
