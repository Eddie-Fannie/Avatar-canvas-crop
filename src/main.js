import Vue from 'vue'
import App from './App.vue'
import AvatarCrop from './index.js'

Vue.use(AvatarCrop)

new Vue({
  el: '#app',
  render: h => h(App)
})
