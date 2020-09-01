/**
 * @desc: 全局路由器
 * @author: LBM
 * @date: 2020-05-26 14:58:13
 */

import Vue from 'vue'
import Router from 'vue-router'
import MainContainer from "@/components/layout/MainContainer";
import Login from "@/components/login/Login";
Vue.use(Router);

const router = new Router({
    routes: [
        {
            path: '/map',
            name: 'map',
            component: MainContainer,
        },
        {
            path: '/login',
            name: 'login',
            component: Login,
        },
        {
            path: '/',
            redirect: '/login'
        }
    ]
});

export default router;

/**
 * @desc: 全局钩子函数
 * @author: LBM
 * @date: 2019-12-26 14:09:07
 */
router.beforeEach((to, from, next) => {
    if (to.path === '/login') {
        next();
    } else {
        let token = sessionStorage.getItem('username');
        if (token == null || token === '') {
            next('/login');
        } else {
            next();
        }
    }
    //模块切换滚动条自动置顶，此处的this无法定位到Vue实例
    Vue.prototype.$appUtil.Layout.scrollToTop();
  //  next()

});
const VueRouterPush = Router.prototype.push;
Router.prototype.push = function push(to) {
    return VueRouterPush.call(this, to).catch(err => err)
};