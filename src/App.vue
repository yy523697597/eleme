<template>
  <div id="app" class="app">
    <v-header :seller="seller"></v-header>
    <div class="tab">
      <div class="tab-item active">
        <router-link to="/goods" class="active">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评价</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import Header from 'components/header/header'
// 返回数据成功状态码
const ERR_OK = 0

export default {
  name: 'app',
  components: {
    'v-header': Header
  },
  data() {
    return {
      seller: {}
    }
  },
  created() {
    // 获取seller商家数据
    this.$http.get('/api/seller').then(res => {
      if (res.data.errno === ERR_OK) {
        this.seller = res.data.data
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.tab {
  display: flex;
  width: 100%;
  height: .8rem;
  line-height: .8rem;
  border-bottom: .02rem solid rgba(7, 17, 27, 0.1);
  .tab-item {
    flex: 1;
    text-align: center;
    font-size: .28rem;
    text-align: center;
    a {
      color: rgb(77, 85, 93);
      text-decoration: none;
      display: block;
      &.router-link-active {
        color: rgb(240, 20, 20)
      }
    }
  }
}
</style>

