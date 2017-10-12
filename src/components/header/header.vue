/*
 * @Author: yuyi 
 * @Date: 2017-10-12 10:47:07 
 * @Last Modified by:   yuyi 
 * @Last Modified time: 2017-10-12 10:47:07 
 */
<template>
  <div class="header">
    <div class="content-container">
      <div class="blur"></div>
      <img :src="seller.avatar" class="avatar">
      <div class="content">
        <h1 class="store-name">{{seller.name}}</h1>
        <span class="description">{{seller.description}} / {{seller.deliveryTime}}分钟送达</span>
        <div class="discount-container">
          <!-- 通过type去动态的获取class值，从而显示不同的背景图片 -->
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <!-- 使用v-if来避免报错 -->
          <span class="supports" v-if="seller.supports">{{seller.supports[0].description}}</span>
        </div>
      </div>
    </div>
    <span class="count" @click="showDetail">{{seller.deliveryPrice}}个 ></span>
    <div class="notice-container" @click="showDetail">
      <img src="../../../resource/img/bulletin@2x.png" class="notice-img">
      <span class="notice-content">{{seller.bulletin}}</span>
      <span class="right-arrow">></span>
    </div>
    <!-- 使用transition去实现动态过度效果 -->
    <transition name="slide-fade">
      <div class="detail" v-show="detailShow">
        <div class="detail-wrapper">
          <div class="detail-main">
            <h1 class="name">{{seller.name}}</h1>
            <div class="star-wrapper">
              <star :size="48" :score="seller.score"></star>
            </div>
            <div class="title">
              <div class="line"></div>
              <div class="text">优惠信息</div>
              <div class="line"></div>
            </div>
            <ul v-if="seller.supports" class="supports">
              <li v-for="(item,index) of seller.supports" class="support-item" v-bind:key="index">
                <span class="icon" :class="classMap[seller.supports[index].type]"></span>
                <span class="text">{{seller.supports[index].description}}</span>
              </li>
            </ul>
            <div class="title">
              <div class="line"></div>
              <div class="text">商家公告</div>
              <div class="line"></div>
            </div>
            <div class="bulletin">
              <p>{{seller.bulletin}}</p>
            </div>
          </div>
        </div>
        <div class="detail-close" @click="closeDetail">X</div>
      </div>
    </transition>
  </div>
</template>
<script>
// 导入star评分组件
import Star from 'components/star/star'

