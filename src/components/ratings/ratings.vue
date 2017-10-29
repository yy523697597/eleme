/*
 * @Author: yuyi 
 * @Date: 2017-10-29 10:45:16 
 * @Last Modified by: yuyi
 * @Last Modified time: 2017-10-29 13:02:08
 */
<template>
    <div class="ratings" ref="ratings">
       <div class="ratings-content">
          <div class="overview">
            <div class="overview-left">
              <div class="score">{{seller.score}}</div>
              <div class="title">综合评分</div>
              <div class="rank">高于周边商家{{seller.rankRate}}%</div>
            </div>
            <div class="overview-right">
              <div class="score-wrapper">
                <span class="title">服务态度</span>
                <star :size="36" :score="seller.serviceScore"></star>
                <span class="score">{{seller.serviceScore}}</span>
              </div>
              <div class="score-wrapper">
                 <span class="title">商品评分</span>
                <star :size="36" :score="seller.serviceScore"></star>
                <span class="score">{{seller.foodScore}}</span>
              </div>
              <div class="delivery-wrapper">
                <span class="title">送达时间</span>
                <span class="time">{{seller.deliveryTime}}分钟</span>
              </div>
            </div>
          </div>
          <split></split>
           <ratingSelect :select-type="selectType" :only-content="onlyContent" :ratings="ratings" @changeType="changeType" @switchContent="switchContent"></ratingSelect>
           <div class="rating-detail">
             <ul>
               <li v-for="(rating,index) of ratings" :key="index" class="rating-item" v-show="needShow(rating.rateType,rating.text)">
                 <div class="avatar">
                   <img :src="rating.avatar" width="28" height="28">
                 </div>
                 <div class="content">
                   <h2 class="name">{{rating.username}}</h2>
                   <div class="star-wrapper">
                     <star :size="24" :score="rating.score"></star>
                     <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>
                   </div>
                   <p class="desc">{{rating.text}}</p>
                   <div class="recommend" v-show="rating.recommend.length">
                     <i class="icon-thumb_up"></i>
                     <span v-for="(item,index) of rating.recommend" :key="index">{{item}}</span>
                  </div>
                  <div class="time">{{rating.rateTime|formatDate}}</div>
                 </div>
               </li>
             </ul>
           </div>
       </div>
    </div>
</template>
<script>
import BScroll from "better-scroll";
// 导入分割组件
import Split from "components/split/split";
// 导入star评分组件
import Star from "components/star/star";
// 导入评分选择组件
import RatingSelect from "components/ratingSelect/ratingSelect";
// 导入格式化时间js
import { formatDate } from "common/js/date";

const ALL = 2;
const ERR_OK = 0;

