<template>
    <div class="seller" ref="seller">
        <div class="seller-content">
            <div class="overview">
               <h1 class="title">{{seller.name}}</h1> 
               <div class="desc">
                 <star :size="36" :score="seller.score"></star>
                 <span class="rating-count">({{seller.ratingCount}})</span>
                 <span class="sell-count">月售{{seller.sellCount}}单</span>
               </div>
              
               <div class="remark">
                 <ul>
                   <li class="block">
                     <h2>起送价</h2>
                     <div class="content">
                       <span class="stress">{{seller.minPrice}}</span>元
                     </div>
                   </li>
                   <li class="block">
                     <h2>商家配送</h2>
                     <div class="content">
                       <span class="stress">{{seller.deliveryPrice}}</span>元
                     </div>
                   </li>
                   <li class="block">
                     <h2>平均配送时间</h2>
                     <div class="content">
                       <span class="stress">{{seller.deliveryTime}}</span>分钟
                     </div>
                   </li>
                 </ul>
               </div>
            </div>
            <split></split>
            <div class="bulletin">
              <h2 class="title">公告与活动</h2>
              <div class="content-wrapper">
                <p class="content">{{seller.bulletin}}</p>
              </div>
            </div>
            <ul v-if="seller.supports" class="supports">
              <li v-for="(item,index) of seller.supports" class="support-item" v-bind:key="index">
                <span class="icon" :class="classMap[seller.supports[index].type]"></span>
                <span class="text">{{seller.supports[index].description}}</span>
              </li>
            </ul>
            <split></split>
            <div class="pics">
              <h2 class="title">商家实景</h2>
              <div>
                <ul class="pic-wrapper">
                 <li class="pic-item" v-for="(pic,index) of seller.pics" :key="index">
                   <img :src="pic" width="120" height="90">
                 </li>
                </ul>
              </div>
              
            </div>
        </div>
    </div>
</template>
<script>
import BScroll from "better-scroll";
// 导入star评分组件
import Star from "components/star/star";
// 导入分割组件
import Split from "components/split/split";

export default {
  props: {
    seller: {
      type: Object
    }
  },
  components: {
    Star,
    Split
  },
  created() {
    this.classMap = ["decrease", "discount", "special", "invoice", "guarantee"];
  },
  watch: {
    // 因为seller是异步获取的,所以需要watch  seller属性,当获取到了seller属性之后,才可以去初始化scroll
    seller() {
      this.$nextTick(() => {
        this._initScroll();
      });
    }
  },
  mounted() {
    this.$nextTick(() => {
      this._initScroll();
    });
  },
  methods: {
    _initScroll() {
      if (!this.scroll) {
        this.scroll = new BScroll(this.$refs.seller, {
          click: true
        });
      } else {
        this.scroll.refresh();
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../common/scss/mixin.scss";

.seller {
  position: absolute;
  top: 3.48rem;
  bottom: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  .seller-content {
    .overview {
      font-size: 0;
      padding: 0.36rem;
      .title {
        font-size: 0.28rem;
        color: rgb(7, 17, 27);
        line-height: 0.28rem;
        margin-bottom: 0.16rem;
        font-weight: 700;
      }
      .desc {
        color: rgb(77, 85, 93);
        font-size: 0.2rem;
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);
        .star-container {
          display: inline-block;
          margin-bottom: 0.36rem;
          vertical-align: top;
          line-height: 0.36rem;
        }
        .rating-count {
          margin: 0 0.24rem 0 0.16rem;
          vertical-align: top;
          line-height: 0.36rem;
        }
        .sell-count {
          vertical-align: top;
          line-height: 0.36rem;
        }
      }
      .remark {
        ul {
          display: flex;
          flex-wrap: nowrap;
          justify-content: space-between;
          text-align: center;
          .block {
            flex: 1;
            display: block;
            padding-top: 0.36rem;
            border-right: 1px solid rgba(7, 17, 27, 0.1);
            &:last-child {
              border: none;
            }
            h2 {
              font-size: 0.2rem;
              color: rgb(147, 153, 159);
              line-height: 0.2rem;
              margin-bottom: 0.08rem;
            }
            .content {
              font-size: 0.2rem;
              .stress {
                font-size: 0.48rem;
              }
            }
          }
        }
      }
    }
    .bulletin {
      padding: 0.36rem 0.36rem 0;
      .title {
        font-size: 0.28rem;
        font-weight: 700;
        color: rgb(7, 17, 27);
        line-height: 0.28rem;
        margin-bottom: 0.16rem;
      }
      .content-wrapper {
        @include border-1px(rgba(7,17,27,0.1));
        padding-bottom: 0.32rem;
        .content {
          margin: 0 0.24rem;
          color: rgb(240, 20, 20);
          font-size: 0.24rem;
          line-height: 0.48rem;
          font-weight: 200;
        }
      }
    }
    .supports {
      padding: 0 0.36rem;
      .support-item {
        // position: relative;
        padding: 0.32rem 0.24rem;
        font-size: 0;
        @include border-1px(rgba(7,17,27,0.1));
        &:last-child {
          @include border-none();
        }
        .icon {
          display: inline-block;
          width: 0.32rem;
          height: 0.32rem;
          margin-right: 0.12rem;
          background-size: cover;
          vertical-align: top;
          &.decrease {
            @include bg-image("decrease_1");
          }
          &.discount {
            @include bg-image("discount_1");
          }
          &.guarantee {
            @include bg-image("guarantee_1");
          }
          &.invoice {
            @include bg-image("invoice_1");
          }
          &.special {
            @include bg-image("special_1");
          }
        }
        .text {
          font-size: 0.24rem;
          font-weight: 200;
          color: rgb(7, 17, 27);
          line-height: 0.32rem;
          vertical-align: top;
        }
      }
    }
    .bulletin {
    }
    .pics {
      padding: 0.36rem 0 0.36rem 0.36rem;
      .title {
        font-size: 0.28rem;
        font-weight: 700;
        color: rgb(7, 17, 27);
        line-height: 0.28rem;
        margin-bottom: 0.24rem;
      }
      .pic-wrapper {
        width: 100%;
        overflow: hidden;
      }
    }
  }
}
</style>
