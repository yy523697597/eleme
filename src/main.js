// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import VueRouter from "vue-router";
import VueResource from "vue-resource";

import Goods from "components/goods/goods.vue";
import Ratings from "components/ratings/ratings.vue";
import Seller from "components/seller/seller.vue";

Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.use(VueResource);

const routes = [{
  path: "/",
  redirect: "/goods"
},
{
  path: "/goods",
  component: Goods
},
{
  path: "/ratings",
  component: Ratings
},
{
  path: "/seller",
  component: Seller
}
];

const router = new VueRouter({
  routes
});

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  template: "<App/>",
  components: {
    App
  }
});
