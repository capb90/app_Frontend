import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Shop from '../views/Shop.vue'
import Login from '../components/Login.vue'
import Signin from '../components/Signin.vue'
import Sistem from '../views/Sistem.vue'
import Sistemin from '../views/Sistemin.vue'
import store from '../store/index';



Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      public: true

    }
  },
  {
    path: "/shop",
    name: "shop",
    component: Shop,
    meta: {
      public: true
    }
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: {
        public: true
    }
},
{
  path: "/signin",
  name: "signin",
  component: Signin,
  meta: {
      public: true
  }
},
{
  path: "/sistem",
  name: "sistem",
  component: Sistem,
  meta: {
      public: true
  }
},
{
  path: "/sistemin",
  name: "sistemin",
  component: Sistemin,
  meta: {
      public: true
  }
},
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.public)) {
      next();
  } else if (store.state.usuario) {
      if (to.matched.some(record => record.meta.auth)) {
          console.log(store.state.usuario);
          next();
      }
  } else {
      next({ name: 'login' });
  }
})

export default router
