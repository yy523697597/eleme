/*
 * @Author: yuyi 
 * @Date: 2017-10-26 14:26:17 
 * @Last Modified by: yuyi
 * @Last Modified time: 2017-10-29 15:17:37
 */
<template>
  <div class="ratingselect">
    <div class="rating-type">
      <span class="block positive" :class="{'active':selectType===2}" @click="select(2,$event)">{{desc.all}}<span class="count">{{ratings.length}}</span> </span>
      <span class="block positive" :class="{'active':selectType===0}" @click="select(0,$event)">{{desc.positive}}<span class="count">{{positives}}</span></span>
      <span class="block negative" :class="{'active':selectType===1}" @click="select(1,$event)">{{desc.negative}}<span class="count">{{negatives}}</span></span>
    </div>
    <div class="switch" :class="{'on':onlyContent}" @click="switchContent">
      <i class="icon-check_circle"></i>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>
<script>
// 所有评价
const ALL = 2;
// 正面评价
const POSITIVE = 0;
// 负面评价
const NEGATIVE = 1;

export default {
  props: {
    // 评价
    ratings: {
      type: Array,
      default() {
        return [];
      }
    },
    // 要看的评价类型
    selectType: {
      type: Number,
      default: ALL
    },
    // 是否只看有内容的评价
    onlyContent: {
      type: Boolean,
      default: false
    },
    // 选择组件的描述
    desc: {
      type: Object,
      default() {
        return {
          all: "全部",
          positive: "满意",
          negative: "不满意"
        };
      }
    }
  },
  methods: {
    // 点击选项卡
    select(type, event) {
      // 不能在子组件中去修改props传入的属性的值,不然会报错
      // 需要将更改的值传入父组件中,由父组件进行更改,然后传入子组件中
      // this.selectType=type;
      this.$emit("changeType", type);
    },
    // 点击切换是否只显示有内容的评价
    switchContent() {
      this.$emit("switchContent");
      // 也是不能在子组件中修改状态
      // this.onlyContent = !this.onlyContent;
    }
  },
  computed: {
    // 商品正面评价的数量
    positives() {
      let positives = this.ratings.filter(rating => {
        return rating.rateType === POSITIVE;
      });
      return positives.length;
    },
    // 负面评价速来那个
    negatives() {
      let negatives = this.ratings.filter(rating => {
        return rating.rateType === NEGATIVE;
      });
      return negatives.length;
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../common/scss/icon.scss";
@import "../../common/scss/mixin.scss";

.ratingselect {
  .rating-type {
    padding: 0.36rem;
    margin: 0 0.36rem;
    @include border-1px(rgba(7,17,27,0.2));
    font-size: 0;
    .block {
      display: inline-block;
      padding: 0.16rem 0.24rem;
      border-radius: 2px;
      margin-right: 0.16rem;
      font-size: 0.24rem;
      line-height: 0.32rem;
      .count {
        font-size: 0.16rem;
        margin-left: 2px;
      }
      &.positive {
        color: rgb(77, 85, 93);
        background: #ccecf8;
        &.active {
          color: #fff;
          background-color: #00a0dc;
        }
      }
      &.negative {
        background: rgba(77, 85, 93, 0.2);
        &.active {
          background-color: rgb(77, 85, 93);
          color: #fff;
        }
      }
    }
  }
  .switch {
    padding: 0.24rem 0.36rem;
    font-size: 0;
    &.on {
      i {
        color: #00c85c;
      }
    }
    i {
      font-size: 0.48rem;
      color: rgb(147, 153, 159);
      margin-right: 0.08rem;
      vertical-align: middle;
    }
    .text {
      font-size: 0.24rem;
      color: rgb(147, 153, 159);
      vertical-align: middle;
    }
  }
}
</style>
