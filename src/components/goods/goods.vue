<template>
  <div class="goods-container">
    <div class="menu-container" ref="menuContainer">
      <ul>
        <li v-for="(item,index) of goods" :key="index" class="menu-item" :class="{'current':currentIndex===index}" @click="_selectMenu(index)" ref="menuList">
          <span v-show="item.type > 0" class="icon" :class="classMap[item.type]"></span>
          <span class="text"> {{item.name}}</span>
        </li>
      </ul>
    </div>
    <div class="foods-container" ref="foodsContainer">
      <ul>
        <li v-for="(item,index) of goods" :key="index" class="foods-wrapper" ref="foodsList">
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
                <div class="cartcontrol-wrapper">
                  <cartcontrol :food="food" @addFood="addFood" @decreaseFood="decreaseFood"></cartcontrol>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <cart :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice" :selectGoods="selectGoods"></cart>
  </div>
</template>
<script>
// 导入better-scroll
import BScroll from "better-scroll";
// 导入购物车组件
import Cart from "components/cart/cart";
// 导入购物车控制组件
import Cartcontrol from "components/cartcontrol/cartcontrol";
const ERR_OK = 0;
export default {
  props: {
    seller: {
      type: Object
    }
  },
  created() {
    this.classMap = ["decrease", "discount", "special", "invoice", "guarantee"];
    // 获取goods产品数据
    this.$http.get("/api/goods").then(res => {
      if (res.data.errno === ERR_OK) {
        this.goods = res.data.data;
      }
      // 异步获取数据时，需要在获取数据后再初始化BScroll
      this.$nextTick(() => {
        // 涉及到DOM元素的操作，需要在nextTick方法中初始化，而不能在created中初始化
        this._initScroll();

        // 计算每一个菜单中子元素的总高度
        this._calculateHeight();
      });
    });
  },
  computed: {
    currentIndex() {
      for (let i = 0; i < this.listHeight.length; i++) {
        let height1 = this.listHeight[i];
        let height2 = this.listHeight[i + 1];
        // 做容错处理，如果是最后一个元素，直接返回i
        // 在这里不能写  A<=B<C这种，必须分开写成 A <= B && B < C
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          return i;
        }
      }
      return 0;
    }
  },
  methods: {
    // 初始化scroll组件
    _initScroll() {
      this.menuScroll = new BScroll(this.$refs.menuContainer, {
        // better-scroll默认不会触发click事件，所以需要在这里设置为true来手动开启
        click: true
      });
      this.foodsScroll = new BScroll(this.$refs.foodsContainer, {
        // 实时传递Y值
        probeType: 3,
        click: true
      });
      // 监听滚动事件
      this.foodsScroll.on("scroll", pos => {
        // 避免在听不得时候下拉刷新，导致左右列表不同步的错误
        if (pos.y <= 0) {
          this.scrollY = Math.abs(Math.round(pos.y));
        }
      });
    },
    // 计算组件高度
    _calculateHeight() {
      const foodList = this.$refs.foodsList;
      let height = 0;
      // 先添加一次0的位置，不然初始化的时候左右两侧分类不同步
      this.listHeight.push(height);

      // 依次将菜单的高度添加到数组中
      for (let item of foodList) {
        height += item.clientHeight;
        this.listHeight.push(height);
      }
    },
    // 左侧菜单点击事件
    _selectMenu(index) {
      let foodsList = this.$refs.foodsList;
      let el = foodsList[index];
      // scrollToElement方法滚动到指定元素的位置
      this.foodsScroll.scrollToElement(el, 300);
    },
    // 点击添加商品
    addFood(foodItem) {
      // 用于判断用户添加的商品是否存在
      let flag = false;
      if (this.selectGoods.length === 0) {
        // 如果用户选择商品数组为空就直接添加商品
        this.selectGoods.push(foodItem);
      } else {
        this.selectGoods.forEach(good => {
          if (foodItem.food.name === good.food.name) {
            // 如果已经存在这个商品就更新数据，并且将flag设置为tru，表明商品已经存在
            good = foodItem;
            flag = true;
          }
        });
        // 如果flag在循环后仍然为false，表明此商品不存在与数组中，需要进行添加
        if (flag === false) {
          this.selectGoods.push(foodItem);
        }
      }
    },
    // 点击减少商品
    decreaseFood(foodItem) {
      this.selectGoods.forEach(good => {
        if (foodItem.food.name === good.food.name) {
          // 如果已经存在这个商品就更新数据
          good = foodItem;
        }
      });
    }
  },
  data() {
    return {
      goods: [],
      // 用于存储右侧详情栏目中每一个项目的高度
      listHeight: [],
      scrollY: 0,
      // 用户选择的商品数组
      selectGoods: []
    };
  },
  components: {
    Cart,
    Cartcontrol
  }
};
</script>
<style lang="scss" scoped>
@import "../../common/scss/mixin.scss";
@import "../../common/scss/icon.scss";

