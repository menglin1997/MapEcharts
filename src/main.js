/*
 * @Descripttion: 
 * @version: 
 * @Author: zml
 * @Date: 2020-05-27 17:51:04
 * @LastEditors: zml
 * @LastEditTime: 2020-06-03 17:12:05
 */ 
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'babel-polyfill'
import '../static/echarts.min '
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
