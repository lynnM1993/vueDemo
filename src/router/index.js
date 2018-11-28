import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home/home';
import My from '@/pages/my/my';
import Set from '@/pages/set/set';
import Wifi from '@/pages/wifi/wifi';
import NotFind from '@/pages/notFind/notFind';

Vue.use(Router)
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Home,
      name: 'home'
    },
    {
      path: '/home',
      component: Home,
      name: 'home'
    },
    {
      path: '/my',
      component: My,
      name: 'my'
    },
    {
      path: '/set',
      component: Set,
      name: 'set'
    },
    { path: '/wifi',
      component: Wifi,
      name: 'wifi'
    },
    {
      path: '*',
      component: NotFind
    }
  ]
})