.goods-container {
  display: flex;
  position: absolute;
  width: 100%;
  top: 3.48rem;
  bottom: 0.92rem;
  overflow: hidden;
  .menu-container {
    // 左边定宽，右边自适应
    flex: 0 0 1.6rem;
    width: 1.6rem;
    background-color: #f3f5f7;
    .current {
      background-color: #fff;
      color: red;
      font-weight: 700;
      line-height: 0.28rem;
      margin-top: -1px;
      border-bottom: none;
    }
    .menu-item {
      display: table;
      margin: 0 auto;
      height: 1.08rem;
      width: 1.6rem;
      color: rgb(24, 20, 20);
      text-align: center;
      border-bottom: 1px solid rgba(17, 17, 27, 0.1);
      .icon {
        display: inline-block;
        width: 0.32rem;
        height: 0.32rem;
        vertical-align: top;
        margin-right: -0.28rem;
        background-size: 0.24rem;
        background-repeat: no-repeat;
        margin-top: 0.3rem;
        &.decrease {
          @include bg-image("decrease_2");
        }
        &.discount {
          @include bg-image("discount_2");
        }
        &.guarantee {
          @include bg-image("guarantee_2");
        }
        &.invoice {
          @include bg-image("invoice_2");
        }
        &.special {
          @include bg-image("special_2");
        }
      }
      .text {
        display: table-cell;
        vertical-align: middle;
        font-size: 0.24rem;
        width: 1.12rem;
      }
    }
  }
  .foods-container {
    flex: 1;

    .foods-title {
      padding-left: 0.28rem;
      background-color: #f3f5f7;
      color: rgb(147, 153, 159);
      font-size: 0.24rem;
      line-height: 0.52rem;
      height: 0.52rem;
      border-left: 2px solid #d9dde1;
      margin-bottom: 0.36rem;
    }
    .food-item {
      display: flex;
      margin: 0.36rem;
      padding-bottom: 0.36rem;
      @include border-1px(rgba(7, 17, 27, 0.1));
      &:last-child {
        @include border-none();
        margin-bottom: 0;
      }
      .food-icon {
        flex: 0 0 1.14rem;
        margin-right: 0.2rem;
        img {
          width: 1.14rem;
          height: 1.14rem;
        }
      }
      .food-content {
        flex: 1;
        .food-name {
          color: rgba(17, 17, 27, 1);
          font-size: 0.28rem;
          line-height: 0.28rem;
          margin-bottom: 0.16rem;
          margin-top: 0.04rem;
        }

        .food-description,
        .food-extra {
          font-size: 0.2rem;
          color: rgb(147, 153, 159);
          line-height: 0.2rem;
          margin-bottom: 0.16rem;
          .count {
            margin-right: 0.24rem;
          }
        }
        .food-description {
          margin-bottom: 0.16rem;
          line-height: 0.24rem;
        }
        .food-price {
          height: 0.48rem;
          font-size: 0;
          .newprice {
            color: #f01313;
            font-size: 0.28rem;
            font-weight: 700;
            line-height: 0.48rem;
            margin-right: 0.16rem;
          }
          .oldprice {
            color: rgb(147, 153, 159);
            font-size: 0.2rem;
            text-decoration: line-through;
          }
        }
        .cartcontrol-wrapper {
          position: absolute;
          right: 0;
          bottom: 0.24rem;
        }
      }
    }
  }
}
</style>

