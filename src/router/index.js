import Vue from 'vue'
import Router from 'vue-router'

// @相当于 ./src
import Login from '@/components/login/login.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
    },{
      path:'/login',
      component: Login
    }
  ]
})
