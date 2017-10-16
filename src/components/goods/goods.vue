<template>
  <div class="goods-container">
    <div class="menu-container" ref="menuContainer">
      <ul>
        <li v-for="(item,index) of goods" :key="index" class="menu-item">
          <span v-show="item.type > 0" class="icon" :class="classMap[item.type]"></span>
          <span class="text"> {{item.name}}</span>
        </li>
      </ul>
    </div>
    <div class="foods-container" ref="foodsContainer">
      <ul>
        <li v-for="(item,index) of goods" :key="index" class="foods-wrapper">
          <h2 class="foods-title">{{item.name}}</h2>
          <ul>
            <li v-for="(food,index) of item.foods" :key="index" class="food-item">
              <div class="food-icon">
                <img :src="food.icon">
              </div>
              <div class="food-content">
                <h3 class="food-name">{{food.name}}</h3>
                <p class="food-description">{{food.description}}</p>
                <div class="food-extra">
                  <span class="count">月售{{food.sellCount}}份</span>
                  <span class="rate">好评率{{food.rating}}%</span>
                </div>
                <div class="food-price">
                  <span class="newprice">￥{{food.price}}</span>
                  <span v-if="food.oldPrice" class="oldprice">￥{{food.oldPrice}}</span>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
// 导入better-scroll
import BScroll from 'better-scroll'

const ERR_OK = 0
export default {
  props: {
    seller: {
      type: Object
    }
  },
  created() {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    // 获取goods产品数据
    this.$http.get('/api/goods').then(res => {
      if (res.data.errno === ERR_OK) {
        this.goods = res.data.data
      }
      // 异步获取数据时，需要在获取数据后再初始化BScroll
      this.$nextTick(() => {
        // 涉及到DOM元素的操作，需要在nextTick方法中初始化，而不能在created中初始化
        this._initScroll()
      })
    })
  },
  mounted() {

  },
  methods: {
    _initScroll() {
      this.menuScroll = new BScroll(this.$refs.menuContainer, {})
      this.foodsScroll = new BScroll(this.$refs.foodsContainer, {})
    }
  },
  data() {
    return {
      goods: []
    }
  }
}
</script>
<style lang="scss">
@import '../../common/scss/mixin.scss';

.goods-container {
  display: flex;
  position: absolute;
  width: 100%;
  top: 3.48rem;
  bottom: .92rem;
  overflow: hidden;
  .menu-container {
    // 左边定宽，右边自适应
    flex: 0 0 1.6rem;
    width: 1.6rem;
    background-color: #f3f5f7;
    .menu-item {
      display: table;
      margin: 0 auto;
      height: 1.08rem;
      width: 1.6rem;
      color: rgb(24, 20, 20);
      text-align: center;
      border-bottom: 1px solid rgba(17, 17, 27, .1);
      .icon {
        display: inline-block;
        width: .32rem;
        height: .32rem;
        vertical-align: top;
        margin-right: -.28rem;
        background-size: .24rem;
        background-repeat: no-repeat;
        margin-top: .3rem;
        &.decrease {
          @include bg-image('decrease_2');
        }
        &.discount {
          @include bg-image('discount_2');
        }
        &.guarantee {
          @include bg-image('guarantee_2');
        }
        &.invoice {
          @include bg-image('invoice_2');
        }
        &.special {
          @include bg-image('special_2');
        }
      }
      .text {
        display: table-cell;
        vertical-align: middle;
        font-size: .24rem;
        width: 1.12rem;
      }
    }
  }
  .foods-container {
    flex: 1;
    .foods-title {
      padding-left: .28rem;
      background-color: #f3f5f7;
      color: rgb(147, 153, 159);
      font-size: .24rem;
      line-height: .52rem;
      height: .52rem;
      border-left: 2px solid #d9dde1;
      margin-bottom: .36rem;
    }
    .food-item {
      display: flex;
      margin: .36rem;
      padding-bottom: .36rem;
      @include border-1px(rgba(7, 17, 27, .1));
      &:last-child {
        @include border-none();
        margin-bottom: 0;
      }
      .food-icon {
        flex: 0 0 1.14rem;
        margin-right: .2rem;
        img {
          width: 1.14rem;
          height: 1.14rem;
        }
      }
      .food-content {
        flex: 1;
        .food-name {
          color: rgba(17, 17, 27, 1);
          font-size: .28rem;
          line-height: .28rem;
          margin-bottom: .16rem;
          margin-top: .04rem;
        }

        .food-description,
        .food-extra {
          font-size: .2rem;
          color: rgb(147, 153, 159);
          line-height: .2rem;
          margin-bottom: .16rem;
          .count {
            margin-right: .24rem;
          }
        }
        .food-description {
          margin-bottom: .16rem;
          line-height: .24rem;
        }
        .food-price {
          height: .48rem;
          font-size: 0;
          .newprice {
            color: #F01313;
            font-size: .28rem;
            font-weight: 700;
            line-height: .48rem;
            margin-right: .16rem;
          }
          .oldprice {
            color: rgb(147, 153, 159);
            font-size: .2rem;
            text-decoration: line-through;
          }
        }
      }
    }
  }
}
</style>

