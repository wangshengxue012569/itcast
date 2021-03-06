// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// 导入element
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/css/index.css'
// 日期格式化
// import moment from 'moment'



// 引入axios
import MyHttpServer from '@/plugins/http.js'


Vue.use(MyHttpServer)

Vue.use(ElementUI)

Vue.config.productionTip = false

// Vue.filter("cmdTime",(v)=>{
//   moment(v).format("YYYY-MM-DD hh:mm:dd")
// })
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
