import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
import store from "./store";
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/dist/vuetify.min.css'
import axios from 'axios';

Vue.config.productionTip = false
axios.defaults.baseURL = 'http://localhost:3000/api/';


new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