export default {
  props: {
    seller: {
      type: Object,
      default: {
        supports: []
      }
    }
  },
  created() {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
  },
  data() {
    return {
      classMap: [],
      detailShow: false
    }
  },
  methods: {
    // 详情页面的显示
    showDetail() {
      this.detailShow = true
    },
    // 详情页面的关闭
    closeDetail() {
      this.detailShow = false
    }
  },
  components: {
    // 注册star评分组件
    Star
  }
}
</script>
<style lang="scss" scoped>
@import '../../common/scss/mixin.scss';
.header {
  width: 100%;
  height: 2.68rem;
  position: relative;
  overflow: hidden;
  &::after {
    content: ' ';
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    margin: auto;
    background-color: rgba(7, 17, 27, .5)
  }
  .blur {
    position: absolute;
    width: 100%;
    height: 100%;
    background-image: url(http://static.galileo.xiaojukeji.com/static/tms/seller_avatar_256px.jpg);
    background-size: cover;
    filter: blur(5px);
  }
  .avatar {
    width: 1.28rem;
    height: 1.28rem;
    position: absolute;
    top: .48rem;
    left: .48rem;
    border-radius: .04rem;
    z-index: 1;
  }
  .content {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: .48rem;
    left: 2.08rem;
    justify-content: space-around;
    height: 1.28rem;
    color: #fff;
    z-index: 1;
    .store-name {
      padding-left: .72rem;
      padding-top: .04rem;
      font-size: .32rem;
      font-weight: bold;
      line-height: .36rem;
      &::before {
        content: ' ';
        width: .6rem;
        height: .36rem;
        position: absolute;
        top: 0.08rem;
        left: 0;
        background-image: url(../../../resource/img/brand@2x.png);
        background-size: cover;
      }
    }
    .description {
      font-size: .24rem;
      font-weight: 200;
      color: #fff;
      left: .24rem;
    }
    .discount-container {
      padding-left: .32rem;
      font-size: .2rem;
      line-height: .24rem;
      font-weight: 200;
      position: relative;
      .icon {
        width: .24rem;
        height: .24rem;
        position: absolute;
        background-size: cover;
        top: -0.04rem;
        left: 0;
        &.decrease {
          @include bg-image('decrease_1');
        }
        &.discount {
          @include bg-image('discount_1');
        }
        &.guarantee {
          @include bg-image('guarantee_1');
        }
        &.invoice {
          @include bg-image('invoice_1');
        }
        &.special {
          @include bg-image('special_1');
        }
      }
    }
  }
  .count {
    color: #fff;
    font-size: .2rem;
    height: .48rem;
    line-height: .48rem;
    text-align: center;
    border-radius: .24rem;
    background-color: rgba(0, 0, 0, .2);
    padding: 0 .28rem;
    position: absolute;
    bottom: .88rem;
    right: .24rem;
    z-index: 1;
  }
  .notice-container {
    width: 100%;
    height: .56rem;
    display: flex;
    justify-content: space-around;
    position: absolute;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, .2);
    font-size: 0;
    z-index: 1;
    .notice-img {
      width: .44rem;
      height: .24rem;
      margin-top: .16rem;
    }
    .notice-content {
      width: 6.24rem;
      color: #fff;
      font-size: .2rem;
      text-overflow: ellipsis;
      line-height: .62rem;
      height: .56rem;
      white-space: nowrap;
      overflow: hidden;
      vertical-align: top;
    }
    .right-arrow {
      color: #fff;
      font-size: .2rem;
      line-height: .62rem;
      vertical-align: top;
    }
  }
  .detail {
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(7, 17, 27, .8);
    -webkit-backdrop-filter: blur(10px);
    z-index: 99;
    width: 100%;
    height: 100%;
    overflow: auto;
    color: #fff;
    .detail-wrapper {
      width: 100%;
      min-height: 100%;
      .detail-main {
        padding-bottom: 1.28rem;
        padding-top: 1.28rem;
        .name {
          margin: 0 auto;
          font-size: .32rem;
          font-weight: bold;
          line-height: .32rem;
          text-align: center;
        }
        .star-wrapper {
          text-align: center;
          height: .48rem;
          line-height: .48rem;
          padding-top: .04rem;
        }
        .title {
          display: flex;
          width: 80%;
          margin: .6rem auto .56rem auto;
          .line {
            flex: 1;
            position: relative;
            top: -.12rem;
            border-bottom: 1px solid rgba(255, 255, 255, .2);
          }
          .text {
            font-size: .28rem;
            padding: 0 .24rem;
            font-weight: 700;
          }
        }
        .supports {
          width: 80%;
          margin: 0 auto;
          .support-item {
            padding: 0 .24rem;
            margin-bottom: .24rem;
            font-size: 0;
            &::last-child {
              margin-bottom: 0;
            }
            .icon {
              display: inline-block;
              width: .32rem;
              height: .32rem;
              vertical-align: top;
              margin-right: .12rem;
              background-size: .24rem;
              background-repeat: no-repeat;
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
              font-size: .24rem;
              color: #fff;
              line-height: .24rem;
            }
          }
        }
        .bulletin {
          width: 80%;
          margin: -.16rem auto 0;
          font-weight: 200;
          line-height: .48rem;
          font-size: .24rem;
        }
      }
    }
    .detail-close {
      position: relative;
      width: .64rem;
      height: .64rem;
      margin: -1.28rem auto .64rem;
      clear: both;
      font-size: .64rem;
    }
  }
}

.slide-fade-enter-active {
  transition: all .3s ease;
}

.slide-fade-leave-active {
  transition: all .5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}

.slide-fade-enter,
.slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */

{
  transform: translateX(10px);
  opacity: 0;
}
</style>
