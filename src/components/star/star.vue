/*
 * @Author: yuyi 
 * @Date: 2017-10-12 10:49:25 
 * @Last Modified by:   yuyi 
 * @Last Modified time: 2017-10-12 10:49:25 
 */
<template>
  <div class="star-container" :class="starType">
    <span v-for="(itemClass,index) of itemClasses" :class="itemClass" class="star-item" :key="index"></span>
  </div>
</template>
<script>
// star数量
const LENGTH = 5
// 实心样式
const CLS_ON = 'on'
// 半星样式
const CLS_HALF = 'half'
// 空心样式
const CLS_OFF = 'off'

export default {
  props: {
    size: {
      type: Number
    },
    score: {
      type: Number
    }
  },
  computed: {
    // 通过不同的size，去设置不同的样式
    starType() {
      return 'star-' + this.size
    },
    // 计算star的样式
    itemClasses() {
      let result = []
      // 处理评分
      const score = Math.floor(this.score * 2) / 2
      // 判断小数
      const hasDecimal = score % 1 !== 0
      // 获取整数
      const integer = Math.floor(score)
      // 先添加实心的星星
      for (let i = 0; i < integer; i++) {
        result.push(CLS_ON)
      }
      // 添加半星
      if (hasDecimal) {
        result.push(CLS_HALF)
      }
      // 添加空心
      while (result.length < LENGTH) {
        result.push(CLS_OFF)
      }
      // 返回数组
      return result
    }
  }
}
</script>
<style lang="scss" scoped>
// 导入mixin
@import '../../common/scss/mixin.scss';

.star-container {
  .star-item {
    display: inline-block;
    background-repeat: no-repeat;
  }
  &.star-48 {
    .star-item {
      width: .4rem;
      height: .4rem;
      margin-right: .44rem;
      background-size: .4rem .4rem;
      &:last-child {
        margin-right: 0;
      }
      &.on {
        @include bg-image('star48_on')
      }
      &.half {
        @include bg-image('star48_half')
      }
      &.off {
        @include bg-image('star48_off')
      }
    }
  }
  &.star-36 {
    .star-item {
      width: .3rem;
      height: .3rem;
      margin-right: .32rem;
      background-size: .3rem .3rem;
      &:last-child {
        margin-right: 0;
      }
      &.on {
        @include bg-image('star36_on')
      }
      &.half {
        @include bg-image('star36_half')
      }
      &.off {
        @include bg-image('star36_off')
      }
    }
  }
  &.star-24 {
    .star-item {
      width: .2rem;
      height: .2rem;
      margin-right: .6rem;
      background-size: .2rem .2rem;
      &:last-child {
        margin-right: 0;
      }
      &.on {
        @include bg-image('star24_on')
      }
      &.half {
        @include bg-image('star24_half')
      }
      &.off {
        @include bg-image('star24_off')
      }
    }
  }
}
</style>
