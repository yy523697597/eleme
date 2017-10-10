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
    <div class="detail" v-show="detailShow">

    </div>
  </div>
</template>
<script>
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
    showDetail() {
      this.detailShow = true
    }
  }
}
</script>
<style lang="scss" scoped>
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
          background-image: url(../../../resource/img/decrease_2@2x.png);
        }
        &.discount {
          background-image: url(../../../resource/img/discount_2@2x.png);
        }
        &.guarantee {
          background-image: url(../../../resource/img/guarantee_2@2x.png);
        }
        &.invoice {
          background-image: url(../../../resource/img/invoice_2@2x.png);
        }
        &.special {
          background-image: url(../../../resource/img/special_2@2x.png);
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
    z-index: 99;
    width: 100%;
    height: 100%;
    overflow: auto;
  }
}
</style>
