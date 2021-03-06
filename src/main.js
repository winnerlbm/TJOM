import Vue from 'vue'
import App from './App.vue'

/*主键库及主题*/
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/zh-CN'
import 'element-theme-chalk/lib/index.css'

Vue.use(ElementUI, {locale});

import 'lib-flexible/flexible'
import axios from 'axios'
/*全局导入自定义工具集、配置、开发工具等*/
import appUtil from './utils/AppUtil'
import md5Util from './utils/Md5Util'
import echarts from 'echarts'
import mapUtil from './utils/MapUtil'
import loadUtil from './utils/LoadUtil'

/*字体库 fa4*/
import 'font-awesome/css/font-awesome.css'
import 'leaflet-draw/dist/leaflet.draw.css';
/*引入leaflet及图表库*/
import 'leaflet/dist/leaflet.css';
import "leaflet.markercluster/dist/MarkerCluster.css"
import "leaflet.markercluster/dist/MarkerCluster.Default.css"
import L from 'leaflet';
/*
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});
L.Marker.prototype.options.icon = DefaultIcon;
*/

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

import 'es6-promise/auto'
import AppRouter from "./router/AppRouter"
import AppStore from "./store/AppStore";

Vue.config.productionTip = false;

Vue.prototype.$axios = axios;
/*全局引入*/
Vue.prototype.$appUtil = appUtil;
Vue.prototype.$md5Util = md5Util;
Vue.prototype.$charts = echarts;
Vue.prototype.$mapUtil = mapUtil;
Vue.prototype.$loadUtil = loadUtil;

new Vue({
    router: AppRouter,
    store: AppStore,
    render: h => h(App),
}).$mount('#app');