export default {
  props: {
    seller: {
      type: Object
    }
  },
  components: {
    Split,
    Star,
    RatingSelect
  },
  data() {
    return {
      selectType: ALL,
      onlyContent: true,
      // 评价
      ratings: []
    };
  },
  created() {
    // this.classMap = ["decrease", "discount", "special", "invoice", "guarantee"];
    // 获取ratings评价数据
    this.$http.get("/api/ratings").then(res => {
      if (res.data.errno === ERR_OK) {
        this.ratings = res.data.data;
      }
      // 异步获取数据时，需要在获取数据后再初始化BScroll
      // 初始化better-scroll,避免出现浏览器的滚动条
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.ratings, {
            click: true
          });
        } else {
          this.scroll.refresh();
        }
      });
    });
  },
  methods: {
    // 监听子组件的改变商品评价类型的事件
    changeType(type) {
      this.selectType = type;
      // 切换类型后需要刷新scroll组件
      this.$nextTick(() => {
        this.scroll.refresh();
      });
    },
    // 监听子组件更改是否只看内容的评价事件
    switchContent() {
      this.onlyContent = !this.onlyContent;
      // 切换内容后需要刷新scroll组件
      this.$nextTick(() => {
        this.scroll.refresh();
      });
    },
    // 控制评论的显示内容
    needShow(type, text) {
      if (this.onlyContent && !text) {
        return false;
      }
      if (this.selectType === ALL) {
        return true;
      } else {
        return type === this.selectType;
      }
    }
  },
  filters: {
    formatDate(time) {
      let date = new Date(time);
      return formatDate(date, "yyy-MM-dd hh:mm");
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../common/scss/mixin.scss";
@import "../../common/scss/icon.scss";

.ratings {
  position: absolute;
  top: 3.48rem;
  bottom: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  .overview {
    display: flex;
    padding: 0.36rem 0;
    .overview-left {
      flex: 0 0 2.74rem;
      border-right: 1px solid rgba(7, 17, 27, 0.1);
      text-align: center;
      font-size: 0;
      padding-bottom: 0.12rem;
      // 兼容iphone5
      @media screen and (max-width: 320px) {
        flex: 0 0 2.4rem;
        width: 2.4rem;
      }
      .score {
        font-size: 0.48rem;
        margin-bottom: 0.12rem;
        line-height: 0.56rem;
        color: rgb(255, 153, 0);
      }
      .title {
        font-size: 0.24rem;
        color: rgb(7, 17, 27);
        line-height: 0.24rem;
        margin-bottom: 0.16rem;
      }
      .rank {
        font-size: 0.2rem;
        color: rgb(147, 153, 159);
      }
    }
    .overview-right {
      flex: 1;
      padding: 0.12rem 0.48rem 0;
      font-size: 0;
      // 兼容iphone5
      @media screen and (max-width: 320px) {
        padding-left: 0.2rem;
      }
      .score-wrapper {
        margin-bottom: 0.16rem;
        .title {
          font-size: 0.24rem;
          color: rgb(7, 17, 27);
          line-height: 0.36rem;
          display: inline-block;
          vertical-align: top;
        }
        .star-container {
          display: inline-block;
          margin: 0 0.2rem;
          vertical-align: top;
        }
        .score {
          font-size: 0.24rem;
          vertical-align: top;
          color: rgb(255, 153, 0);
          line-height: 0.36rem;
          display: inline-block;
        }
      }
      .delivery-wrapper {
        .title {
          font-size: 0.24rem;
          color: rgb(7, 17, 27);
          line-height: 0.36rem;
          display: inline-block;
          margin-right: 0.24rem;
        }
        .time {
          font-size: 0.24rem;
          color: rgb(147, 153, 159);
          line-height: 0.36rem;
        }
      }
    }
  }

  .rating-detail {
    padding: 0 0.36rem;
    border-top: 1px solid rgba(7, 17, 27, 0.1);
    .rating-item {
      display: flex;
      padding: 0.18rem 0;
      overflow: hidden;
      @include border-1px(rgba(7,17,27,0.1));
      .avatar {
        flex: 0 0 0.56rem;
        margin-right: 0.24rem;
        img {
          border-radius: 50%;
        }
      }
      .content {
        flex: 1;
        position: relative;
        padding-top: 0.36rem;
        font-size: 0;
        .name {
          font-size: 0.2rem;
          color: rgb(7, 17, 27);
          line-height: 0.24rem;
          margin-bottom: 0.08rem;
        }
        .time {
          position: absolute;
          right: 0;
          top: 0.28rem;
          font-size: 0.2rem;
          font-weight: 200;
          line-height: 0.24rem;
          color: rgb(147, 153, 159);
        }
        .star-wrapper {
          margin-bottom: 0.12rem;
          display: flex;
          vertical-align: top;
          .delivery {
            vertical-align: top;
            font-size: 0.2rem;
            font-weight: 200;
            color: rgb(147, 153, 159);
            line-height: 0.24rem;
            margin-left: 0.12rem;
          }
        }
        .desc {
          font-size: 0.24rem;
          line-height: 0.36rem;
          color: rgb(7, 17, 27);
          margin-bottom: 0.16rem;
        }
        .recommend {
          font-size: 0;
          .icon-thumb_up {
            display: inline-block;
            font-size: 0.24rem;
            color: rgb(0, 160, 220);
            line-height: 0.32rem;
            margin-right: 0.16rem;
          }
          span {
            display: inline-block;
            font-size: 0.18rem;
            color: rgb(147, 153, 159);
            line-height: 0.32rem;
            border: 1px solid rgb(147, 153, 159);
            border-radius: 1px;
            padding: 0.04rem 0.12rem;
            margin-right: 0.16rem;
            margin-bottom: 0.16rem;
          }
        }
      }
    }
  }
}
</style>
