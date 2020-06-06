/*
 * @Descripttion: 
 * @version: 
 * @Author: zml
 * @Date: 2020-05-27 17:51:04
 * @LastEditors: zml
 * @LastEditTime: 2020-06-04 11:43:42
 */ 
import Vue from 'vue'
import Router from 'vue-router'
import home from '@/views/home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    }
  ]
})
