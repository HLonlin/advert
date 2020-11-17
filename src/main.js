// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';

import "./assets/site/css/base.css";

import axios from "./common/axios/request.js";
import tool from "./common/tool/tool.js";
import api from "./common/axios/api.js";

Vue.prototype.$axios = axios;
Vue.prototype.$tool = tool;
Vue.prototype.$api = api;

// 生产环境下不启动提示消息
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
