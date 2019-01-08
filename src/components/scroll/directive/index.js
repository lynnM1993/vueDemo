import Vue from 'Vue';
import Iscroll from './directieves'
const install = function (Vue) {

  Vue.directive('iScroll',Iscroll)
}

if (window.Vue) {
  window.Iscroll = Iscroll;
  Vue.use(install);
}

Iscroll.install = install;
export default Iscroll;
