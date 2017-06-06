import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './App'

Vue.use(VueRouter)

const app = new Vue({
  ...App
})

app.$mount('#app')
