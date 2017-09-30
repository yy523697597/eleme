<template>
  <div class="header">
    <div class="content-container">
      <div class="blur"></div>
      <img :src="seller.avatar" class="avatar">
      <div class="content" >
        <h1 class="store-name">{{seller.name}}</h1>
        <span class="description">{{seller.description}}</span>
        <span class="supports" v-if="seller.supports">{{seller.supports[0].description}}</span>
      </div>
    </div>
    <div class="notice-container"></div>
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
    }
  }
</script>
<style lang="scss" scoped>
  .header {
    width: 100%;
    height: 2.68rem;
    position: relative;
     &::after {
        content: ' ';
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        margin: auto;
        background-color: rgba(0, 0, 0, .2)
      }
    .blur {
      position: absolute;
      width: 100%;
      height: 100%;
      background-image: url(http://static.galileo.xiaojukeji.com/static/tms/seller_avatar_256px.jpg);
      background-size: cover;
      filter: blur(10px);
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
          top: 0.1rem;
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
      .supports {
        padding-left: .32rem;
        font-size: .2rem;
        line-height: .24rem;
        font-weight: 200;
        position: relative;
        &::before {
          content: ' ';
          width: .24rem;
          height: .24rem;
          position: absolute;
          background-image: url(../../../resource/img/decrease_2@2x.png);
          background-size: cover;
          top: 0;
          left: 0;
        }
      }
    }
  }
</style>
