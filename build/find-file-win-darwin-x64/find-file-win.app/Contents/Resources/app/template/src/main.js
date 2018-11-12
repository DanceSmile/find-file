import Vue from 'vue'
import iView from 'iview';

//import css
import 'iview/dist/styles/iview.css'
//import components
Vue.use(iView)
import App from './App.vue'








window.app = new Vue({
  el: '#app',
  render: h => h(App)
})
